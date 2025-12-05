import { GradientBackground } from '../GradientBackground';

interface Props {
    title: string;
    iconSrc: string;
    isSelected: boolean;
    onClick: () => void;
}

interface ButtonProps {
    title: string;
    iconSrc: string;
}

export const MenuButton = ({ title, iconSrc, isSelected, onClick }: Props) => {
    return (
        <button onClick={onClick}>
            {isSelected ? (
                <GradientButton title={title} iconSrc={iconSrc} />
            ) : (
                <Button title={title} iconSrc={iconSrc} />
            )}
        </button>
    );
};

const Button = ({ iconSrc, title }: ButtonProps) => {
    return (
        <div className="w-[4.5rem] h-[5rem] flex flex-col items-center bg-black-700 rounded-[20px] inset-shadow py-2">
            <div className="h-[3rem] flex justify-center">
                <div className="w-[2rem] h-[2rem] flex justify-center">
                    <img className="h-full" src={iconSrc} alt="icon"></img>
                </div>
            </div>
            <span className="w-full whitespace-wrap text-xs text-center px-22 word-spacing-4 mt-1">
                {title}
            </span>
        </div>
    );
};

const GradientButton = ({ iconSrc, title }: ButtonProps) => {
    return (
        <GradientBackground className="w-[4.5rem] h-[5rem] flex flex-col items-center rounded-[20px] py-2">
            <div className="h-[3rem] flex justify-center">
                <div className="w-[2rem] h-[2rem] flex justify-center">
                    <img className="h-full" src={iconSrc} alt="icon"></img>
                </div>
            </div>
            <span className="w-full whitespace-wrap text-xs text-center px-22 word-spacing-4 mt-1">
                {title}
            </span>
        </GradientBackground>
    );
};
