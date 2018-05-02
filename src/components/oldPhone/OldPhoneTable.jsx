/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Input, Popconfirm, Pagination, Menu, Dropdown, Button, Icon, Select } from 'antd';
import {CCFetch} from '../../ccutil/ccfetch'
import OldPhoneSearchForm from './component/OldPhoneSearchForm'
import moment from 'moment'
import EditOldPhoneForm from './component/EditOldPhoneForm'
const Option = Select.Option;

export default class OldPhoneList extends React.Component {
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
        CCFetch("/oldPhone/list",param).then((res) => {
            this.setData(res,param)
        })
    };
    pageChange =(pageNumber)=> {
        let param = this.state.param;
        param.pageNum = pageNumber-1;
        CCFetch("/oldPhone/list", param).then((res) => {
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
            title: '卖家姓名',
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
            title: '颜色',
            dataIndex: 'color',
            width:80,
            render:(text) =>{
                return text ? text : '未记录'
            }
        },{
            title: '内存',
            dataIndex: 'ram',
            width:80,
            render:(text) =>{
                return text ? text : '未记录'
            }
        },{
            title: '回收时间',
            dataIndex: 'startTime',
            width:140,
            render:(text) =>{
                return (moment(text).calendar())
            }
        }, {
            title: '剩余保修',
            dataIndex: 'outTime',
            width:80,
            render:(text) =>{
                return text ? (moment(text).fromNow()) : '未记录'
            }
        },{
            title: '新鲜度',
            dataIndex: 'endTime',
            width:140,
            render:(text) =>{
                return (moment(text).calendar())
            }
        },{
            title: '回收价',
            dataIndex: 'startPrice',
            width:100
        },{
            title: '零售价',
            dataIndex: 'midPrice',
            width:100
        },{
            title: '出售价',
            dataIndex: 'endPrice',
            width:80
        },{
            title: '回收人',
            dataIndex: 'assigner',
            width:100
        },{
            title: '状态',
            dataIndex: 'state',
            width:100,
        },{
            title: '操作',
            width:200,
            fixed: 'right',
            render: (text,record) => {
                return (
                    <EditOldPhoneForm assigner={this.state.adminNames} row={record} reloadTable={this.pageChange}/>
                );
            },
        }];

        return (
            <div className="gutter-example">
                <div style={{width:"100%",background:" #021f1b0d",padding: "20px 30px",margin: "20px 0",borderRadius:" 10px",overflow:"hidden"}}>
                    <OldPhoneSearchForm setData={this.setData} data={this.state.adminNames}/>
                </div>
                <Table
                    // bordered 
                    dataSource={this.state.data} 
                    pagination={false}
                    columns={columns} 
                    scroll={{ x: 1690 }}
                />
                <Pagination showQuickJumper total={this.state.totalCount} onChange={this.pageChange} style={{marginTop:40,float:"right"}} />
            </div>
        );
    }
}
