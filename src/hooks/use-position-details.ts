import { Contract } from 'ethers';
import { IPositionDetails } from '../interfaces/positionDetails.interface';
import { JsonRpcProvider } from '@ethersproject/providers';
import { nonfungiblePositionManagerAbi } from '../abis/nonfungiblePositionManager';
import { parseBigNumber } from '../utils/parseBigNumber';
import { useConfig } from './use-config';

export const usePositionDetails = async (
    provider: JsonRpcProvider,
    positionId: number,
): Promise<IPositionDetails | undefined> => {
    try {
        const { nonfungiblePositionManagerAddress } = useConfig();
        const uniswapV3PosContract = new Contract(
            nonfungiblePositionManagerAddress,
            nonfungiblePositionManagerAbi,
            provider,
        );
        const position = await uniswapV3PosContract.callStatic.positions(
            positionId,
        );
        return {
            liquidity: position.liquidity,
            tickLower: parseBigNumber(position.tickLower, 0),
            tickUpper: parseBigNumber(position.tickUpper, 0),
        };
    } catch (e) {
        console.error('Failed to get position details', e);
    }
    return;
};
