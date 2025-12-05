import { FadeLoader } from 'react-spinners';
import { GradientBorderWithNoShadow } from '../GradientBorder';
import { colors } from '../../constants/colors';
import failedTransaction from '../../assets/icons/failed-transaction.svg';
import { networks } from '../../constants/networks';
import successfulTransaction from '../../assets/icons/successful-transaction.svg';
import { useConfig } from '../../hooks/use-config';

export type Status = 'PENDING' | 'SUCCESSFUL' | 'FAILED';
type Props = {
    status: Status;
    transactionHash: string;
};

export const TransactionStatus = ({ status, transactionHash }: Props) => {
    const { chainId } = useConfig();
    return (
        <div className="w-full flex flex-col px-4 py-6 items-center">
            {status === 'PENDING' ? (
                <FadeLoader
                    color={colors.pink[600]}
                    loading
                    radius={1}
                    width={4}
                    height={12}
                    margin={0}
                    cssOverride={{ height: '2.5rem' }}
                />
            ) : (
                <img
                    className="w-[2.5rem] h-[2.5rem]"
                    src={
                        status === 'SUCCESSFUL'
                            ? successfulTransaction
                            : failedTransaction
                    }
                    alt="transaction"
                ></img>
            )}
            <span className="tracking-[.1em] text-base font-kanit-regular color-gray-gradient text-shadow my-4 whitespace-nowrap">
                TRANSACTION {status}
            </span>
            <button
                onClick={() =>
                    window.open(
                        `https://${
                            chainId === networks.goerli.chainId ? 'goerli.' : ''
                        }etherscan.io/tx/${transactionHash}`,
                        '_blank',
                    )
                }
            >
                <GradientBorderWithNoShadow
                    colorFrom={
                        status === 'FAILED'
                            ? colors.pink[600]
                            : status === 'SUCCESSFUL'
                            ? colors.purple[500]
                            : ''
                    }
                    colorTo={
                        status === 'FAILED'
                            ? colors.red[300]
                            : status === 'SUCCESSFUL'
                            ? colors.green[300]
                            : ''
                    }
                    className="min-w-[12rem] h-[2.5rem] p-px flex justify-center items-center rounded-[32px] cursor-pointer"
                >
                    <div className="w-full h-full flex justify-center items-center rounded-[32px] bg-black-500 px-4">
                        <span
                            className={`${
                                status === 'FAILED'
                                    ? 'color-failed-gradient'
                                    : status === 'SUCCESSFUL'
                                    ? 'color-successful-gradient'
                                    : 'color-gradient-light'
                            } tracking-wider text-sm`}
                        >
                            CHECK ON ETHERSCAN
                        </span>
                    </div>
                </GradientBorderWithNoShadow>
            </button>
        </div>
    );
};
