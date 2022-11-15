import '../../../../assets/rc-slider.css';

import { useContext, useState } from 'react';

import { ASSET_LP_TOKEN } from '../../../../constants/assets';
import { Button } from '../../../button/Button';
import { ButtonWithSpinner } from '../../../button/ButtonWithSpinner';
import ReactModal from 'react-modal';
import Slider from 'rc-slider';
import { WalletConnectContext } from '../../../../context';
import cancelIcon from '../../../../assets/icons/cancel-icon.svg';
import { formatValue } from '../../../../utils/formatValue';

type Props = {
    isOpen: boolean;
    stakedBalance: number;
    refreshStakingData: () => void;
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

export const UnstakingModal = ({
    isOpen,
    stakedBalance,
    refreshStakingData,
    closeModal,
}: Props) => {
    const { account, library } = useContext(WalletConnectContext);
    const [inputValue, setInputValue] = useState(0);
    const [isUnstaking, setIsUnstaking] = useState(false);

    const onUnstakeClick = async () => {
        if (library && account) {
            setIsUnstaking(true);
            // Unstake
            setIsUnstaking(false);
            refreshStakingData();
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            style={customStyles}
            contentLabel="Staking Modal"
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
                        UNSTAKE
                    </div>
                    <div className="flex flex-col min-w-[20vw]">
                        <div className="w-full flex mt-4 mb-10">
                            <Slider
                                onChange={(value) => {
                                    setInputValue(value as number);
                                }}
                                min={0}
                                max={100}
                                marks={{
                                    0: '0%',
                                    25: '25%',
                                    50: '50%',
                                    75: '75%',
                                    100: '100%',
                                }}
                                defaultValue={inputValue}
                                step={0.1}
                            />
                        </div>
                        <span className="font-kanit-medium whitespace-nowrap text-xs tracking-[.12em] text-end">
                            STAKED:{' '}
                            {formatValue(
                                stakedBalance,
                                ASSET_LP_TOKEN.symbol,
                                2,
                            )}
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="mt-8">
                            {isUnstaking ? (
                                <ButtonWithSpinner
                                    size="medium"
                                    disabled={true}
                                />
                            ) : (
                                <Button
                                    size="medium"
                                    disabled={
                                        inputValue === 0 || stakedBalance === 0
                                    }
                                    text="UNSTAKE"
                                    onClick={onUnstakeClick}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};
