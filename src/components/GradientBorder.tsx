import { colors } from '../constants/colors';
import styled from 'styled-components';

export const GradientBorder = styled.div`
    background: linear-gradient(${colors.purple['300']}, ${colors.blue['300']});
    box-shadow: inset 2px 2px 14px rgba(255, 255, 255, 0.46);
    filter: drop-shadow(0px 0px 4px ${colors.purple['600']})
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const GradientBorderWithNoShadow = styled.div<{
    colorFrom?: string;
    colorTo?: string;
}>`
    background: linear-gradient(
        ${(props) => props.colorFrom || colors.purple['300']},
        ${(props) => props.colorTo || colors.blue['300']}
    );
`;
