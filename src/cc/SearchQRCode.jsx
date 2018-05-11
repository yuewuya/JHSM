import React,{Component} from 'react'
import { Row, Col, Card, Timeline, Icon } from 'antd';
import {CCFetch} from "../ccutil/ccfetch";
import moment from 'moment'

export default class SearchQRCode extends Component{
    constructor(props){
        super(props);
        this.state={
            data : [],
            order : {},
            id : props.match.params.id
        }
    }

    componentDidMount(){
        this.loadAllData()
    }

    loadOrder =()=>{
        let param = {};
        param.id = this.state.id;
        CCFetch('/orders/findById', param).then(res =>{
            this.setState({
                order : res.data[0]
            })
        })
    }

    loadOrderTimeline =()=>{
        let param = {};
        param.id = this.state.id;
        CCFetch('/orderLine/findByOrderId', param).then(res =>{
            let child = [];
            for(let i in res.data){
                child.push(
                    <Timeline.Item color="green">{moment(res.data[i].createTime).format("YYYY-MM-DD HH:mm:ss") + " " + res.data[i].msg}</Timeline.Item>
                )
            }
            this.setState({
                data : child
            })
        })
    }

    loadAllData =()=>{
        this.loadOrder()
        this.loadOrderTimeline()
    }

    render(){
        const order = this.state.order;
        return(
            <Row gutter={10}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h2>预留信息：</h2>
                                    <h3>姓名： {order.userName}</h3>
                                    <h3>电话： {order.cellphone}</h3>
                                    <h3>设备： {order.type}</h3>
                                    <h3>故障描述： {order.startResource}</h3>
                                </div>
                                <hr/>
                                <br/>
                                <h2>服务状态：</h2>
                                <br/>
                                <a className="card-tool"><Icon type="sync" onClick={this.loadAllData}/></a>
                                <Timeline>
                                    {this.state.data}
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                </Row>
        )
    }

}