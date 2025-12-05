import { GradientProgressBar } from './GradientProgressBar';
import { colors } from '../../constants/colors';

interface Props {
    completed: number;
}

export const TabProgressBar = ({ completed }: Props) => (
    <GradientProgressBar
        completed={completed}
        customLabel=" "
        baseBgColor={colors.gray[600]}
        bgColor="linear-gradient(90.21deg, #ec6ca9 11.91%, #7b61ff 91.55%)"
        width={window.innerWidth < 1140 ? '5rem' : '7rem'}
        height={window.innerWidth < 1140 ? '0.75rem' : '1rem'}
    />
);
