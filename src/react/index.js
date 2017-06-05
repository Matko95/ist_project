/* React imports */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

/* Routing / Redux / store imports */
import { BrowserRouter } from 'react-router-dom';

import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import store  from './store';

/* CSS import */
import '../sass/style.scss';

/* App components import */
import App from './components/App/App';
import NotFound from './components/404/';
import Login from './components/Login/';

const router = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </Provider>
);

render((<AppContainer>{router}</AppContainer>),document.getElementById("app"));

module.hot.accept();