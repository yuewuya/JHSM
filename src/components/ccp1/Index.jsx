import React from 'react';
import { Row, Col, Card, Icon, Input, Button, message, Tabs, Table, Tag} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import {CCFetch} from "../../ccutil/ccfetch";
import moment from 'moment';
import EchartsForce from './component/EchartsForce';
import Draggable from 'react-draggable';
import AddType from './component/AddType';
import Tags from './component/Tags'
const { TextArea } = Input;
const TabPane = Tabs.TabPane;


export default class Index extends React.Component {
    constructor(props){
        super(props)
        this.state={
            messageList : [],
            maxMSGId :0,
            websocket : null,
            msgList : [],
            data : []
        }
    }

    componentDidMount(){
        this.startMessage();
        this.ljwebSocket();
        this.getAllTypeData()
    }

    getAllTypeData =()=>{
        CCFetch("/allType/main").then(res =>{
            this.setState({
                data : res.data
            })
        })
    }

    ljwebSocket =()=>{
        let that = this;
        let websocket = new WebSocket('ws://47.104.184.151:8080/MSGWebSocket');
        this.setState({
            websocket : websocket
        });
        websocket.onmessage = function (event) {
            let data = JSON.parse(event.data).data[0];
            that.addMSG(data);
        }
        window.onbeforeunload = function () {
            websocket.close();
        }
    }
    sendSocket =()=>{
        let admin = JSON.parse(localStorage.getItem("admin"))[0];
        this.saveMSG(admin);
        this.state.websocket.send(admin.id + "::" + admin.name + "::" + document.getElementById("addinfo").value);
        document.getElementById("addinfo").value = ''
    }
    addMSG =(data)=> {
        let a = this.state.msgList;
        a.unshift(data);
        this.setState({
            msgList : a,
            messageList : this.setmsglist(a)
        })
    }

    startMessage =()=>{
        CCFetch("/message/list").then(res =>{
            this.setState({
                msgList : res.data,
                messageList : this.setmsglist(res.data)
            })
        });
    }

    setmsglist =(data)=>{
        let a = [];
        for (let i = 0; i < data.length; i++){
            a.push(
                <li className="list-group-item">
                        <a href="" className="pull-left w-40 mr-m">
                            <img src={b1} className="img-responsive img-circle" alt="test" />
                        </a>
                        <div className="clear" style={{marginLeft:10}}>
                            <div>
                                <a href="">{data[i].userName}</a>
                                <Icon type="close" style={{fontSize: 15, float:"right"}} onClick={()=>this.deleteMSG(data[i].id, i)} />
                                <span style={{float:"right"}}>{data[i].createDate ? moment(data[i].createDate).calendar() : '刚刚'}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                            <span className="text-muted">{data[i].content}</span>
                        </div>
                </li>
            )
        }
        return a;
    }

    saveMSG =(admin)=>{
        let params = {};
        params.content = document.getElementById("addinfo").value;
        params.cellphone = admin.id;
        params.userName = admin.name;
        if(!params.content){
            message.error("请先输入留言信息");
            return;
        }
        CCFetch("/message/add",params);
    }

    deleteMSG =(id, i)=>{
        let params = {};
        params.id = id;
        CCFetch("/message/delete",params);
        let a = [];
        a = this.state.msgList;
        a.splice(i,1);
        this.setState({
            msgList : a,
            messageList : this.setmsglist(a)
        })
    }

    render() {
        const columns = [{
            title: '品牌',
            dataIndex: 'pp',
            width:100
        },{
            title: '种类',
            dataIndex: 'zl',
            width:70
        },{
            title: '型号',
            dataIndex: 'xh',
            width:870,
            render:(text,record)=>{
                return (<Tags text={text} row={record} />)
            }
        }];
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={10}>
                
                    <Col className="gutter-row" md={16}>
                        <Row gutter={10}>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false} className={'no-padding'}>
                                        <Tabs
                                            defaultActiveKey="1"
                                            tabPosition="left"
                                            style={{height: 212}}
                                        >
                                            <TabPane tab="新增机型" key="1">
                                                <AddType refresh={this.getAllTypeData}/>
                                            </TabPane>
                                            <TabPane tab="其他页面" key="2">
                                                <div style={{marginTop:50}}>
                                                    <Button onClick={()=>window.open("http://47.104.184.151/jh/#/userydj")} type="primary">用户登记页面</Button>
                                                    <Button onClick={()=>window.open("http://47.104.184.151/jh/#/editqrcode/118")} type="primary">增加流程页面</Button>
                                                    <Button onClick={()=>window.open("http://47.104.184.151/jh/#/printPage/118")} type="primary">数据打印页面</Button>
                                                </div>
                                                
                                            </TabPane>
                                            <TabPane tab="构思中" key="3">不知道该搞些什么</TabPane>
                                        </Tabs>
                                    </Card>
                                </div>
                            </Col>

                            <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="一些信息" bordered={false}>

                                

                                <Tabs defaultActiveKey="1" style={{height: 430}}>

                                    <TabPane tab={<span><Icon type="android" />常用机型</span>} key="1">
                                        <div style={{}} >
                                        <Table
                                            dataSource={this.state.data} 
                                            pagination={false}
                                            columns={columns} 
                                            scroll={{ x:1000,y: 320 }}
                                        />
                                        </div>    
                                    </TabPane>

                                    <TabPane tab={<span><Icon type="apple" />关系图</span>} key="2">
                                            <EchartsForce/>
                                    </TabPane>
                                    
                                </Tabs>
                        </Card>
                    </div>
                </Col>
                        </Row>
                    </Col>

                    <Col className="gutter-row" md={8}>
                    <div className="gutter-box">
                        <Card bordered={false}>
                            
                                <div className="pb-m">
                                    <h3>消息栏</h3>
                                </div>
                                <div style={{height:600,overflowY:"scroll",marginBottom:10}}>
                                    <a className="card-tool"><Icon type="sync" onClick={()=>this.startMessage()}/></a>
                                    <ul className="list-group no-border" style={{paddingLeft:0}}>
                                        {this.state.messageList}
                                    </ul>
                                </div>
                            <div>
                                <TextArea id="addinfo" style={{height:50, width:"70%"}} placeholder="请输入内容"/>
                                <Button onClick={()=>this.sendSocket()} style={{height:50, width:"20%", marginLeft:10}} type="default">提交</Button>
                            </div>
                        </Card>
                    </div>
                </Col>

                    
                </Row>
            </div>
        )
    }
}
