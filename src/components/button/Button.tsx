import { ButtonBase } from './ButtonBase';

export type Size = 'small' | 'medium' | 'big';
interface Props {
    size: Size;
    disabled: boolean;
    text: string;
    onClick?: () => void;
}

export const Button = ({ size, disabled, text, onClick }: Props) => (
    <ButtonBase size={size} disabled={disabled} onClick={onClick}>
        <span
            className={`color-gradient-light tracking-[.05em] font-medium font-kanit-medium ${
                size === 'small'
                    ? 'text-xs'
                    : size === 'medium'
                    ? 'text-base'
                    : 'text-2xl tracking-[.15em]'
            }`}
        >
            {text}
        </span>
    </ButtonBase>
);
