import { ReactNode } from 'react';
import arrowDown from '../../assets/icons/arrow-down.svg';
import arrowUp from '../../assets/icons/arrow-up.svg';

interface Props {
    isOpen: boolean;
    children: ReactNode;
    onClick: () => void;
}

export const WidgetBody = ({ isOpen, children, onClick }: Props) => (
    <div className="w-full flex flex-col items-center bg-black-600 rounded-[16px] my-6 box-shadow">
        <div
            className={`w-full transition-opacity duration-300 ${
                isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'
            }`}
        >
            {children}
        </div>
        <div
            className="w-full h-10 flex justify-center items-center cursor-pointer"
            onClick={onClick}
        >
            <img src={isOpen ? arrowUp : arrowDown} alt="arrow"></img>
        </div>
    </div>
);
