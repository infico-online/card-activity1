import ProgressBar from '@ramonak/react-progress-bar';

interface Props {
    completed: number;
    customLabel: string;
    baseBgColor: string;
    bgColor: string;
    width: string;
    height: string;
}

export const GradientProgressBar = ({
    completed,
    customLabel,
    baseBgColor,
    bgColor,
    width,
    height,
}: Props) => (
    <ProgressBar
        completed={completed}
        customLabel={customLabel}
        baseBgColor={baseBgColor}
        bgColor={bgColor}
        width={width}
        height={height}
    />
);
