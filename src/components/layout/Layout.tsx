import React from 'react';
import { Container } from '../core';

export default function Layout({ children }: { children: any }) {
    return (
        <Container className={'h-screen xl:mx-auto relative bg-black  xl:w-1/3'}>
            <>{children}</>
        </Container>
    );
}
