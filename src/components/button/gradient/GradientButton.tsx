import { GradientButtonBase } from './GradientButtonBase';
import { Size } from '../Button';

interface Props {
    size: Size;
    disabled: boolean;
    text: string;
    onClick?: () => void;
}

export const GradientButton = ({ size, disabled, text, onClick }: Props) => (
    <GradientButtonBase size={size} disabled={disabled} onClick={onClick}>
        <div className="w-full flex justify-center px-2">
            <span
                className={`tracking-[.1em] font-medium font-kanit-medium ${
                    size === 'small'
                        ? 'text-xs'
                        : size === 'medium'
                        ? 'text-base'
                        : 'text-2xl tracking-[.15em]'
                }`}
            >
                {text}
            </span>
        </div>
    </GradientButtonBase>
);
