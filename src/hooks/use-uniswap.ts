import { JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber, Contract } from 'ethers';
import { Pool } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { Mainnet } from '@usedapp/core';
import { ASSET_LAKE, ASSET_USDC } from '../constants/assets';

interface Immutables {
    fee: number;
}

interface State {
    liquidity: BigNumber;
    sqrtPriceX96: BigNumber;
    tick: number;
}

export const useUniswap = () => {
    const getLakePrice = async (
        poolAddress: string,
        provider: JsonRpcProvider,
    ): Promise<number> => {
        const poolContract = new Contract(
            poolAddress,
            IUniswapV3PoolABI,
            provider,
        );

        const [immutables, state] = await Promise.all([
            getPoolImmutables(poolContract),
            getPoolState(poolContract),
        ]);

        const usdc = new Token(
            Mainnet.chainId,
            ASSET_USDC.address,
            ASSET_USDC.decimals,
            ASSET_USDC.symbol,
            ASSET_USDC.name,
        );

        const lake = new Token(
            Mainnet.chainId,
            ASSET_LAKE.address,
            ASSET_LAKE.decimals,
            ASSET_LAKE.symbol,
            ASSET_LAKE.name,
        );

        const pool = new Pool(
            usdc,
            lake,
            immutables.fee,
            state.sqrtPriceX96.toString(),
            state.liquidity.toString(),
            state.tick,
        );
        return Number(pool.token1Price.toSignificant());
    };

    const getPoolImmutables = async (
        poolContract: Contract,
    ): Promise<Immutables> => {
        return {
            fee: await poolContract.fee(),
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
    };
};
