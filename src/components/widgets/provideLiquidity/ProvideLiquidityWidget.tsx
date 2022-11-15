import { ASSET_LAKE, ASSET_LP_TOKEN } from '../../../constants/assets';
import { useContext, useEffect, useState } from 'react';

import { Button } from '../../button/Button';
import { ButtonWithSpinner } from '../../button/ButtonWithSpinner';
import { GradientButton } from '../../button/gradient/GradientButton';
import { IPositionDetails } from '../../../interfaces/positionDetails.interface';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ProvideLiquidityModal } from './ProvideLiquidityModal';
import { StakingModal } from './staking/StakingModal';
import { UnstakingModal } from './staking/UstakingModal';
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
    const [isProvideLiquidityModalOpen, setIsProvideLiquidityModalOpen] =
        useState(false);
    const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
    const [isUnstakingModalOpen, setIsUnstakingModalOpen] = useState(false);
    const [lakeBalance, setLakeBalance] = useState(0);
    const [lpTokenBalance, setLpTokenBalance] = useState(0);
    const [stakedBalance, setStakedBalance] = useState(0);
    const [positionId, setPositionId] = useState<number | undefined>(undefined);
    const [positionDetails, setPositionDetails] = useState<
        IPositionDetails | undefined
    >(undefined);
    const [isLiquidityRemoving, setIsLiquidityRemoving] = useState(false);
    const [refreshPositionData, setRefreshPositionData] = useState(0);
    const [refreshStakingData, setRefreshStakingData] = useState(0);
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
        const fetchData = async (account: string, library: JsonRpcProvider) => {
            // const stakedBalance = await useStakedBalance(library, account);
            setStakedBalance(0);
        };

        if (library && account) {
            fetchData(account, library).catch(console.error);
        }
    }, [library, account, refreshStakingData]);

    useEffect(() => {
        setLakeBalance(
            lakeBalanceAsBigNumber
                ? parseBigNumber(lakeBalanceAsBigNumber, ASSET_LAKE.decimals)
                : 0,
        );
    }, [lakeBalanceAsBigNumber]);

    useEffect(() => {
        setLpTokenBalance(
            lpTokenBalanceAsBigNumber
                ? parseBigNumber(
                      lpTokenBalanceAsBigNumber,
                      ASSET_LP_TOKEN.decimals,
                  )
                : 0,
        );
    }, [lpTokenBalanceAsBigNumber]);

    const onProvideLiquidityClick = () => {
        setIsProvideLiquidityModalOpen(true);
    };

    const closeProvideLiquidityModal = () => {
        setIsProvideLiquidityModalOpen(false);
    };

    const onStakeClick = () => {
        setIsStakingModalOpen(true);
    };

    const closeStakingModal = () => {
        setIsStakingModalOpen(false);
    };

    const onUnstakeClick = async () => {
        setIsUnstakingModalOpen(true);
    };

    const closeUnstakingModal = () => {
        setIsUnstakingModalOpen(false);
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
                    isOpen={isProvideLiquidityModalOpen}
                    closeModal={closeProvideLiquidityModal}
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
                    onClick={onStakeClick}
                />
                <span className="text-sm tracking-[.1em] my-2">
                    {formatValue(lpTokenBalance, ASSET_LP_TOKEN.symbol, 0)}{' '}
                    TOKENS AVAILABLE
                </span>
                <StakingModal
                    isOpen={isStakingModalOpen}
                    closeModal={closeStakingModal}
                    refreshStakingData={() => {
                        setRefreshStakingData(new Date().getTime());
                    }}
                />
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
            {stakedBalance > 0 && (
                <div className="w-full flex flex-col items-center mt-8">
                    <Button
                        size="medium"
                        disabled={false}
                        text="LP TOKENS UNSTAKING"
                        onClick={onUnstakeClick}
                    />
                    <span className="text-sm tracking-[.1em] my-2">
                        {formatValue(stakedBalance, ASSET_LP_TOKEN.symbol, 0)}{' '}
                        TOKENS STAKED
                    </span>
                    <UnstakingModal
                        isOpen={isUnstakingModalOpen}
                        stakedBalance={stakedBalance}
                        closeModal={closeUnstakingModal}
                        refreshStakingData={() => {
                            setRefreshStakingData(new Date().getTime());
                        }}
                    />
                </div>
            )}
        </div>
    );
};
