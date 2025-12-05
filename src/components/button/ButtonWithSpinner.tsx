import { ButtonBase } from './ButtonBase';
import { ClipLoader } from 'react-spinners';
import { Size } from './Button';
import { colors } from '../../constants/colors';

interface Props {
    size: Size;
    disabled: boolean;
}

export const ButtonWithSpinner = ({ size, disabled }: Props) => (
    <ButtonBase size={size} disabled={disabled}>
        <div className="w-full flex justify-center px-2">
            <ClipLoader color={colors.gray['300']} loading />
        </div>
    </ButtonBase>
);
