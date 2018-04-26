/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import BasicForm from '../components/forms/BasicForm';
import BasicTable from '../components/tables/BasicTables';
import AdvancedTable from '../components/tables/AdvancedTables';
import AsynchronousTable from '../components/tables/AsynchronousTable';
import Echarts from '../components/charts/Echarts';
import Recharts from '../components/charts/Recharts';
import Icons from '../components/ui/Icons';
import Buttons from '../components/ui/Buttons';
import Spins from '../components/ui/Spins';
import Modals from '../components/ui/Modals';
import Notifications from '../components/ui/Notifications';
import Tabs from '../components/ui/Tabs';
import Banners from '../components/ui/banners';
import Drags from '../components/ui/Draggable';
import Dashboard from '../components/dashboard/Dashboard';
import Gallery from '../components/ui/Gallery';
import BasicAnimations from '../components/animation/BasicAnimations';
import ExampleAnimations from '../components/animation/ExampleAnimations';
import AuthBasic from '../components/auth/Basic';
import RouterEnter from '../components/auth/RouterEnter';
import Wysiwyg from 'bundle-loader?lazy!../components/ui/Wysiwyg';  // 按需加载富文本配置
import Bundle from '../components/widget/Bundle';
import Cssmodule from '../components/cssmodule';
import MapUi from '../components/ui/map';
import CCLogin from '../cc/CCLogin'
import Main from '../components/ccp1/Main'
import OrdersList from '../components/ccp2/EditableTable'
import YDJTable from '../components/ccp2/YDJTable'
import OldPhoneList from '../components/oldPhone/OldPhoneTable'
import UserList from '../components/userList/UserList'
import EmployeeList from '../components/employee/EmployeeList'
import OrderBook from '../components/ccp2/OrderBook'
import OldPhoneINBook from '../components/oldPhone/OldPhoneINBook'
import OldPhoneOUTBook from '../components/oldPhone/OldPhoneOUTBook'
import AllBook from '../components/chart/AllBook'

const WysiwygBundle = (props) => (
    <Bundle load={Wysiwyg}>
        {(Component) => <Component {...props} />}
    </Bundle>
);

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
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
                <Route exact path="/app/dashboard/index" component={(props)=> this.requireUser(<Dashboard />)} />
                <Route exact path="/app/cc/main" component={Main} />

                <Route exact path="/app/order/list" component={OrdersList} />
                <Route exact path="/app/order/YDJList" component={YDJTable} />
                <Route exact path="/app/order/book" component={OrderBook} />
                
                <Route exact path="/app/oldPhone/list" component={OldPhoneList} />
                <Route exact path="/app/oldPhone/inbook" component={OldPhoneINBook} />
                <Route exact path="/app/oldPhone/outbook" component={OldPhoneOUTBook} />

                <Route exact path="/app/user/list" component={UserList} />

                <Route exact path="/app/employee/list" component={EmployeeList} />

                <Route exact path="/app/chart/AllBook" component={AllBook} />

                <Route exact path="/app/form/basicForm" component={BasicForm} />
                <Route exact path="/app/table/basicTable" component={BasicTable} />

                <Route exact path="/app/table/advancedTable" component={AdvancedTable} />
                <Route exact path="/app/table/asynchronousTable" component={AsynchronousTable} />
                <Route exact path="/app/chart/echarts" component={Echarts} />
                <Route exact path="/app/chart/recharts" component={Recharts} />

                <Route exact path="/app/ui/icons" component={Icons} />
                <Route exact path="/app/ui/buttons" component={Buttons} />
                <Route exact path="/app/ui/spins" component={Spins} />
                <Route exact path="/app/ui/modals" component={Modals} />
                <Route exact path="/app/ui/notifications" component={Notifications} />
                <Route exact path="/app/ui/tabs" component={Tabs} />
                <Route exact path="/app/ui/banners" component={Banners} />
                <Route exact path="/app/ui/wysiwyg" component={WysiwygBundle} />
                <Route exact path="/app/ui/drags" component={Drags} />
                <Route exact path="/app/ui/gallery" component={Gallery} />
                <Route exact path="/app/ui/map" component={MapUi} />

                <Route exact path="/app/animation/basicAnimations" component={BasicAnimations} />
                <Route exact path="/app/animation/exampleAnimations" component={ExampleAnimations} />

                <Route exact path="/app/auth/basic" component={AuthBasic} />
                <Route exact path="/app/auth/routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />

                <Route exact path="/app/cssModule" component={Cssmodule} />


                <Route render={() => <Redirect to="/404" />} />

                
                
            </Switch>
        )
    }
}