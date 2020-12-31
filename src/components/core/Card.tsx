import styled from 'styled-components';

const Card = styled.div.attrs((props) => ({
    className: `w-full p-4 mt-4 rounded-lg bg-app_dark  ${props.children}`,
}))``;

export default Card;
