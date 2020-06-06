import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import Success from './pages/Success';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create-point" exact component={CreatePoint} />
                    <Route path="/success" component={Success} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;
