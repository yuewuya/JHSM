/**
 * CC
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Select, Modal} from 'antd';
import {CCFetch} from '../../../ccutil/ccfetch'
const FormItem = Form.Item;
const Option = Select.Option;

class NormalLoginForm extends Component {
    constructor(props){
        super(props);
        this.state={
            visible : false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let url = "/admin/add";
                CCFetch(url,values).then((res) => {
                    if(res.code == 0){
                        message.error(res.msg)
                    }else if(res.code == 1){
                        message.success("成功添加员工");
                        this.props.refresh();
                        this.setState({
                            visible : false
                        })
                    }
                })

            }
        });
    }

    add =()=>{
        this.setState({
            visible : true
        })
    }

    close =()=>{
        this.setState({
            visible : false
        })
    }


    render() {
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
            <div style={{float:'left'}}>
            <Button type="primary" onClick={this.add}>添加员工</Button>
            <Modal
                visible={this.state.visible}
                footer={null}
                onCancel={this.close}
            >
         <div style={{marginTop:20, marginLeft:60}}>
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}} hideRequiredMark={true}>
                <FormItem
                {...formItemLayout}
                label="员工姓名："
                >
                    {
                        getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入员工姓名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="员工姓名" />
                    )
                }
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="员工角色："
                >
                    {
                        getFieldDecorator('role', {
                        initialValue: 0
                    })(
                        <Select placeholder="职位">
                            <Option value={0}><Icon type="star-o" style={{ fontSize: 13 }} /> 实习生</Option>
                            <Option value={10}><Icon type="tool" style={{ fontSize: 13 }} /> 普通员工</Option>
                            <Option value={99}><Icon type="coffee" style={{ fontSize: 13 }} /> 店长</Option>
                        </Select>
                    )
                }
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="联系电话："
                >
                    {
                        getFieldDecorator('id', {
                        rules: [{ required: true, message: '请输入联系号码!' }],
                    })(
                        <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="电话号码" />
                    )
                }
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="登录密码："
                >
                    {
                        getFieldDecorator('pwd', {
                        rules: [{ required: true, message: '请输入密码!' }],
                        initialValue: 8888
                    })(
                        <Input prefix={<Icon type="question" style={{ fontSize: 13 }} />} placeholder="登录密码" />
                    )
                }
                </FormItem>
                <FormItem>
                    
                    <div style={{marginTop:30,paddingLeft:80}}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '40%'}}>
                            保存
                        </Button>
                        <Button type="primary" onClick={this.close} style={{width: '40%'}}>
                            取消
                        </Button>
                    </div>
                </FormItem>
            </Form>
         </div>
         </Modal> 
         </div>
        );
    }
}

const AddForm = Form.create()(NormalLoginForm);

export default AddForm;