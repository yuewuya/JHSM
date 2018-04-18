import React from 'react';
import { Table, Input, Popconfirm, Pagination, Menu, Dropdown, Button, Icon } from 'antd';
import {CCFetch} from '../../ccutil/ccfetch'

export default class OrderOptPad extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <Dropdown overlay={this.getOptLit()}>
                <a className="ant-dropdown-link">
                    &nbsp;&nbsp;操作&nbsp;&nbsp; <Icon type="down" />
              </a>
            </Dropdown>
        )
    }


    getOptLit =()=>{
        return (
            <Menu>
                <Menu.Item key="edit">修改</Menu.Item>
                <Menu.Item key="print">打印</Menu.Item>
                <Menu.Item key="delete">删除</Menu.Item>
            </Menu>
        )
    }

}