import { BounceLoader } from 'react-spinners';
import { colors } from '../../constants/colors';
import horizontalLogo from '../../assets/icons/horizontal-logo.png';

export const Loading = () => (
    <div className="w-full h-[100vh] flex items-center justify-center bg-black-800 fixed top-0 z-40">
        <div className="flex flex-col items-center">
            <img
                className="mb-8 w-[24rem]"
                src={horizontalLogo}
                alt="logo"
            ></img>
            <BounceLoader color={colors.purple[600]} />
        </div>
    </div>
);
