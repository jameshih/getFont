import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import store from './store';
import './styles/build/index.css';

import NotFound from './components/pages/NotFound';
const Home = lazy(() => import('./components/pages/Home'));

function Root() {
    return (
        <Provider store={store}>
            <Router>
                <Suspense fallback={<></>}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        </Provider>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
