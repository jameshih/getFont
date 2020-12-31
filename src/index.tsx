import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

import './styles/build/index.css';

const Home = lazy(() => import('./components/pages/Home'));

function Root() {
    return (
        <Suspense fallback={<></>}>
            <Home />
        </Suspense>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
