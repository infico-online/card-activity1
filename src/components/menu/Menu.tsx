import { MenuButton } from './MenuButton';
import buy from '../../assets/icons/buy-icon.svg';
import buySelected from '../../assets/icons/buy-selected-icon.svg';
import dashboard from '../../assets/icons/dashboard-icon.svg';
import dashboardSelected from '../../assets/icons/dashboard-selected-icon.svg';
import liquidity from '../../assets/icons/liquidity-icon.svg';
import liquiditySelected from '../../assets/icons/liquidity-selected-icon.svg';
import swap from '../../assets/icons/swap-icon.svg';
import swapSelected from '../../assets/icons/swap-selected-icon.svg';
import vestings from '../../assets/icons/vestings-icon.svg';
import vestingsSelected from '../../assets/icons/vestings-selected-icon.svg';

interface Props {
    subPageIndex: number;
    setSubPage: (index: number) => void;
}

export const Menu = ({ subPageIndex, setSubPage }: Props) => {
    return (
        <div className="w-full max-w-[536px] flex justify-between box-shadow rounded-[18px] bg-black-600 overflow-auto p-2">
            <MenuButton
                title="Dashboard Home"
                iconSrc={subPageIndex !== 0 ? dashboard : dashboardSelected}
                isSelected={subPageIndex === 0}
                onClick={() => setSubPage(0)}
            />
            <MenuButton
                title="Provide Liquidity"
                iconSrc={subPageIndex !== 1 ? liquidity : liquiditySelected}
                isSelected={subPageIndex === 1}
                onClick={() => setSubPage(1)}
            />
            <MenuButton
                title="Buy Crypto"
                iconSrc={subPageIndex !== 2 ? buy : buySelected}
                isSelected={subPageIndex === 2}
                onClick={() => setSubPage(2)}
            />
            <MenuButton
                title="Swap $Lake"
                iconSrc={subPageIndex !== 3 ? swap : swapSelected}
                isSelected={subPageIndex === 3}
                onClick={() => setSubPage(3)}
            />
            <MenuButton
                title="Token Vestings"
                iconSrc={subPageIndex !== 4 ? vestings : vestingsSelected}
                isSelected={subPageIndex === 4}
                onClick={() => setSubPage(4)}
            />
        </div>
    );
};
