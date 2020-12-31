import styled from 'styled-components';

const Container = styled.div.attrs((props) => ({
    className: `text-app_ivory w-full  ${props.children}`,
}))``;

export default Container;
