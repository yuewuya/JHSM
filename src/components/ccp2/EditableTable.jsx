/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Input, Popconfirm, Pagination, Menu, Dropdown, Button, Icon, Select } from 'antd';
import {CCFetch} from '../../ccutil/ccfetch'
import SearchForm from '../forms/SearchForm'
import OrderOptPad from './OrderOptPad'
import moment from 'moment'
const Option = Select.Option;

export default class OrdersList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '编号',
            dataIndex: 'id'
        },{
            title: '姓名',
            dataIndex: 'userName'
        },{
            title: '手机号',
            dataIndex: 'cellphone'
        },{
            title: '开始时间',
            dataIndex: 'startTime',
            render:(text) =>{
                return (moment(text).calendar())
            }
        }, {
            title: '结束时间',
            dataIndex: 'endTime',
            render:(text) =>{
                return (moment(text).calendar())
            }
        },{
            title: '开始原因',
            dataIndex: 'startResource'
        },{
            title: '结束原因',
            dataIndex: 'endResource'
        },{
            title: '报价',
            dataIndex: 'startPrice'
        },{
            title: '成交价',
            dataIndex: 'endPrice'
        },{
            title: '备注',
            dataIndex: 'remark'
        },{
            title: '责任人',
            dataIndex: 'repair'
        },{
            title: '状态',
            dataIndex: 'state',
            render:(text) =>{
                switch(text) {
                    case -1 :
                    return "待审核";
                    case 0 :
                    return "未完成";
                    case 2 :
                    return "已完成";
                }
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <OrderOptPad />
                );
            },
        }];
        this.state = {
            loading: false,
            data: [],
            param : {},
            totalCount : 0,
            adminNames : []
        };
    }
    componentDidMount() {
        this.start();
        this.getAdminNames()
    }
    getAdminNames =()=>{
        CCFetch("/admin/names").then((res) => {
            let a = []
            for(let i in res.data){
                a.push(<Option value={res.data[i]}>{res.data[i]}</Option>)
            }
            this.setState({
                adminNames : a
            })
        })
    }
    start = () => {
        this.setState({ loading: true });
        let param = {};
        param.pageNum = 0;
        CCFetch("/orders/list",param).then((res) => {
            this.setData(res,param)
        })
    };
    pageChange =(pageNumber)=> {
        let param = this.state.param;
        param.pageNum = pageNumber-1;
        CCFetch("/orders/list", param).then((res) => {
            this.setData(res,param)
        })
    }
    

    setData =(data,param)=> {
        this.setState({
            data : data.data,
            param : param,
            loading : false,
            totalCount : data.count
        })
    }

    render() {
        return (
            <div className="gutter-example">
                <div style={{width:"100%",background:" #021f1b0d",padding: "20px 30px",margin: "20px 0",borderRadius:" 10px"}}>
                    <SearchForm setData={this.setData} data={this.state.adminNames}/>
                </div>
                <Table
                    // bordered 
                    dataSource={this.state.data} 
                    pagination={false}
                    columns={this.columns} 
                />
                <Pagination showQuickJumper total={this.state.totalCount} onChange={this.pageChange} style={{marginTop:40,float:"right"}} />
            </div>
        );
    }
}
