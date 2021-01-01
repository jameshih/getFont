import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as analytics from './hooks/analytics';

import './styles/build/index.css';

const Home = lazy(() => import('./components/pages/Home'));

function Page() {
    analytics.usePageView();
    return (
        <Suspense fallback={<></>}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Suspense>
    );
}

function Root() {
    return (
        <Router>
            <Page />
        </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));
