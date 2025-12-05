import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';

import { ReactNode } from 'react';

type Props = {
    className: string;
    strokeWidth: number;
    width: string;
    value: number;
    pathColor: string;
    gradientId?: string;
    firstColor?: string;
    secondColor?: string;
    children: ReactNode;
};

export const CustomCircularProgressbar = ({
    className,
    strokeWidth,
    width,
    value,
    pathColor,
    gradientId,
    firstColor,
    secondColor,
    children,
}: Props) => (
    <div className={`${width} ${className} p-4`}>
        {!!gradientId && (
            <svg style={{ height: 0, width: 0 }}>
                <defs>
                    <linearGradient id={gradientId}>
                        <stop offset="0%" stopColor={firstColor} />
                        <stop offset="100%" stopColor={secondColor} />
                    </linearGradient>
                </defs>
            </svg>
        )}
        <CircularProgressbarWithChildren
            value={value}
            strokeWidth={strokeWidth}
            styles={buildStyles({
                trailColor: 'rgba(42, 42, 42, 1)',
                pathColor,
                strokeLinecap: 'round',
            })}
        >
            {children}
        </CircularProgressbarWithChildren>
    </div>
);
