import { JsonRpcProvider } from '@ethersproject/providers';
import { ASSET_LAKE } from '../constants/assets';
import { USDC_LAKE_POOL_ADDRESS } from '../constants/blockchain';
import { EtherscanService } from '../services/etherscan-service';
import { parseBigNumber } from '../utils/parseBigNumber';
import { useUniswap } from './use-uniswap';

const etherscanService = new EtherscanService();

export const useLakeStats = async (provider: JsonRpcProvider) => {
    const { getLakePrice } = useUniswap();
    const lakePrice = await getLakePrice(USDC_LAKE_POOL_ADDRESS, provider);

    const circulationSupply = parseBigNumber(
        await etherscanService.getTotalSupply(ASSET_LAKE.address),
        ASSET_LAKE.decimals,
    );

    return {
        marketCup: circulationSupply * lakePrice,
        circulationSupply,
        lakePrice,
        consentsGathered: 0,
    };
};
