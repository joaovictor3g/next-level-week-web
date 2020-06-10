import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import ListPoints from './pages/ListPoints';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create-point" exact component={CreatePoint} />
                    <Route path="/list-points" component={ListPoints} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;
