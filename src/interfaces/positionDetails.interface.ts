import { BigintIsh } from '@uniswap/sdk-core';

export interface IPositionDetails {
    liquidity: BigintIsh;
    tickLower: number;
    tickUpper: number;
}
