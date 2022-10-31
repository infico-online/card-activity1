import { networks } from '../constants/networks';

type DappConfig = {
    readOnlyChainId: number;
    readOnlyUrls: {
        [key: number]: string;
    };
};

type SupportedChain = 'mainnet' | 'goerli';

const chain: SupportedChain =
    import.meta.env.VITE_CHAIN_NAME === 'goerli' ? 'goerli' : 'mainnet';

export const useConfig = () => {
    const getDappConfig = (): DappConfig => {
        return {
            readOnlyChainId: networks[chain].chainId,
            readOnlyUrls: {
                [networks[chain].chainId]: networks[chain].rpcUrl,
            },
        };
    };
    return {
        ...networks[chain],
        lakeAddress: import.meta.env.VITE_LAKE_ADDRESS,
        vestingScheduleAddress: import.meta.env.VITE_VESTING_SCHEDULE_ADDRESS,
        usdcLakePoolAddress: import.meta.env.VITE_USDC_LAKE_POOL_ADDRESS,
        usdcAddress: import.meta.env.VITE_USDC_ADDRESS,
        etherscanBaseURL: `https://api${
            chain === 'goerli' ? '-goerli' : ''
        }.etherscan.io/api`,
        getDappConfig,
    };
};
