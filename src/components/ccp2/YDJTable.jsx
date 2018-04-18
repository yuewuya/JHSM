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

export default class YDJTable extends React.Component {
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
            title: '提交时间',
            dataIndex: 'startTime',
            render:(text) =>{
                return (moment(text).calendar())
            }
        },{
            title: '备注',
            dataIndex: 'remark'
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
        CCFetch("/orders/YDJorders",param).then((res) => {
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
