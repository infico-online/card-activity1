import axios, { AxiosInstance } from 'axios';

import { BigNumber } from 'ethers';
import { useConfig } from '../hooks/use-config';

export class EtherscanService {
    private instance: AxiosInstance;
    constructor() {
        const { etherscanBaseURL } = useConfig();
        this.instance = axios.create({
            baseURL: etherscanBaseURL,
        });
    }

    async getTotalSupply(contractAddress: string): Promise<BigNumber> {
        return BigNumber.from(
            (
                await this.instance.get('', {
                    params: {
                        module: 'stats',
                        action: 'tokensupply',
                        contractAddress,
                        apiKey: import.meta.env.VITE_ETHERSCAN_API_KEY,
                    },
                })
            ).data.result,
        );
    }
}
