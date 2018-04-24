import React from 'react';
import { Modal, Input, Popconfirm, Pagination, Menu, Dropdown, Button, Icon, Divider } from 'antd';
import QRCode from 'qrcode.react'
import PrintProvider,{Print,NOPRINT} from 'react-easy-print'
import PrintTemplate from 'react-print'

export default class PrintPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            id : props.match.params.id
        }
    }

    componentDidMount(){
        this.printme()
    }

    printme =()=>{
        window.print();
    }

    render(){
        const url = "http://localhost:3006/#/printPage/" + this.state.id
        return (
            <div>
                <h2>打印测试</h2>
                <br/>
                <h4>你看，这是一条信息，id:{this.state.id}</h4>
                <QRCode 
                    value={url}
                    size="120"
                />
                <h4>楼上是二维码，服不服</h4>
            </div>
        )
    }


}