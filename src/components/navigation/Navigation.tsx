import { ASSET_ETH, ASSET_LAKE } from '../../constants/assets';
import { useContext, useEffect, useState } from 'react';
import { useEtherBalance, useTokenBalance } from '@usedapp/core';

import { Button } from '../button/Button';
import { ButtonWithIcon } from '../button/ButtonWithIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GradientBorder } from '../GradientBorder';
import { GradientButtonWithIcon } from '../button/gradient/GradientButtonWithIcon';
import { WalletConnectContext } from '../../context';
import cancelIcon from './../../assets/icons/cancel-icon.svg';
import copyIcon from './../../assets/icons/copy-icon.svg';
import { formatAddress } from '../../utils/formatAddress';
import { formatValue } from '../../utils/formatValue';
import horizontalLogo from './../../assets/icons/horizontal-logo.png';
import keyIcon from './../../assets/icons/key-icon.svg';
import { parseBigNumber } from '../../utils/parseBigNumber';
import { useConfig } from '../../hooks/use-config';

export const Navigation = () => {
    const { account, provider, activateProvider, deactivate, switchNetwork } =
        useContext(WalletConnectContext);

    const { chainId, chainIdAsHex, lakeAddress } = useConfig();
    const [ethBalance, setEthBalance] = useState(0);
    const [lakeBalance, setLakeBalance] = useState(0);
    const ethBalanceAsBigNumber = useEtherBalance(account);
    const lakeBalanceAsBigNumber = useTokenBalance(lakeAddress, account);

    useEffect(() => {
        if (!account) {
            activateProvider();
        }
    }, [account]);

    useEffect(() => {
        if (!!provider && provider.chainId !== chainIdAsHex) {
            switchNetwork(chainId);
        }
    }, [provider]);

    useEffect(() => {
        setBalances();
    }, [ethBalanceAsBigNumber, lakeBalanceAsBigNumber]);

    const setBalances = () => {
        setEthBalance(
            ethBalanceAsBigNumber ? parseBigNumber(ethBalanceAsBigNumber) : 0,
        );
        setLakeBalance(
            lakeBalanceAsBigNumber
                ? parseBigNumber(lakeBalanceAsBigNumber, ASSET_LAKE.decimals)
                : 0,
        );
    };

    const activate = async () => {
        await activateProvider();
    };

    return (
        <nav className="relative flex flex-wrap items-center justify-between py-3">
            <div className="w-full flex items-center justify-between">
                <div>
                    <img
                        className="w-[35vw] lg:w-[18rem]"
                        src={horizontalLogo}
                        alt="logo"
                    ></img>
                </div>

                <div className="flex items-center justify-end">
                    {account ? (
                        <>
                            <div className="hidden lg:block">
                                <Button
                                    size="medium"
                                    disabled={true}
                                    text={`${formatValue(
                                        lakeBalance,
                                        ASSET_LAKE.symbol,
                                        2,
                                    )} | ${formatValue(
                                        ethBalance,
                                        ASSET_ETH.symbol,
                                        4,
                                    )}`}
                                ></Button>
                            </div>

                            <div className="ml-4">
                                <CopyToClipboard text={account}>
                                    <ButtonWithIcon
                                        size="medium"
                                        disabled={false}
                                        text={formatAddress(account)}
                                    >
                                        <img
                                            className="w-4 lg:w-auto cursor-pointer"
                                            src={copyIcon}
                                            alt="copy"
                                        ></img>
                                    </ButtonWithIcon>
                                </CopyToClipboard>
                            </div>
                            <div className="ml-2 lg:ml-4">
                                <button
                                    className="hover:scale-105 cursor-pointer transition-transform duration-300"
                                    onClick={deactivate}
                                >
                                    <GradientBorder className="p-px flex justify-center items-center rounded-[32px] min-w-[2rem]">
                                        <div className="w-full h-full flex justify-center items-center rounded-[32px] bg-black-500 p-1 lg:p-2">
                                            <img
                                                className="cursor-pointer"
                                                src={cancelIcon}
                                                alt="cancel"
                                            ></img>
                                        </div>
                                    </GradientBorder>
                                </button>
                            </div>
                        </>
                    ) : (
                        <GradientButtonWithIcon
                            size="medium"
                            disabled={false}
                            text="CONNECT WALLET"
                            onClick={activate}
                        >
                            <img
                                className="w-4 lg:w-auto"
                                src={keyIcon}
                                alt="key"
                            ></img>
                        </GradientButtonWithIcon>
                    )}
                </div>
            </div>
        </nav>
    );
};
