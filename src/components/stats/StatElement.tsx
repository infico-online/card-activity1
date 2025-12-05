import downChart from './../../assets/icons/down-chart.svg';
import upChart from './../../assets/icons/up-chart.svg';

interface Props {
    title: string;
    currentValue: number;
    formattedValue: string;
    pastValue: number;
}

export const StatElement = ({
    title,
    currentValue,
    formattedValue,
    pastValue,
}: Props) => (
    <div className="w-full h-[4.75rem] mt-4 lg:mt-0 flex justify-between px-6 box-shadow rounded-[18px] bg-black-600 overflow-auto">
        <div className="min-w-[4rem] flex justify-center items-center mr-4">
            <img
                className="w-[4rem] h-[3rem]"
                src={currentValue < pastValue ? downChart : upChart}
                alt="chart"
            ></img>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
            <span className="font-kanit-medium whitespace-nowrap text-gray-700 text-xs font-normal tracking-[.12em]">
                {title}
            </span>
            <span className="font-kanit-medium whitespace-nowrap color-gradient text-2xl font-medium">
                {formattedValue}
            </span>
        </div>
    </div>
);
