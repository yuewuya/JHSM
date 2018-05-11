import React from 'react';
import QRCode from 'qrcode.react'
import PrintProvider,{Print,NOPRINT} from 'react-easy-print'
import {CCFetch} from '../ccutil/ccfetch'
import moment from 'moment'
import PrintTemplate from 'react-print'

export default class PrintPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            id : props.match.params.id,
            order : {}
        }
    }

    componentDidMount(){
        this.start();
    }

    start =()=>{
        let param = {
            id : this.props.match.params.id
        };
        CCFetch("/orders/findById",param).then(res =>{
            this.setState({
                order : res.data[0]
            });
            window.print();
        })

    }

    render(){
        const order = this.state.order;
        const url = "http://47.104.184.151/jh/#/searchqrcode/" + this.state.id
        const editUrl = "http://47.104.184.151/jh/#/editqrcode/" + this.state.id
        return (
            <div style={{width:200, marginLeft:20}}>
                <h2 style={{marginBottom:20,marginTop:0,textAlign:'center',borderBottom:"1px dashed black",paddingBottom:20}}>
                    存单
                </h2>
                <h4 style={{paddingLeft:20}}>姓名:{order.userName}</h4>
                <h4 style={{paddingLeft:20}}>电话:{order.cellphone}</h4>
                <h4 style={{paddingLeft:20}}>密码:{order.remark}</h4>
                <h4 style={{paddingLeft:20}}>故障:{order.startResource}</h4>

                <h3 style={{marginBottom:20,marginTop:20,textAlign:'center',borderBottom:"1px dashed black",paddingBottom:20}}>
                    扫二维码看详情、添加流程
                    <QRCode 
                        style={{marginTop:20}}
                        value={editUrl}
                        size="120"
                    />
                </h3>

                <h2 style={{marginBottom:20,marginTop:20,textAlign:'center',borderBottom:"1px dashed black",paddingBottom:20}}>
                    回执单
                </h2>
                <h4 style={{paddingLeft:20}}>客户姓名:{order.userName}</h4>
                <h4 style={{paddingLeft:20}}>预计费用:{order.startPrice}</h4>
                <h4 style={{paddingLeft:20}}>送修时间:{moment(order.startTime).calendar()}</h4>
                <h4 style={{paddingLeft:20}}>售后保障:{order.endResource}</h4>
                <h4 style={{paddingLeft:20}}>售后微信:phflysk</h4>
                <h4 style={{paddingLeft:20}}>售后qq:634636488</h4>

                <h3 style={{marginBottom:20,marginTop:20,textAlign:'center',borderBottom:"1px dashed black",paddingBottom:20}}>
                    扫码查看详情
                    <QRCode 
                        style={{marginTop:20}}
                        value={url}
                        size="120"
                    />
                </h3>
            </div>
            
        )
    }


}