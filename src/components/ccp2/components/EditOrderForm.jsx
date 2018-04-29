import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, InputNumber, Select, Divider, message,Popconfirm  } from 'antd';
import moment from 'moment'
import {CCFetch} from '../../../ccutil/ccfetch'
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
    },
};


const admin = JSON.parse(localStorage.getItem("admin")) ? JSON.parse(localStorage.getItem("admin"))[0] : {role : 0};

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, assigner, row } = props;
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
            <div style={{marginLeft:30}}>
                <Form layout="vertical">

                    <FormItem {...formItemLayout} label="设备型号">
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请输入设备型号!' }],
                            initialValue: row?row.type:''
                        })(
                            <Input style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="故障描述">
                        {getFieldDecorator('startResource', {
                            rules: [{ required: true, message: '请输入故障描述!' }],
                            initialValue: row?row.startResource:""
                        })(
                            <Input style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="承诺时间">
                        {getFieldDecorator('endTime', {
                            rules: [{ required: true, message: '请选择承诺时间!' }],
                            initialValue: moment(row.endTime)
                        })(
                            <DatePicker 
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{marginTop:-10, width:200}}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="实收金额">
                        {getFieldDecorator('endPrice', {
                            rules: [{ required: true, message: '请输入实收金额!' }],
                            initialValue: row.endPrice!=0?row.endPrice:row.startPrice
                        })(
                            <InputNumber style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="售后保障">
                        {getFieldDecorator('endResource', {
                            rules: [{ required: true, message: '请选择售后保障!' }],
                            initialValue: row.endResource
                        })(
                            <Select style={{marginTop:-10, width:200}}>
                                <Option value="当面验收，离店不保">当面验收，离店不保</Option>
                                <Option value="7天">7天</Option>
                                <Option value="一个月">一个月</Option>
                                <Option value="三个月">三个月</Option>
                                <Option value="六个月">六个月</Option>
                                <Option value="一年">一年</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="责任人">
                        {getFieldDecorator('repair', {
                            rules: [{ required: true, message: '请选择责任人!' }],
                            initialValue: row.repair
                        })(
                            <Select style={{marginTop:-10, width:200}}>
                                {assigner}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </div>
            </Modal>
        );
    }
);

class EditOrderForm extends Component {
    state = {
        visible: false,
        printArea : []
    };
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            let param = this.props.row;
            param.type = values.type;
            param.startResource = values.startResource;
            param.endTime = values.endTime;
            param.startPrice = values.endPrice;
            param.endResource = values.endResource;
            param.repair = values.repair;
            CCFetch("/orders/edit", param).then((res) => {
                if(res.code == 1){
                    this.props.reloadTable(1);
                    message.success("修改成功")
                }else{
                    message.error("修改失败，请重试或联系CC")
                }
            })


            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };

    sendSms =()=> {
        CCFetch("/orders/sendSms", this.props.row).then((res) => {
            if(res.code == 1){
                this.props.reloadTable(1);
                message.success(res.msg)
            }else{
                message.error(res.msg)
            }
        })

    }

    deleteOrder =()=>{
        let param = {};
        param.id = this.props.row.id;
        CCFetch("/orders/delete", param).then((res) => {
            if(res.code == 1){
                this.props.reloadTable(1);
                message.success("成功删除")
            }else{
                message.error("删除失败，请重试或联系CC")
            }
        })
    }

    createPrintArea =()=>{
        window.open("http://localhost:3006/#/printPage/"+this.props.row.id);
    }

    render() {
        return (
            <div>
                <a onClick={this.showModal}>编辑</a>

                <Divider type="vertical" />
                <a onClick={this.createPrintArea}>打印</a>
                
                {this.props.row.state != 2 ? (<Divider type="vertical" />) : ''}
                {this.props.row.state != 2 ? (
                    <Popconfirm title="完成该订单并发送短信？" okText="确定" cancelText="取消" onConfirm={this.sendSms}>
                        <a>完成</a>
                    </Popconfirm>
                    ) : ''}
                
                
                
                {admin.role >= 99 ? <Divider type="vertical" /> : ''}
                {admin.role >= 99 ? <Popconfirm title="确定删除？" okText="删除" cancelText="取消" onConfirm={this.deleteOrder}>
                    <a>删除</a>
                </Popconfirm> : ''}
                
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    assigner={this.props.assigner}
                    row = {this.props.row}
                />
                
            </div>
        );
    }
}

export default EditOrderForm;