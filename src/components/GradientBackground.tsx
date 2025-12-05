import { colors } from '../constants/colors';
import styled from 'styled-components';

export const GradientBackground = styled.div`
    background: linear-gradient(
        90.21deg,
        ${colors.purple['900']},
        ${colors.blue['900']}
    );
    box-shadow: inset 2px 2px 14px rgba(255, 255, 255, 0.46);
    filter: drop-shadow(0px 0px 4px ${colors.purple['600']})
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    color: ${colors.white};
`;
