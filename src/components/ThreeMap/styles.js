import styled from 'styled-components';

export const ImageContainer = styled.div`
    margin: auto;
    height: ${props => props.height ? props.height : "400px"};
    width: ${props => props.width ? props.width : "60vw"};

    @media (max-width: 600px) {
        height: 90vh;
    }
`