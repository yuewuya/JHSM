/**
 * CC
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import {Redirect } from 'react-router-dom';
import {CCFetch} from '../../ccutil/ccfetch'
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    constructor(props){
        super(props);
        this.state={
            go : false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let url = "/admin/login";
                CCFetch(url,values).then((res) => {
                    if(res.code == 0){
                        message.error(res.msg)
                    }else if(res.code == 1){
                        localStorage.setItem("admin",JSON.stringify(res.data));
                        this.go();
                    }
                })

            }
        });
    }

    go =()=>{
        this.setState({
            go : true
        })
    }

    render() {
        if(this.state.go){
            return <Redirect push to="/" />
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                <FormItem>
                    {getFieldDecorator('id', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('pwd', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Checkbox>记住我</Checkbox>
                    <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                        登录
                    </Button>
                    或 <a href="">现在就去注册!</a>
                </FormItem>
            </Form>
        );
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;