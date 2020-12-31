import styled from 'styled-components';

const Content = styled.div.attrs((props) => ({
    className: `h-screen px-4  pb-24 overflow-y-scroll scrolling-touch ${props}`,
}))``;

export default Content;
