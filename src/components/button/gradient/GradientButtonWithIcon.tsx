import { GradientButtonBase } from './GradientButtonBase';
import { ReactNode } from 'react';
import { Size } from '../Button';

interface Props {
    size: Size;
    disabled: boolean;
    text: string;
    children: ReactNode;
    onClick?: () => void;
}

export const GradientButtonWithIcon = ({
    size,
    disabled,
    text,
    children,
    onClick,
}: Props) => (
    <GradientButtonBase size={size} disabled={disabled} onClick={onClick}>
        <div className="w-full flex justify-between">
            {children}
            <span
                className={`tracking-[.05em] font-medium font-kanit-medium flex items-center ml-1 lg:ml-2 ${
                    size === 'small'
                        ? 'text-sm'
                        : size === 'medium'
                        ? 'text-base'
                        : 'text-xl'
                }`}
            >
                {text}
            </span>
        </div>
    </GradientButtonBase>
);
