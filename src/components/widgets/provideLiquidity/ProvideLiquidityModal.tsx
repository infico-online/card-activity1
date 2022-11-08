import { ASSET_LAKE, ASSET_USDT } from '../../../constants/assets';
import { BigNumber, Contract } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { useTokenAllowance, useTokenBalance } from '@usedapp/core';

import { Button } from '../../button/Button';
import { ButtonWithSpinner } from '../../button/ButtonWithSpinner';
import { ERC20Abi } from '../../../abis/ERC20';
import { GradientButton } from '../../button/gradient/GradientButton';
import { GradientButtonWithSpinner } from '../../button/gradient/GradientButtonWithSpinner';
import { JsonRpcProvider } from '@ethersproject/providers';
import { REFRESH_LAKE_PRICE_INTERVAL } from '../../../constants/commons';
import ReactModal from 'react-modal';
import { TokenInput } from './TokenInput';
import { WalletConnectContext } from '../../../context';
import cancelIcon from './../../../assets/icons/cancel-icon.svg';
import { parseBigNumber } from '../../../utils/parseBigNumber';
import { useConfig } from '../../../hooks/use-config';
import { usePositionId } from '../../../hooks/use-position-id';
import { useUniswap } from '../../../hooks/use-uniswap';

type Props = {
    isOpen: boolean;
    refreshPositionData: () => void;
    closeModal: () => void;
};

