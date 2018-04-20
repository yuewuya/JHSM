import React from 'react';
import { Modal, Input, Popconfirm, Pagination, Menu, Dropdown, Button, Icon, Divider } from 'antd';
import {CCFetch} from '../../ccutil/ccfetch'
import QRCode from 'qrcode.react'
import PrintProvider,{Print} from 'react-easy-print'
import PrintTemplate from 'react-print'
import EditOrderForm from './components/EditOrderForm'

export default class OrderOptPad extends React.Component{
    constructor(props){
        console.log("-------------r",props.row)
        super(props);
        this.state = {
            visible:false
        }
    }

    print =()=>{
        this.setState({
            visible:true
        })
    }
    handleCancel =()=>{
        this.setState({
            visible:false
        })
    }
    printme =()=>{
        window.print();
    }

    render(){
        return (
            // <Dropdown overlay={this.getOptLit()}>
            //     <a className="ant-dropdown-link">
            //         操作<Icon type="down" />
            //   </a>
              
            // </Dropdown>
            <div>
                <a onClick={this.print}>编辑</a>
                <Divider type="vertical" />
                <a onClick={this.print}>删除</a>
                <EditOrderForm assigner={this.props.assigner} row={this.props.row}/>
                {/* <PrintProvider>

                <Modal visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onOk={this.printme}> 
                        <Print main name="foo">
                            <div id="print">
                                <h2>打印测试</h2>
                                <br/>
                                <h4>你看，这是一条信息，下面还有二维码呢</h4>
                                <QRCode 
                                    value="http://www.baidu.com" 
                                    size="60"
                                />
                                <h4>楼上是二维码，服不服</h4>
                                </div>
                                </Print>   
                        
                </ Modal>
                </PrintProvider> */}
            </div>
        )
    }


    getOptLit =()=>{
        return (
            <Menu>
                <Menu.Item key="edit">修改</Menu.Item>
                <Menu.Item key="print">打印</Menu.Item>
                <Menu.Item key="delete">删除</Menu.Item>
                {/* <QRCode 
                value="http://www.baidu.com" 
                size="60"
               /> */}
            </Menu>
        )
    }

}