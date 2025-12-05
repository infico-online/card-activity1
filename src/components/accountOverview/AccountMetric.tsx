import { formatValue } from '../../utils/formatValue';

interface Props {
    title: string;
    value: number;
    iconSrc: string;
    showDecimals: boolean;
    usdValue?: number;
    fontColor?: string;
}

export const AccountMetric = ({
    fontColor,
    title,
    iconSrc,
    value,
    usdValue,
    showDecimals,
}: Props) => {
    return (
        <div className="w-full h-[5.75rem] mt-4 lg:mt-0 flex justify-between lg:pr-8 bg-black-700 rounded-[20px] inset-shadow overflow-auto">
            <div className="min-w-[3rem] flex items-center justify-center mx-3">
                <img
                    className="w-[3rem] h-[3rem]"
                    src={iconSrc}
                    alt="icon"
                ></img>
            </div>
            <div className="w-full flex items-center justify-between mr-3 lg:mr-0">
                <span
                    className={`w-[4rem] whitespace-wrap text-sm leading-5 text-center ${fontColor} mr-2`}
                >
                    {title}
                </span>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col">
                        <div className="flex items-end">
                            <span
                                className={`${
                                    value >= 10 ** 6 ? 'text-xl' : 'text-3xl'
                                } ${
                                    fontColor ||
                                    (showDecimals
                                        ? 'color-gradient-start'
                                        : 'color-gradient')
                                } font-medium font-kanit-medium`}
                            >
                                {formatValue(Math.trunc(value), '', 0)}
                            </span>
                            {showDecimals && (
                                <span
                                    className={`${
                                        value >= 10 ** 6
                                            ? 'text-sm'
                                            : 'text-base'
                                    }  ${
                                        fontColor || 'color-gradient-end'
                                    } font-medium font-kanit-medium`}
                                >
                                    {Math.abs(value - Math.trunc(value))
                                        .toFixed(2)
                                        .slice(1)}
                                </span>
                            )}
                        </div>
                        {!!usdValue && (
                            <span className="text-xs tracking-[.1em] text-gray-500 text-end">
                                {`( ~`}
                                {formatValue(usdValue, '$', 2)}
                                {` )`}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
