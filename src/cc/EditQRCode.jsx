import React,{Component} from 'react'
import { Row, Col, Card, Timeline, Icon, Select, InputNumber , Button, Form, Input, message} from 'antd';
import {CCFetch} from "../ccutil/ccfetch";
import moment from 'moment'
import EditForm from './component/EditForm'

const Option = Select.Option;
const FormItem = Form.FormItem

export default class EditQRCode extends Component{
    constructor(props){
        super(props);
        this.state={
            data : [],
            id : props.match.params.id
        }
    }

    componentDidMount(){
        this.loadOrderTimeline()
    }

    loadOrderTimeline =()=>{
        let param = {};
        param.id = this.state.id;
        CCFetch('/orderLine/findByOrderId', param).then(res =>{
            let child = [];
            for(let i in res.data){
                child.push(
                    <Timeline.Item color="green">{moment(res.data[i].dateTime).format("YYYY-MM-DD HH:mm:ss") + " " + res.data[i].msg}</Timeline.Item>
                )
            }
            this.setState({
                data : child,
            })
        })
    }

    addTimeLine =()=>{
        let a = document.getElementById("addTimeLine").value;
        let param = {
            orderId : this.state.id,
            msg : a
        }
        CCFetch("/orderLine/add",param).then(res=>{
            if(res.code == 1){
                message.success("成功添加！");
                let b = this.state.data;
                b.unshift(<Timeline.Item color="green">{"刚刚 " + a}</Timeline.Item>)
            }else{
                message.error("添加失败，请重试或联系CC")
            }
        })
    }

    render(){
        
        return(
            <Row gutter={10}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                <h2>订单信息</h2><br/>
                                <Row gutter={10}>
                                <Col xs={6} offset={2}>
                                    <h4 style={{marginTop:10}}>客户姓名： </h4>
                                    <h4 style={{marginTop:22}}>联系电话 ：</h4>
                                    <h4 style={{marginTop:21}}>设备型号 ：</h4>
                                    <h4 style={{marginTop:21}}>故障描述 ：</h4>
                                    <h4 style={{marginTop:21}}>维修费用 ：</h4>
                                    <h4 style={{marginTop:21}}>售后保障 ：</h4>
                                    <h4 style={{marginTop:21}}>送修时间 ：</h4>
                                    <h4 style={{marginTop:21}}>承诺时间 ：</h4>
                                </Col>
                                <Col xs={16}>
                                    <EditForm ref={form => this.editForm = form} id={this.state.id} />
                                    </Col>
                                    </Row>
                                </div>
                                <hr/>
                                <br/>
                                <h2>服务状态：</h2>
                                <br/>
                                <a className="card-tool"><Icon type="sync" onClick={this.loadAllData}/></a>
                                <Timeline>
                                    {this.state.data}
                                </Timeline>
                                <Select
                                    mode="combobox"
                                    id="addTimeLine"
                                    style={{ width: 200 }}
                                    >
                                    <Option value="故障鉴定完成，维修中">故障鉴定完成，维修中</Option>
                                    <Option value="设备返厂维修">设备返厂维修</Option>
                                    <Option value="设备故障难以解决，协调取消">设备故障难以解决，协调取消</Option>
                                </Select>
                                <Button style={{marginLeft:10}} type="primary" onClick={this.addTimeLine}>新增</Button>
                            </Card>
                        </div>
                    </Col>
                </Row>
        )
    }

}