import { ReactNode, useContext, useState } from 'react';

import { Button } from '../button/Button';
import { BuyWidget } from './buy/BuyWidget';
import { GradientButton } from '../button/gradient/GradientButton';
import { GradientButtonWithIcon } from '../button/gradient/GradientButtonWithIcon';
import { ProvideLiquidityWidget } from './provideLiquidity/ProvideLiquidityWidget';
import { SwapCustomWidget } from './swap/SwapCustomWidget';
import { WalletConnectContext } from '../../context';
import { WidgetBody } from './WidgetBody';
import keyIcon from './../../assets/icons/key-icon.svg';

interface Widget {
    name: string;
    isOpen: boolean;
    component: ReactNode;
}

const defaultWidgetsState = [
    {
        name: 'PROVIDE LIQUIDITY',
        isOpen: true,
        component: <ProvideLiquidityWidget />,
    },
    {
        name: 'SWAP $LAKE',
        isOpen: false,
        component: <SwapCustomWidget />,
    },
    {
        name: 'BUY CRYPTO',
        isOpen: false,
        component: <BuyWidget />,
    },
];

export const Widgets = () => {
    const { account, activateProvider } = useContext(WalletConnectContext);
    const [widgets, setWidgets] = useState<Widget[]>(defaultWidgetsState);

    const activate = async () => {
        await activateProvider();
    };

    const onWidgetClick = (id: number) => {
        setWidgets(
            widgets.map((widget, index) => ({
                ...widget,
                isOpen: index === id ? !widget.isOpen : widget.isOpen,
            })),
        );
    };

    return (
        <div className="w-full h-full bg-black-700 rounded-[30px] inset-shadow relative">
            <div
                className={`w-full h-full flex flex-col items-center px-20 pt-12 ${
                    account ? '' : 'blur-sm'
                }`}
            >
                <div className="w-full flex justify-between">
                    {widgets.map((widget, index) => (
                        <div key={index} className="flex flex-col w-[31%]">
                            {widget.isOpen ? (
                                <GradientButton
                                    size="huge"
                                    disabled={false}
                                    text={widget.name}
                                    onClick={() => onWidgetClick(index)}
                                ></GradientButton>
                            ) : (
                                <Button
                                    size="huge"
                                    disabled={false}
                                    text={widget.name}
                                    onClick={() => onWidgetClick(index)}
                                ></Button>
                            )}
                            <WidgetBody
                                isOpen={widget.isOpen}
                                children={widget.component}
                                onClick={() => onWidgetClick(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {!account && (
                <div className="absolute top-[50%] left-[41%]">
                    <GradientButtonWithIcon
                        size="medium"
                        disabled={false}
                        text="CONNECT WALLET"
                        onClick={activate}
                    >
                        <img src={keyIcon} alt="key"></img>
                    </GradientButtonWithIcon>
                </div>
            )}
        </div>
    );
};
