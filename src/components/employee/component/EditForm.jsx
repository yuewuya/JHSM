/**
 * CC
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message, Select } from 'antd';
import {Redirect } from 'react-router-dom';
import {CCFetch} from '../../../ccutil/ccfetch'
const FormItem = Form.Item;
const Option = Select.Option;

class NormalLoginForm extends Component {
    constructor(props){
        super(props);
        this.state={
            flag : false,
            user:props.user
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let url = "/admin/edit";
                values.kq = this.props.user.kq;
                values.js = this.props.user.js;
                values.yw = this.props.user.yw;
                CCFetch(url,values).then((res) => {
                    if(res.code == 0){
                        message.error("修改失败，请重试或联系CC")
                    }else if(res.code == 1){
                        message.success(res.msg);
                        this.setState({
                            user : values,
                            flag : false
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
        const flag = this.state.flag;
        const user = this.state.user;
        let role = '';
        switch (user.role) {
            case 0:
                role = '实习生';
                break;
            case 10:
                role = '普通员工';
                break;
            case 99:
                role = '店长';
                break;
        }
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 16 },
            },
        };
        return (
            <div style={{height:285}}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}} hideRequiredMark={true}>
                    <FormItem
                    style={{margin:0}}
                    {...formItemLayout}
                    label="员工姓名："
                    >
                        {flag?
                            getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入员工姓名!' }],
                            initialValue: user.name
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="员工姓名" />
                        )
                        : user.name
                    }
                    </FormItem>
                    <FormItem
                    style={{margin:0}}
                    {...formItemLayout}
                    label="员工角色："
                    >
                        {flag?
                            getFieldDecorator('role', {
                            initialValue: user.role
                        })(
                            <Select placeholder="职位">
                                <Option value={0}><Icon type="star-o" style={{ fontSize: 13 }} /> 实习生</Option>
                                <Option value={10}><Icon type="tool" style={{ fontSize: 13 }} /> 普通员工</Option>
                                <Option value={99}><Icon type="coffee" style={{ fontSize: 13 }} /> 店长</Option>
                            </Select>
                        )
                        :  role
                    }
                    </FormItem>
                    <FormItem
                    style={{margin:0}}
                    {...formItemLayout}
                    label="联系电话："
                    >
                        {flag?
                            getFieldDecorator('id', {
                            rules: [{ required: true, message: '请输入联系号码!' }],
                            initialValue: user.id
                        })(
                            <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} readOnly placeholder="电话号码" />
                        )
                        : user.id
                    }
                    </FormItem>
                    <FormItem
                    style={{margin:0}}
                    {...formItemLayout}
                    label="登录密码："
                    >
                        {flag?
                            getFieldDecorator('pwd', {
                            rules: [{ required: true, message: '请输入密码!' }],
                            initialValue: user.pwd
                        })(
                            <Input prefix={<Icon type="question" style={{ fontSize: 13 }} />} placeholder="登录密码" />
                        )
                        : user.pwd
                    }
                    </FormItem>
                    <FormItem
                    style={{margin:0}}
                    {...formItemLayout}
                    label="完成项目："
                    >
                        {flag?
                            getFieldDecorator('num', {
                            rules: [{ required: true, message: '请输入数量!' }],
                            initialValue: user.num
                        })(
                            <Input prefix={<Icon type="database" style={{ fontSize: 13 }} />} placeholder="业绩" />
                        )
                        : user.num
                    }
                    </FormItem>
                    <FormItem>
                        {
                            !flag?
                            <Button type="primary" onClick={this.edit} style={{width: '100%',marginTop:30}}>
                                编辑
                            </Button>
                            :
                            <div style={{marginTop:30,paddingLeft:40}}>
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
            </div>
        );
    }
}

const EditForm = Form.create()(NormalLoginForm);

export default EditForm;