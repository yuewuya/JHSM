import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';
import CCLogin from './cc/CCLogin'
import UserYDJ from './cc/BasicForm'
import SearchQRCode from './cc/SearchQRCode'
import PrintPage from './cc/PrintPage'
import EditQRCode from './cc/EditQRCode'

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => localStorage.getItem("admin") ? <Redirect to="/app/dashboard/index" push /> : <Redirect to="/cclogin" push />} />        
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route path="/cclogin" component={CCLogin} />
            <Route path="/UserYDJ" component={UserYDJ} />
            <Route path="/SearchQRCode/:id" component={SearchQRCode} />
            <Route path="/EditQRCode/:id" component={EditQRCode} />
            <Route path='/PrintPage/:id' component={PrintPage} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)