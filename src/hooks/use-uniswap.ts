import { ASSET_LAKE, ASSET_USDT } from '../constants/assets';
import { BigNumber, Contract } from 'ethers';
import { CurrencyAmount, Percent, Token } from '@uniswap/sdk-core';
import {
    NonfungiblePositionManager,
    Pool,
    Position,
    nearestUsableTick,
} from '@uniswap/v3-sdk';

import { IPositionDetails } from '../interfaces/positionDetails.interface';
import { JsonRpcProvider } from '@ethersproject/providers';
import { PROVIDE_LIQUIDITY_DEADLINE } from '../constants/commons';
import { uniswapV3PoolAbi } from '../abis/uniswapV3Pool';
import { useConfig } from './use-config';

interface Immutables {
    fee: number;
    tickSpacing: number;
}

interface State {
    liquidity: BigNumber;
    sqrtPriceX96: BigNumber;
    tick: number;
}

export const useUniswap = (provider: JsonRpcProvider) => {
    const {
        chainId,
        lakeAddress,
        usdtAddress,
        usdtLakePoolAddress,
        nonfungiblePositionManagerAddress,
    } = useConfig();

    const poolContract = new Contract(
        usdtLakePoolAddress,
        uniswapV3PoolAbi,
        provider,
    );

    const usdt = new Token(
        chainId,
        usdtAddress,
        ASSET_USDT.decimals,
        ASSET_USDT.symbol,
        ASSET_USDT.name,
    );

    const lake = new Token(
        chainId,
        lakeAddress,
        ASSET_LAKE.decimals,
        ASSET_LAKE.symbol,
        ASSET_LAKE.name,
    );

    const getLakePrice = async (): Promise<number> => {
        const [immutables, state] = await Promise.all([
            getPoolImmutables(poolContract),
            getPoolState(poolContract),
        ]);

        const pool = new Pool(
            usdt,
            lake,
            immutables.fee,
            state.sqrtPriceX96.toString(),
            state.liquidity.toString(),
            state.tick,
        );
        return Number(pool.token1Price.toSignificant());
    };

    const provideLiquidity = async (
        usdtAmount: number,
        lakeAmount: number,
        account: string,
        tokenId?: number,
    ): Promise<void> => {
        try {
            const [immutables, state] = await Promise.all([
                getPoolImmutables(poolContract),
                getPoolState(poolContract),
            ]);

            const pool = new Pool(
                usdt,
                lake,
                immutables.fee,
                state.sqrtPriceX96.toString(),
                state.liquidity.toString(),
                state.tick,
            );

            const position = Position.fromAmounts({
                pool,
                amount0: usdtAmount * 10 ** ASSET_USDT.decimals,
                amount1: lakeAmount * 10 ** ASSET_LAKE.decimals,
                tickLower:
                    nearestUsableTick(state.tick, immutables.tickSpacing) -
                    2 * immutables.tickSpacing,
                tickUpper:
                    nearestUsableTick(state.tick, immutables.tickSpacing) +
                    2 * immutables.tickSpacing,
                useFullPrecision: true,
            });

            const deadline = (
                (new Date().getTime() + PROVIDE_LIQUIDITY_DEADLINE) /
                1000
            )
                .toFixed()
                .toString();

            const slippageTolerance = new Percent(50, 10000);

            const { calldata, value } = tokenId
                ? NonfungiblePositionManager.addCallParameters(position, {
                      tokenId,
                      slippageTolerance,
                      deadline,
                  })
                : NonfungiblePositionManager.addCallParameters(position, {
                      slippageTolerance,
                      recipient: account,
                      deadline,
                  });

            const txn: { to: string; data: string; value: string } = {
                to: nonfungiblePositionManagerAddress,
                data: calldata,
                value,
            };

            const gasLimit = await provider.getSigner().estimateGas(txn);
            const newTxn = {
                ...txn,
                gasLimit,
            };
            const resp = await provider.getSigner().sendTransaction(newTxn);
            await resp.wait();
        } catch (e) {
            console.error('Failed to provide liquidity', e);
        }
    };

    const removeLiquidity = async (
        account: string,
        tokenId: number,
        positionDetails: IPositionDetails,
    ): Promise<void> => {
        try {
            const [immutables, state] = await Promise.all([
                getPoolImmutables(poolContract),
                getPoolState(poolContract),
            ]);

            const pool = new Pool(
                usdt,
                lake,
                immutables.fee,
                state.sqrtPriceX96.toString(),
                state.liquidity.toString(),
                state.tick,
            );
            const position = new Position({
                pool,
                ...positionDetails,
            });

            const deadline = (
                (new Date().getTime() + PROVIDE_LIQUIDITY_DEADLINE) /
                1000
            )
                .toFixed()
                .toString();

            const { calldata, value } =
                NonfungiblePositionManager.removeCallParameters(position, {
                    tokenId,
                    liquidityPercentage: new Percent(1),
                    slippageTolerance: new Percent(1),
                    deadline,
                    collectOptions: {
                        expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(
                            usdt,
                            0,
                        ),
                        expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(
                            lake,
                            0,
                        ),
                        recipient: account,
                    },
                });

            const txn: { to: string; data: string; value: string } = {
                to: nonfungiblePositionManagerAddress,
                data: calldata,
                value,
            };

            const gasLimit = await provider.getSigner().estimateGas(txn);
            const newTxn = {
                ...txn,
                gasLimit,
            };
            const resp = await provider.getSigner().sendTransaction(newTxn);
            await resp.wait();
        } catch (e) {
            console.error('Failed to remove liquidity', e);
        }
    };

    const getPoolImmutables = async (
        poolContract: Contract,
    ): Promise<Immutables> => {
        return {
            fee: await poolContract.fee(),
            tickSpacing: await poolContract.tickSpacing(),
        };
    };

    const getPoolState = async (poolContract: Contract): Promise<State> => {
        const [liquidity, slot] = await Promise.all([
            poolContract.liquidity(),
            poolContract.slot0(),
        ]);

        return {
            liquidity,
            sqrtPriceX96: slot[0],
            tick: slot[1],
        };
    };

    return {
        getLakePrice,
        provideLiquidity,
        removeLiquidity,
    };
};
