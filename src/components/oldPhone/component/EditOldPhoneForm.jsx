/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, InputNumber, Select, Divider, message,Popconfirm, Row, Col  } from 'antd';
import moment from 'moment'
import {CCFetch} from '../../../ccutil/ccfetch'
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
    },
};

const admin = JSON.parse(localStorage.getItem("admin")) ? JSON.parse(localStorage.getItem("admin"))[0] : {role : 0};

const SellForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, row } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="修改订单"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
                width={400}
            >
            <div style={{marginLeft:40,marginTop:20}}>
                <Form layout="vertical">
                    <FormItem {...formItemLayout} label="出售价">
                        {getFieldDecorator('endPrice', {
                            initialValue: row.endPrice!=0?row.endPrice:row.midPrice
                        })(
                            <InputNumber style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="买家姓名">
                        {getFieldDecorator('tousername', {
                            initialValue: ''
                        })(
                            <Input style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="买家号码">
                        {getFieldDecorator('tocellphone', {
                            initialValue: ''
                        })(
                            <Input style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>
                </Form>
            </div>
            </Modal>
        );
    }
);

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, assigner, row } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="修改信息"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
                width={800}
            >
            <div style={{marginLeft:40,marginTop:20}}>
                <Form layout="vertical" hideRequiredMark={true}>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="设备型号">
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请输入设备型号!' }],
                                    initialValue: row.type
                                })(
                                    <Input style={{marginTop:-10, width:200}}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="lmei">
                                {getFieldDecorator('lmei', {
                                    initialValue: row.lmei
                                })(
                                    <Input style={{marginTop:-10, width:200}}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="内存">
                                {getFieldDecorator('ram', {
                                    initialValue: row.ram?row.ram:'未记录'
                                })(
                                    <Select style={{marginTop:-10, width:200}}>
                                        <Option value="8G">8G</Option>
                                        <Option value="16G">16G</Option>
                                        <Option value="32G">32G</Option>
                                        <Option value="64G">64G</Option>
                                        <Option value="128G">128G</Option>
                                        <Option value="256G">256G</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="颜色">
                                {getFieldDecorator('color', {
                                    initialValue: row.color?row.color:'未记录'
                                })(
                                    <Select style={{marginTop:-10, width:200}}>
                                        <Option value="黑色">黑色</Option>
                                        <Option value="白色">白色</Option>
                                        <Option value="金色">金色</Option>
                                        <Option value="粉色">粉色</Option>
                                        <Option value="其他">其他</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="保修期">
                                {getFieldDecorator('outTime', {
                                    initialValue: row.outTime ? moment(row.outTime) : null
                                })(
                                    <DatePicker 
                                        format="YYYY-MM-DD"
                                        style={{marginTop:-10, width:200}}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="新鲜度">
                                {getFieldDecorator('endTime', {
                                    initialValue: row.endTime ? moment(row.endTime) : null
                                })(
                                    <DatePicker 
                                        format="YYYY-MM-DD HH:mm:ss"
                                        style={{marginTop:-10, width:200}}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="零售价">
                                {getFieldDecorator('midPrice', {
                                    initialValue: row.midPrice
                                })(
                                    <InputNumber style={{marginTop:-10, width:200}}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="回收人">
                                {getFieldDecorator('assigner', {
                                    initialValue: row.assigner
                                })(
                                    <Select style={{marginTop:-10, width:200}}>
                                        {assigner}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            </Modal>
        );
    }
);

class EditOldPhoneForm extends Component {
    state = {
        visible: false,
        sellVisible: false,
        printArea : []
    };
    showModal = () => {
        this.setState({ visible: true });
    };
    showSellModal = () => {
        this.setState({ sellVisible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleSellCancel = () => {
        this.setState({ sellVisible: false });
    };
    handleCreate = () => {
        this.saveForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log("-----------values", values)
            let param = this.props.row;
            param.type = values.type;
            param.lmei = values.lmei;
            param.ram = values.ram;
            param.color = values.color;
            param.outTime = values.outTime;
            param.endTime = values.endTime;
            param.midPrice = values.midPrice;
            param.assigner = values.assigner;
            CCFetch("/oldPhone/edit", param).then((res) => {
                if(res.code == 1){
                    this.props.reloadTable(1);
                    message.success("修改成功")
                }else{
                    message.error("修改失败，请重试或联系CC")
                }
            })


            this.saveForm.resetFields();
            this.setState({ visible: false });
        });
    };

    sell =()=> {
        this.sellForm.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log("======values",values)
            console.log("-------row",this.props.row)
            let param = this.props.row;
            param.endPrice = values.endPrice;
            param.tousername = values.tousername;
            param.tocellphone = values.tocellphone;
            param.state = '已出售';
            console.log("======param",param)
            CCFetch("/oldPhone/sell", param).then((res) => {
                if(res.code == 1){
                    this.props.reloadTable(1);
                    message.success("成功出售")
                }else{
                    message.error("出售失败，请重试或联系CC")
                }
            })
            this.sellForm.resetFields();
            this.setState({ sellVisible: false });
        });

    }

    deleteOrder =()=>{
        let param = {};
        param.id = this.props.row.id;
        CCFetch("/oldPhone/delete", param).then((res) => {
            if(res.code == 1){
                this.props.reloadTable(1);
                message.success("成功删除")
            }else{
                message.error("删除失败，请重试或联系CC")
            }
        })
    }

    // createPrintArea =()=>{
    //     window.open("http://localhost:3006/#/printPage/"+this.props.row.id);
    // }

    render() {
        return (
            <div>
                <a onClick={this.showModal}>编辑</a>
                
                {this.props.row.state == '库存' ? (<Divider type="vertical" />) : ''}
                {this.props.row.state == '库存' ? (
                    // <Popconfirm title="完成该订单并发送短信？" okText="确定" cancelText="取消" onConfirm={this.sendSms}>
                        <a onClick={this.showSellModal}>完成</a>
                    // </Popconfirm>
                    ) : ''}
                
                {/* <Divider type="vertical" />
                <a onClick={this.createPrintArea}>打印</a> */}
                
                {admin.role >= 99 ? <Divider type="vertical" /> : ''}
                {admin.role >= 99 ? <Popconfirm title="确定删除？" okText="删除" cancelText="取消" onConfirm={this.deleteOrder}>
                    <a>删除</a>
                </Popconfirm> : ''}
                
                <CollectionCreateForm
                    ref={form =>this.saveForm = form}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    assigner={this.props.assigner}
                    row = {this.props.row}
                />
                <SellForm
                    ref={form => this.sellForm = form}
                    visible={this.state.sellVisible}
                    onCancel={this.handleSellCancel}
                    onCreate={this.sell}
                    row = {this.props.row}
                />
            </div>
        );
    }
}

export default EditOldPhoneForm;