const customStyles = {
    overlay: {
        background: 'rgba(0, 0, 0, 0.8)',
    },
    content: {
        background: 'transparent',
        border: 'none',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

ReactModal.setAppElement('#root');

export const ProvideLiquidityModal = ({
    isOpen,
    refreshPositionData,
    closeModal,
}: Props) => {
    const { account, library } = useContext(WalletConnectContext);
    const { usdtAddress, lakeAddress, nonfungiblePositionManagerAddress } =
        useConfig();
    const [usdtBalance, setUsdtBalance] = useState(0);
    const [lakeBalance, setLakeBalance] = useState(0);
    const [usdtInputValue, setUsdtInputValue] = useState(0);
    const [lakeInputValue, setLakeInputValue] = useState(0);
    const [isUsdtValueValid, setIsUsdtValueValid] = useState(true);
    const [isLakeValueValid, setIsLakeValueValid] = useState(true);
    const [isUsdtApproved, setIsUsdtApproved] = useState(false);
    const [isLakeApproved, setIsLakeApproved] = useState(false);
    const [isUsdtApproving, setIsUsdtApproving] = useState(false);
    const [isLakeApproving, setIsLakeApproving] = useState(false);
    const [isLiquidityProviding, setIsLiquidityProviding] = useState(false);
    const usdtBalanceAsBigNumber = useTokenBalance(usdtAddress, account);
    const lakeBalanceAsBigNumber = useTokenBalance(lakeAddress, account);
    const usdtAllowance = useTokenAllowance(
        usdtAddress,
        account,
        nonfungiblePositionManagerAddress,
    );
    const lakeAllowance = useTokenAllowance(
        lakeAddress,
        account,
        nonfungiblePositionManagerAddress,
    );
    const usdtPrice = 1;
    const [lakePrice, setLakePrice] = useState(0);

    useEffect(() => {
        const fetchData = async (library: JsonRpcProvider) => {
            const { getLakePrice } = useUniswap(library);
            setLakePrice(await getLakePrice());
        };

        if (library) {
            fetchData(library).catch(console.error);
            setInterval(() => {
                fetchData(library).catch(console.error);
            }, REFRESH_LAKE_PRICE_INTERVAL);
        }
    }, [library]);

    useEffect(() => {
        setBalances();
    }, [usdtBalanceAsBigNumber, lakeBalanceAsBigNumber]);

    useEffect(() => {
        setIsUsdtApproved(
            (!!usdtAllowance &&
                parseBigNumber(usdtAllowance, ASSET_USDT.decimals) >=
                    usdtInputValue) ||
                usdtInputValue === 0,
        );
    }, [usdtInputValue]);

    useEffect(() => {
        setIsLakeApproved(
            (!!lakeAllowance &&
                parseBigNumber(lakeAllowance, ASSET_LAKE.decimals) >=
                    lakeInputValue) ||
                lakeInputValue === 0,
        );
    }, [lakeInputValue]);

    const setBalances = () => {
        setUsdtBalance(
            usdtBalanceAsBigNumber
                ? parseBigNumber(usdtBalanceAsBigNumber, ASSET_USDT.decimals)
                : 0,
        );
        setLakeBalance(
            lakeBalanceAsBigNumber
                ? parseBigNumber(lakeBalanceAsBigNumber, ASSET_LAKE.decimals)
                : 0,
        );
    };

    const onUsdtValueChange = (value: number) => {
        setUsdtInputValue(value);
        setIsUsdtValueValid(value <= usdtBalance);
        const lakeAmount = (value * usdtPrice) / lakePrice;
        setLakeInputValue(lakeAmount);
        setIsLakeValueValid(lakeAmount <= lakeBalance);
    };

    const onLakeValueChange = (value: number) => {
        setLakeInputValue(value);
        setIsLakeValueValid(value <= lakeBalance);
        const usdtAmount = (value * lakePrice) / usdtPrice;
        setUsdtInputValue(usdtAmount);
        setIsUsdtValueValid(usdtAmount <= usdtBalance);
    };

    const onApproveClick = async (tokenAddress: string, amount: number) => {
        tokenAddress === lakeAddress
            ? setIsLakeApproving(true)
            : setIsUsdtApproving(true);

        const tokenContract = new Contract(
            tokenAddress,
            ERC20Abi,
            library?.getSigner(account),
        );

        const resp = tokenContract.approve(
            nonfungiblePositionManagerAddress,
            BigNumber.from(amount),
        );

        await resp.wait();

        tokenAddress === lakeAddress
            ? setIsLakeApproving(false)
            : setIsUsdtApproving(false);
    };

    const onProvideLiquidityClick = async () => {
        if (library && account) {
            setIsLiquidityProviding(true);
            const { provideLiquidity } = useUniswap(library);
            const tokenId = await usePositionId(library, account);
            await provideLiquidity(
                usdtInputValue,
                lakeInputValue,
                account,
                tokenId,
            );
            setIsLiquidityProviding(false);
            setLakeInputValue(0);
            setUsdtInputValue(0);
            refreshPositionData();
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            style={customStyles}
            contentLabel="Provide Liquidity Modal"
        >
            <div className="flex flex-col">
                <div className="flex justify-end items-center mb-6">
                    <span className="text-sm tracking-[.1em] mr-2 text-gray-500">
                        CLOSE
                    </span>
                    <div className="w-8 h-8 flex justify-center items-center rounded-[32px] border border-gray-500 p-1">
                        <img
                            className="cursor-pointer"
                            src={cancelIcon}
                            onClick={closeModal}
                            alt="copy"
                        ></img>
                    </div>
                </div>
                <div className="flex flex-col rounded-[32px] border border-gray-500 p-8 bg-black-800">
                    <div className="font-kanit-medium color-gray-gradient text-shadow text-xl tracking-[.12em] text-center mb-4">
                        PROVIDE LIQUIDITY
                    </div>
                    <div className="flex flex-col min-w-[20vw]">
                        <TokenInput
                            tokenSymbol="USDT"
                            tokenPrice={usdtPrice}
                            inputValue={usdtInputValue}
                            isValueValid={isUsdtValueValid}
                            setMaxInputValue={() =>
                                onUsdtValueChange(usdtBalance)
                            }
                            onChange={(event: any) =>
                                onUsdtValueChange(event.target.value || '')
                            }
                        />
                        <TokenInput
                            tokenSymbol="LAKE"
                            tokenPrice={lakePrice}
                            inputValue={lakeInputValue}
                            isValueValid={isLakeValueValid}
                            setMaxInputValue={() =>
                                onLakeValueChange(lakeBalance)
                            }
                            onChange={(event: any) =>
                                onLakeValueChange(event.target.value || '')
                            }
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        {!isUsdtApproved && (
                            <div className="mt-8">
                                {isUsdtApproving ? (
                                    <GradientButtonWithSpinner
                                        size="medium"
                                        disabled={true}
                                    />
                                ) : (
                                    <GradientButton
                                        size="medium"
                                        disabled={false}
                                        text="APPROVE USDT"
                                        onClick={() =>
                                            onApproveClick(
                                                usdtAddress,
                                                usdtInputValue,
                                            )
                                        }
                                    />
                                )}
                            </div>
                        )}
                        {!isLakeApproved && (
                            <div className="mt-8">
                                {isLakeApproving ? (
                                    <GradientButtonWithSpinner
                                        size="medium"
                                        disabled={true}
                                    />
                                ) : (
                                    <GradientButton
                                        size="medium"
                                        disabled={false}
                                        text="APPROVE LAKE"
                                        onClick={() =>
                                            onApproveClick(
                                                lakeAddress,
                                                lakeInputValue,
                                            )
                                        }
                                    />
                                )}
                            </div>
                        )}
                        {isLakeApproved && isUsdtApproved && (
                            <div className="mt-8">
                                {isLiquidityProviding ? (
                                    <ButtonWithSpinner
                                        size="medium"
                                        disabled={true}
                                    />
                                ) : (
                                    <Button
                                        size="medium"
                                        disabled={
                                            lakeInputValue === 0 ||
                                            usdtInputValue === 0 ||
                                            !isLakeValueValid ||
                                            !isUsdtValueValid
                                        }
                                        text="PROVIDE LIQUIDITY"
                                        onClick={onProvideLiquidityClick}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};
