import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create-point" component={CreatePoint} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;
