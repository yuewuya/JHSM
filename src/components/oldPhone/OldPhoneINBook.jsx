import React from 'react';
import { Table, Input, Popconfirm, Pagination, Menu, Dropdown, Button, Icon, Select } from 'antd';
import {CCFetch} from '../../ccutil/ccfetch'
import moment from 'moment'
import BookForm from '../ccp2/components/BookForm'
import EditBookForm from '../ccp2/components/EditBookForm'
const Option = Select.Option;

export default class OldPhoneINBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            param : {},
            totalCount : 0,
        };
    }
    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        let param = {};
        param.pageNum = 0;
        param.type='二手回收';
        CCFetch("/books/orderList",param).then((res) => {
            this.setData(res,param)
        })
    };
    pageChange =(pageNumber)=> {
        let param = this.state.param;
        param.pageNum = pageNumber-1;
        CCFetch("/books/orderList", param).then((res) => {
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
            width:80
        },{
            title: '回收日期',
            dataIndex: 'time',
            width:140,
            render:(text) =>{
                return (moment(text).calendar())
            }
        },{
            title: '回收机型',
            dataIndex: 'bookname',
            width:120
        },{
            title: '回收价',
            dataIndex: 'cost',
            width:80,
        },{
            title: '备注',
            dataIndex: 'remark',
            width:160
        },{
            title: '操作',
            width:100,
            render: (text,record) => {
                return (
                    <EditBookForm row={record} reloadTable={this.pageChange}/>
                );
            },
        }];

        return (
            <div className="gutter-example">
                <div style={{width:"100%",background:" #021f1b0d",padding: "20px 30px",margin: "20px 0",borderRadius:" 10px"}}>
                    <BookForm setData={this.setData} type="二手回收"/>
                </div>
                <Table
                    dataSource={this.state.data} 
                    pagination={false}
                    columns={columns} 
                    scroll={{ x: 840 }}
                />
                <Pagination showQuickJumper total={this.state.totalCount} onChange={this.pageChange} style={{marginTop:40,float:"right"}} />
            </div>
        );
    }
}
