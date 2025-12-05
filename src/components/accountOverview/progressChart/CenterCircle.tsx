import darkLakeLogo from '../../../assets/icons/dark-lake-logo.svg';
import styled from 'styled-components';

export const CenterCircle = () => (
    <div className="flex justify-center items-center">
        <CircleBackground className="flex justify-center items-center w-[4.5rem] h-[4.5rem] rounded-[50%]">
            <img
                className="scale-125 mix-blend-hard-light"
                src={darkLakeLogo}
                alt="icon"
            ></img>
        </CircleBackground>
    </div>
);

const CircleBackground = styled.div`
    background: linear-gradient(313.39deg, #373737 -15.37%, #2b2b2b 92.19%);
    opacity: 0.95;
    box-shadow: 8px 8px 18px rgba(64, 64, 64, 0.2);
`;
