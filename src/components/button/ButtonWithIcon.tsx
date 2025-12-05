import { ButtonBase } from './ButtonBase';
import { ReactNode } from 'react';
import { Size } from './Button';

interface Props {
    size: Size;
    disabled: boolean;
    text: string;
    children: ReactNode;
    onClick?: () => void;
}

export const ButtonWithIcon = ({
    size,
    disabled,
    text,
    children,
    onClick,
}: Props) => (
    <ButtonBase size={size} disabled={disabled} onClick={onClick}>
        <div className="w-full flex justify-between">
            {children}
            <span
                className={`color-gradient-light tracking-[.05em] font-medium font-kanit-medium ml-1 lg:ml-2 ${
                    size === 'small'
                        ? 'text-xs'
                        : size === 'medium'
                        ? 'text-base'
                        : 'text-2xl'
                }`}
            >
                {text}
            </span>
        </div>
    </ButtonBase>
);
