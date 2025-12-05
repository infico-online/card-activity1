import { CenterCircle } from './CenterCircle';
import { CustomCircularProgressbar } from './CustomCircularProgressbar';

type Props = {
    unlocked: number;
    locked: number;
};

export const ProgressChart = ({ unlocked, locked }: Props) => {
    return (
        <CustomCircularProgressbar
            className="shadow"
            strokeWidth={3}
            width="w-full"
            pathColor="url(#totalGradient)"
            value={100}
            gradientId="totalGradient"
            firstColor="rgba(158, 101, 229, 1)"
            secondColor="rgba(123, 97, 255, 1)"
        >
            <CustomCircularProgressbar
                className="shadow"
                strokeWidth={6}
                width="w-[90%]"
                pathColor="url(#unlockedGradient)"
                value={unlocked}
                gradientId="unlockedGradient"
                firstColor="rgba(123, 97, 255, 1)"
                secondColor="rgba(236, 108, 169, 1)"
            >
                <CustomCircularProgressbar
                    className="shadow"
                    strokeWidth={3}
                    width="w-[85%]"
                    pathColor={'rgba(114, 114, 114, 1)'}
                    value={locked}
                >
                    <CenterCircle />
                </CustomCircularProgressbar>
            </CustomCircularProgressbar>
        </CustomCircularProgressbar>
    );
};
