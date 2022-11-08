import { ASSET_LAKE, ASSET_LP_TOKEN } from '../../../constants/assets';
import { useContext, useEffect, useState } from 'react';

import { Button } from '../../button/Button';
import { ButtonWithSpinner } from '../../button/ButtonWithSpinner';
import { GradientButton } from '../../button/gradient/GradientButton';
import { IPositionDetails } from '../../../interfaces/positionDetails.interface';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ProvideLiquidityModal } from './ProvideLiquidityModal';
import { WalletConnectContext } from '../../../context';
import { formatValue } from '../../../utils/formatValue';
import { parseBigNumber } from '../../../utils/parseBigNumber';
import { useConfig } from '../../../hooks/use-config';
import { usePositionDetails } from '../../../hooks/use-position-details';
import { usePositionId } from '../../../hooks/use-position-id';
import { useTokenBalance } from '@usedapp/core';
import { useUniswap } from '../../../hooks/use-uniswap';

export const ProvideLiquidityWidget = () => {
    const { account, library } = useContext(WalletConnectContext);
    const { lakeAddress, lpTokenAddress } = useConfig();
    const [isPoolModalOpen, setIsPoolModalOpen] = useState(false);
    const [lakeBalance, setLakeBalance] = useState(0);
    const [lpTokenBalance, setLpTokenBalance] = useState(0);
    const [positionId, setPositionId] = useState<number | undefined>(undefined);
    const [positionDetails, setPositionDetails] = useState<
        IPositionDetails | undefined
    >(undefined);
    const [isLiquidityRemoving, setIsLiquidityRemoving] = useState(false);
    const [refreshPositionData, setRefreshPositionData] = useState(0);
    const lakeBalanceAsBigNumber = useTokenBalance(lakeAddress, account);
    const lpTokenBalanceAsBigNumber = useTokenBalance(lpTokenAddress, account);

    useEffect(() => {
        const fetchData = async (account: string, library: JsonRpcProvider) => {
            const positionId = await usePositionId(library, account);
            setPositionId(positionId);
            if (positionId) {
                setPositionDetails(
                    await usePositionDetails(library, positionId),
                );
            }
        };

        if (library && account) {
            fetchData(account, library).catch(console.error);
        }
    }, [library, account, refreshPositionData]);

    useEffect(() => {
        setBalances();
    }, [lakeBalanceAsBigNumber, lpTokenBalanceAsBigNumber]);

    const setBalances = () => {
        setLakeBalance(
            lakeBalanceAsBigNumber
                ? parseBigNumber(lakeBalanceAsBigNumber, ASSET_LAKE.decimals)
                : 0,
        );
        setLpTokenBalance(
            lpTokenBalanceAsBigNumber
                ? parseBigNumber(
                      lpTokenBalanceAsBigNumber,
                      ASSET_LP_TOKEN.decimals,
                  )
                : 0,
        );
    };

    const onProvideLiquidityClick = () => {
        setIsPoolModalOpen(true);
    };

    const closeModal = () => {
        setIsPoolModalOpen(false);
    };
    const onLpTokenStakingClick = () => {
        console.log('LP TOKEN STAKING');
    };
    const onRemoveLiquidityClick = async () => {
        if (library && account && positionId && positionDetails) {
            setIsLiquidityRemoving(true);
            const { removeLiquidity } = useUniswap(library);
            await removeLiquidity(account, positionId, positionDetails);
            setRefreshPositionData(new Date().getTime());
            setIsLiquidityRemoving(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center mt-10 mb-4">
            <div className="w-full flex flex-col items-center">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="PROVIDE LIQUIDITY"
                    onClick={onProvideLiquidityClick}
                />
                <span className="text-sm tracking-[.1em] my-2">
                    {formatValue(lakeBalance, ASSET_LAKE.symbol, 0)} AVAILABLE
                </span>
                <ProvideLiquidityModal
                    isOpen={isPoolModalOpen}
                    closeModal={closeModal}
                    refreshPositionData={() => {
                        setRefreshPositionData(new Date().getTime());
                    }}
                />
            </div>
            <div className="w-full flex flex-col items-center mt-6">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="LP TOKEN STAKING"
                    onClick={onLpTokenStakingClick}
                />
                <span className="text-sm tracking-[.1em] my-2">
                    {formatValue(lpTokenBalance, ASSET_LP_TOKEN.symbol, 0)}{' '}
                    TOKENS AVAILABLE
                </span>
            </div>
            {!!positionId && (
                <div className="w-full flex flex-col items-center mt-8">
                    {isLiquidityRemoving ? (
                        <ButtonWithSpinner size="medium" disabled={true} />
                    ) : (
                        <Button
                            size="medium"
                            disabled={false}
                            text="REMOVE LIQUIDITY"
                            onClick={onRemoveLiquidityClick}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
