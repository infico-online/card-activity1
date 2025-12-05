import { ASSET_LAKE } from '../../../constants/assets';
import { useConfig } from '../../../hooks/use-config';

const { lakeAddress, usdtAddress } = useConfig();

export const tokens = [

    //Ethereum Mainnet
    {
        name: ASSET_LAKE.name,
        address: lakeAddress,
        symbol: ASSET_LAKE.symbol,
        decimals: ASSET_LAKE.decimals,
        chainId: 1,
        logoURI: ASSET_LAKE.image,
    },
    {
        name: 'Wrapped Ethereum',
        decimals: 18,
        symbol: 'WETH',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        chainId: 1,
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
        name: 'DAI',
        decimals: 18,
        symbol: 'DAI',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        chainId: 1,
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    },
    {
        name: 'USD Tether',
        decimals: 6,
        symbol: 'USDT',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        chainId: 1,
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    },
    {
        name: 'USD Coin',
        decimals: 6,
        symbol: 'USDC',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        chainId: 1,
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    },
    {
        name: 'Binance USD',
        decimals: 18,
        symbol: 'BUSD',
        address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
        chainId: 1,
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4Fabb145d64652a948d72533023f6E7A623C7C53/logo.png',
    },

    //Ethereum Goerli
    {
        name: ASSET_LAKE.name,
        address: lakeAddress,
        symbol: ASSET_LAKE.symbol,
        decimals: ASSET_LAKE.decimals,
        chainId: 5,
        logoURI: ASSET_LAKE.image,
    },
    {
        name: 'Wrapped Ethereum',
        decimals: 18,
        symbol: 'WETH',
        address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
        chainId: 5,
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
        name: 'USD Tether',
        decimals: 6,
        symbol: 'USDT',
        address: usdtAddress,
        chainId: 5,
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    },
];
