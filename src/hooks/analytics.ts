import React from 'react';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { useLocation } from 'react-router-dom';

/**
 * Don't run analytics if testing.
 * If testing analytics, set this to true manually.
 */

ReactGA.initialize(process.env.REACT_APP_GA_CODE as string);
ReactPixel.init(process.env.REACT_APP_PIXEL_ID as string);

function sendPageView(path: string): void {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);

    ReactPixel.pageView();
}

export function sendEvent(args: ReactGA.EventArgs): void {
    const { action, ...data } = args;

    ReactGA.event(args);
    ReactPixel.trackCustom(action, data);
}

export function usePageView(): void {
    const location = useLocation();

    React.useEffect(() => {
        const currentPath = location.pathname + location.search;
        sendPageView(currentPath);
    }, [location.pathname, location.search]);
}
