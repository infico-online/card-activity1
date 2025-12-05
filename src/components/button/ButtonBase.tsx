import { GradientBorder } from '../GradientBorder';
import { ReactNode } from 'react';
import { Size } from './Button';

interface Props {
    size: Size;
    disabled: boolean;
    children: ReactNode;
    onClick?: () => void;
}

export const ButtonBase = ({ size, disabled, children, onClick }: Props) => (
    <button
        className={`${
            disabled ? '' : 'hover:scale-105 cursor-pointer'
        } transition-transform duration-300`}
        disabled={disabled}
        onClick={onClick}
    >
        <GradientBorder
            className={`${
                size === 'small'
                    ? 'min-w-[11rem] h-[2.5rem]'
                    : size === 'medium'
                    ? 'min-w-[10rem] lg:min-w-[13rem] h-[2.5rem] lg:h-[3rem]'
                    : 'min-w-[18rem] h-[5.5rem] !rounded-[80px]'
            } p-px flex justify-center items-center rounded-[32px]`}
        >
            <div
                className={`w-full h-full flex justify-center items-center rounded-[32px] bg-black-500 ${
                    size === 'small'
                        ? 'px-2'
                        : size === 'medium'
                        ? 'px-2 lg:px-4'
                        : 'px-6 !rounded-[80px]'
                }`}
            >
                {children}
            </div>
        </GradientBorder>
    </button>
);
