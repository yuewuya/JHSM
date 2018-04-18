/**
 * Created by hao.cheng on 2017/5/3.
 */
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
        let a = [];
        a.push(
                <li className="list-group-item">
                    <a href="" className="pull-left w-40 mr-m">
                        <img src={b1} className="img-responsive img-circle" alt="test" />
                    </a>
                    <div className="clear" style={{marginLeft:10}}>
                        <div>
                            <a href="">{data.userName}</a>
                            <span style={{float:"right"}}>刚刚</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        
                        <span className="text-muted">{data.content}</span>
                    </div>
                </li>
            );
        a = a.concat(this.state.messageList);
        this.setState({
            messageList : a
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
                                <span style={{float:"right"}}>{moment(data[i].createDate).calendar()}</span>&nbsp;&nbsp;&nbsp;&nbsp;
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

    deleteMSG =(id)=>{
        let params = {};
        params.id = id;
        CCFetch("/message/delete",params);
    }

    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={10}>
                <Col className="gutter-row" md={8}>
                    <div className="gutter-box">
                        <Card bordered={false}>
                            
                                <div className="pb-m">
                                    <h3>消息栏</h3>
                                </div>
                                <div style={{height:600,overflowY:"scroll",marginBottom:10}}>
                                    <a className="card-tool"><Icon type="sync" /></a>
                                    <ul className="list-group no-border" style={{paddingLeft:0}}>
                                        {this.state.messageList}
                                    </ul>
                                </div>
                            <div>
                                <TextArea id="addinfo" style={{height:50, width:"70%"}} placeholder="请输入内容"/>
                                <Button onClick={this.sendSocket} style={{height:50, width:"20%", marginLeft:10}} type="default">提交</Button>
                            </div>
                        </Card>
                    </div>
                </Col>
                    <Col className="gutter-row" md={16}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <EchartsProjects dddata = {this.state.dddata}/>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={16}>
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
                    {/* <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>访问量统计</h3>
                                    <small>最近7天用户访问量</small>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <EchartsViews />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>访问量统计</h3>
                                    <small>最近7天用户访问量</small>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <EchartsViews />
                            </Card>
                        </div>
                    </Col> */}
                </Row>
            </div>
        )
    }
}
