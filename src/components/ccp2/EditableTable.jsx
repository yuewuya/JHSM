/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Input, Popconfirm, Pagination, Menu, Dropdown, Button, Icon, Select } from 'antd';
import {CCFetch} from '../../ccutil/ccfetch'
import SearchForm from './components/SearchForm'
import moment from 'moment'
import EditOrderForm from './components/EditOrderForm'
const Option = Select.Option;

export default class OrdersList extends React.Component {
    constructor(props) {
        super(props);
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
        param.type = '普通订单';
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

        const columns = [{
            title: '编号',
            dataIndex: 'id',
            width:70
        },{
            title: '姓名',
            dataIndex: 'userName',
            width:80
        },{
            title: '手机号',
            dataIndex: 'cellphone',
            width:120
        },{
            title: '设备',
            dataIndex: 'type',
            width:120
        },{
            title: '送修时间',
            dataIndex: 'startTime',
            width:140,
            render:(text) =>{
                return (moment(text).calendar())
            }
        }, {
            title: '承诺时间',
            dataIndex: 'endTime',
            width:145,
            render:(text,record) =>{
                if(record.state == 2){
                    return "按时完成";
                }else if(moment(text) < moment()){
                    return (<span style={{color:"red"}}>已超时，快处理</span>)
                }else{
                    return (<span style={{color:"green"}}>{moment(text).fromNow()}</span>)
                }
                
            }
        },{
            title: '故障描述',
            dataIndex: 'startResource',
            width:160
        },{
            title: '售后保障',
            dataIndex: 'endResource',
            width:160
        },{
            title: '报价',
            dataIndex: 'startPrice',
            width:80
        },{
            title: '成交价',
            dataIndex: 'endPrice',
            width:80
        },{
            title: '设备密码',
            dataIndex: 'remark',
            width:120
        },{
            title: '责任人',
            dataIndex: 'repair',
            width:100
        },{
            title: '状态',
            dataIndex: 'state',
            width:100,
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
            width:250,
            fixed: 'right',
            render: (text,record) => {
                return (
                    <EditOrderForm assigner={this.state.adminNames} row={record} reloadTable={this.pageChange}/>
                );
            },
        }];

        return (
            <div className="gutter-example">
                <div style={{width:"100%",background:" #021f1b0d",padding: "20px 30px",margin: "20px 0",borderRadius:" 10px",overflow:"hidden"}}>
                    <SearchForm setData={this.setData} data={this.state.adminNames}/>
                </div>
                <Table
                    // bordered 
                    dataSource={this.state.data} 
                    pagination={false}
                    columns={columns} 
                    scroll={{ x: 1605 }}
                />
                <Pagination showQuickJumper total={this.state.totalCount} onChange={this.pageChange} style={{marginTop:40,float:"right"}} />
            </div>
        );
    }
}
