import { ClipLoader } from 'react-spinners';
import { GradientButtonBase } from './GradientButtonBase';
import { Size } from '../Button';
import { colors } from '../../../constants/colors';

interface Props {
    size: Size;
    disabled: boolean;
}

export const GradientButtonWithSpinner = ({ size, disabled }: Props) => (
    <GradientButtonBase size={size} disabled={disabled}>
        <div className="w-full flex justify-center px-2">
            <ClipLoader color={colors.gray['300']} loading />
        </div>
    </GradientButtonBase>
);
