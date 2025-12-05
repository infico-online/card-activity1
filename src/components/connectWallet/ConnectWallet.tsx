import { GradientButtonWithIcon } from '../button/gradient/GradientButtonWithIcon';
import { WalletConnectContext } from '../../context';
import keyIcon from '../../assets/icons/key-icon.svg';
import { useContext } from 'react';

export const ConnectWallet = () => {
    const { activateProvider } = useContext(WalletConnectContext);
    const activate = async () => {
        await activateProvider();
    };
    return (
        <div className="w-full h-full absolute flex items-center justify-center top-0 left-0">
            <GradientButtonWithIcon
                size="medium"
                disabled={false}
                text="CONNECT WALLET"
                onClick={activate}
            >
                <img src={keyIcon} alt="key"></img>
            </GradientButtonWithIcon>
        </div>
    );
};
