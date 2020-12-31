import React from 'react';
import { A } from 'hookrouter';

export default function Header({ path }: { path: string }) {
    return (
        <div
            className={`absolute top-0 z-10 flex justify-between w-full px-8 pt-4 text-xl font-medium bg-black opacity-90 ${
                path === '/report' ? 'pb-0' : 'pb-0'
            }`}
        >
            {path === '/' || path === '/blocks' ? (
                <>
                    <A href='/' className={path === '/' ? 'text-app_ivory' : 'text-app_gray'}>
                        Live Profit
                    </A>
                    <A
                        href='/blocks'
                        className={path === '/blocks' ? 'text-app_ivory' : 'text-app_gray'}
                    >
                        Recent Blocks
                    </A>
                </>
            ) : (
                <h1>{path.substring(1).charAt(0).toUpperCase() + path.slice(2)}</h1>
            )}
        </div>
    );
}
