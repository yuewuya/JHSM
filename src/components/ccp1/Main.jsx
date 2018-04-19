import React from 'react';
import { Row, Col, Card, Timeline, Icon, Input, Button, message, Tabs} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import {CCFetch} from "../../ccutil/ccfetch";
import moment from 'moment';
import EchartsForce from '../charts/EchartsForce';
import Draggable from 'react-draggable';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;


export default class Main extends React.Component {
    constructor(props){
        super(props)
        this.state={
            dddata : [],
            messageList : [],
            maxMSGId :0,
            websocket : null,
            msgList : []
        }
    }

    componentDidMount(){
        this.dddata();
        this.startMessage();
        this.ljwebSocket()
    }

    componentWillUnmount(){
        this.state.websocket.close()
    }

    ljwebSocket =()=>{
        let that = this;
        let websocket = new WebSocket('ws://localhost:8080/MSGWebSocket');
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

    dddata =()=>{
        CCFetch("/orders/50day").then((res) => {
            this.setState({
                dddata : res.data
            })
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
                                        {/* <EchartsProjects dddata = {this.state.dddata}/> */}
                                        <Tabs
                                            defaultActiveKey="1"
                                            tabPosition="left"
                                            style={{height: 212}}
                                        >
                                            <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
                                            <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
                                            <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
                                            <TabPane tab="Tab 4" key="4">Content of tab 4</TabPane>
                                            <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
                                            <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
                                            <TabPane tab="Tab 7" key="7">Content of tab 7</TabPane>
                                            <TabPane tab="Tab 8" key="8">Content of tab 8</TabPane>
                                            <TabPane tab="Tab 9" key="9">Content of tab 9</TabPane>
                                        </Tabs>
                                    </Card>
                                </div>
                            </Col>

                            <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="TAB页" bordered={false}>
                                <Tabs defaultActiveKey="1" style={{height: 430}}>
                                    <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
                                            <EchartsForce/>
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                                        <div>
                                        <Col className="gutter-row" md={6}>
                                            <div className="gutter-box">
                                                <Draggable zIndex={100} {...dragHandlers}>
                                                    <Card bordered={false} className={'dragDemo'}>
                    
                                                        I can be dragged anywhere
                                                    </Card>
                                                </Draggable>
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" md={6}>
                                        <div className="gutter-box">
                                            <Draggable zIndex={100} {...dragHandlers}>
                                                <Card bordered={false} className={'dragDemo'}>
                
                                                    I can be dragged anywhere
                                                </Card>
                                            </Draggable>
                                        </div>
                                    </Col>
                                    <Col className="gutter-row" md={6}>
                                        <div className="gutter-box">
                                            <Draggable zIndex={100} {...dragHandlers}>
                                                <Card bordered={false} className={'dragDemo'}>
                    
                                                    I can be dragged anywhere
                                                </Card>
                                            </Draggable>
                                        </div>
                                    </Col>
                                </div>    
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
