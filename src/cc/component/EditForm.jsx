/**
 * CC
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message, Select,InputNumber } from 'antd';
import {Redirect } from 'react-router-dom';
import {CCFetch} from '../../ccutil/ccfetch'
import moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;

class NormalLoginForm extends Component {
    constructor(props){
        super(props);
        this.state={
            flag : false,
            order : {}
        }
    }

    componentDidMount(){
        this.loadOrder()
    }

    loadOrder =()=>{
        let param = {};
        param.id = this.props.id;
        CCFetch('/orders/findById', param).then(res =>{
            this.setState({
                order : res.data[0]
            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let url = "/orders/edit";
                let param = this.state.order;
                param.userName = values.userName;
                param.type = values.type;
                param.startResource = values.startResource;
                param.endPrice = values.endPrice;
                param.endResource = values.endResource;

                CCFetch(url,param).then((res) => {
                    if(res.code == 0){
                        message.error("修改失败，请重试或联系CC")
                    }else if(res.code == 1){
                        message.success("修改成功");
                        this.setState({
                            user : values,
                            flag : false,
                            order : param
                        })
                    }
                })

            }
        });
    }

    edit =()=>{
        this.setState({
            flag : true
        })
    }

    ok =()=>{
        this.setState({
            flag : false
        })
    }

    render() {
        const order = this.state.order;
        const flag = this.state.flag;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 5, offset: 2 },
                sm: { span: 5, offset: 2 },
            },
            wrapperCol: {
                xs: { span: 10, offset: 1  },
                sm: { span: 10, offset: 1 },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}} hideRequiredMark={true}>
                                        <FormItem
                                        style={{margin:0}}
                                        // {...formItemLayout}
                                        // label="客户姓名："
                                        >
                                            {flag?
                                                getFieldDecorator('userName', {
                                                rules: [{ required: true, message: '请输入客户姓名!' }],
                                                initialValue: order.userName
                                            })(
                                                <Input  style={{marginTop:-50, width:200}} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="客户姓名" />
                                            )
                                            : order.userName
                                        }
                                        </FormItem>
                                        <FormItem
                                        style={{margin:0}}
                                        // {...formItemLayout}
                                        // label="联系电话："
                                        >
                                            {order.cellphone}
                                        </FormItem>
                                        <FormItem
                                        style={{margin:0}}
                                        // {...formItemLayout}
                                        // label="设备型号："
                                        >
                                            {flag?
                                                getFieldDecorator('type', {
                                                rules: [{ required: true, message: '请输入设备型号!' }],
                                                initialValue: order.type
                                            })(
                                                <Input  style={{marginTop:-10, width:200}} prefix={<Icon type="mobile" style={{ fontSize: 13 }} />} placeholder="设备型号" />
                                            )
                                            : order.type
                                        }
                                        </FormItem>
                                        <FormItem
                                        style={{margin:0}}
                                        // {...formItemLayout}
                                        // label="故障描述："
                                        >
                                            {flag?
                                                getFieldDecorator('startResource', {
                                                rules: [{ required: true, message: '请输入故障描述!' }],
                                                initialValue: order.startResource
                                            })(
                                                <Input style={{marginTop:-10, width:200}} prefix={<Icon type="question" style={{ fontSize: 13 }} />} placeholder="故障描述" />
                                            )
                                            : order.startResource
                                        }
                                        </FormItem>
                                        <FormItem
                                        style={{margin:0}}
                                        // {...formItemLayout}
                                        // label="维修费用："
                                        >
                                            {flag?
                                                getFieldDecorator('endPrice', {
                                                rules: [{ required: true, message: '请输入维修费用!' }],
                                                initialValue: order.endPrice==0?order.startPrice:order.endPrice
                                            })(
                                                <InputNumber prefix={<Icon type="pay-circle-o" style={{ fontSize: 13 }} />}  style={{marginTop:-10, width:200}} placeholder="维修费用" />
                                            )
                                            : order.endPrice==0?order.startPrice:order.endPrice
                                        }
                                        </FormItem>
                                        <FormItem
                                        style={{margin:0}}
                                        // {...formItemLayout}
                                        // label="售后保障"
                                        >
                                            {flag?
                                                getFieldDecorator('endResource', {
                                                rules: [{ required: true, message: '请选择售后保障：!' }],
                                                initialValue: order.endResource
                                            })(
                                                <Select placeholder="formItemLayout"  style={{marginTop:-10, width:200}}>
                                                    <Option value="当面验收，离店不保">当面验收，离店不保</Option>
                                                    <Option value="7天">7天</Option>
                                                    <Option value="一个月">一个月</Option>
                                                    <Option value="三个月">三个月</Option>
                                                    <Option value="六个月">六个月</Option>
                                                    <Option value="一年">一年</Option>
                                                </Select>
                                            )
                                            : order.endResource
                                        }
                                        </FormItem>
                                        <FormItem
                                        style={{margin:0}}
                                        // {...formItemLayout}
                                        // label="送修时间"
                                        >
                                            {moment(order.startTime).calendar()}
                                        </FormItem>
                                        <FormItem
                                        style={{margin:0}}
                                        // {...formItemLayout}
                                        // label="承诺时间："
                                        >
                                            {
                                                moment(order.endTime) > moment() ? moment(order.endTime).fromNow() : "已超时"
                                            }
                                        </FormItem>
                                        <FormItem>
                                            {
                                                !flag?
                                                <Button type="primary" onClick={this.edit} style={{width: '100%',marginTop:30,marginLeft:-50}}>
                                                    编辑
                                                </Button>
                                                :
                                                <div style={{marginTop:30,paddingLeft:40,marginLeft:-110}}>
                                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '40%'}}>
                                                        保存
                                                    </Button>
                                                    <Button type="primary" onClick={this.ok} style={{width: '40%'}}>
                                                        取消
                                                    </Button>
                                                </div>
                                            }
                                        </FormItem>
                                    </Form>
        );
    }
}

const EditForm = Form.create()(NormalLoginForm);

export default EditForm;