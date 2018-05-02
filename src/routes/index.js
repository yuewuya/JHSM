import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AuthBasic from '../components/auth/Basic';
import RouterEnter from '../components/auth/RouterEnter';
import CCLogin from '../cc/CCLogin'
import Index from '../components/ccp1/Index'
import OrdersList from '../components/ccp2/EditableTable'
import YDJTable from '../components/ccp2/YDJTable'
import OldPhoneList from '../components/oldPhone/OldPhoneTable'
import UserList from '../components/userList/UserList'
import EmployeeList from '../components/employee/EmployeeList'
import OrderBook from '../components/ccp2/OrderBook'
import OldPhoneINBook from '../components/oldPhone/OldPhoneINBook'
import OldPhoneOUTBook from '../components/oldPhone/OldPhoneOUTBook'
import AllBook from '../components/chart/AllBook'
import AmountQXT from '../components/chart/AmountQXT'

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };

    requireUser = (component) => {
        const user = localStorage.getItem("admin");
        if (!user) return <Redirect to={'/cclogin'} />;
        return component;
    }
    render() {
        return (
            <Switch>
                <Route exact path="/app/cc/Index" component={(props)=> this.requireUser(<Index />)} />

                <Route exact path="/app/order/list" component={OrdersList} />
                <Route exact path="/app/order/YDJList" component={YDJTable} />
                <Route exact path="/app/order/book" component={OrderBook} />
                
                <Route exact path="/app/oldPhone/list" component={OldPhoneList} />
                <Route exact path="/app/oldPhone/inbook" component={OldPhoneINBook} />
                <Route exact path="/app/oldPhone/outbook" component={OldPhoneOUTBook} />

                <Route exact path="/app/user/list" component={UserList} />

                <Route exact path="/app/employee/list" component={EmployeeList} />

                <Route exact path="/app/chart/AllBook" component={AllBook} />
                <Route exact path="/app/chart/AmountQXT" component={AmountQXT} />



                <Route render={() => <Redirect to="/404" />} />

                
                
            </Switch>
        )
    }
}