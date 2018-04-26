import React from 'react';
import { Table, Input, Popconfirm, Pagination, Menu, Dropdown, Button, Icon, Select, message } from 'antd';
import {CCFetch} from '../../ccutil/ccfetch'
import UserSearchForm from './component/UserSearchForm'
const Option = Select.Option;

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            param : {},
            totalCount : 0
        };
    }
    componentDidMount() {
        this.start()
    }
    start = () => {
        this.setState({ loading: true });
        let param = {};
        param.pageNum = 0;
        CCFetch("/user/list",param).then((res) => {
            this.setData(res,param)
        })
    };
    pageChange =(pageNumber)=> {
        let param = this.state.param;
        param.pageNum = pageNumber-1;
        CCFetch("/user/list", param).then((res) => {
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

    delete =(id)=>{
        let param = {};
        param.cellphone = id;
        CCFetch("/user/delete", param).then((res) => {
            if(res.code == 1){
                this.pageChange(1);
                message.success("成功删除")
            }else{
                message.error("删除失败，请重试或联系CC")
            }
        })
    }

    render() {

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            width:80
        },{
            title: '手机号',
            dataIndex: 'cellphone',
            width:120
        },{
            title: '消费金额',
            dataIndex: 'amount',
            width:80
        },{
            title: '交易次数',
            dataIndex: 'level',
            width:80,
        }, {
            title: '实名认证',
            dataIndex: 'sfz',
            width:160,
            render:(text) =>{
                return text?text:"未认证"
            }
        },{
            title: '标签',
            dataIndex: 'label',
            width:100,
            render:(text) =>{
                return text?text:'暂无'
            }
        },{
            title: '积分',
            dataIndex: 'score',
            width:100,
            render:(text) =>{
                return text?text:0
            }
        },{
            title: '操作',
            width:80,
            render:(record) =>{
                return (
                    <Popconfirm title="确定删除该用户？" okText="确定" cancelText="取消" onConfirm={()=>this.delete(record.cellphone)}>
                        <a>删除</a>
                    </Popconfirm>
                )
            }
        }];

        return (
            <div className="gutter-example">
                <div style={{width:"100%",background:" #021f1b0d",padding: "20px 30px",margin: "20px 0",borderRadius:" 10px"}}>
                    <UserSearchForm setData={this.setData} data={this.state.adminNames}/>
                </div>
                <Table
                    dataSource={this.state.data} 
                    pagination={false}
                    columns={columns} 
                    scroll={{ x: 800 }}
                />
                <Pagination showQuickJumper total={this.state.totalCount} onChange={this.pageChange} style={{marginTop:40,float:"right"}} />
            </div>
        );
    }
}
