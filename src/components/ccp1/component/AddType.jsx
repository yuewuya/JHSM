/**
 * CC
 */
import React, { Component } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import {Redirect } from 'react-router-dom';
import {CCFetch} from '../../../ccutil/ccfetch'
const FormItem = Form.Item;
const Option = Select.Option;


class NormalLoginForm extends Component {
    constructor(props){
        super(props);
        this.state={
            pp : [],
            ppOption : [],
            zl : [],
            zlOption : []
        }
    }

    componentDidMount(){
        this.start()
    }

    start =()=>{
        CCFetch("/allType/allPP").then(res =>{
            let a = this.setOptionPP(res.data);
            this.setState({
                pp : res.data,
                ppOption : a
            })
        })
        CCFetch("/allType/allZL").then(res =>{
            let a = this.setOptionPP(res.data);
            this.setState({
                zl : res.data,
                zlOption : a
            })
        })
    }

    setOptionPP=(a)=>{
        let b = [];
        for(let i in a){
            b.push(
                <Option value={a[i]}>{a[i]}</Option>
            )
        }
        return b;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let url = "/allType/add";
                CCFetch(url,values).then((res) => {
                    if(res.code == 1){
                        message.success("添加成功");
                        this.start();
                        this.props.form.resetFields();
                        this.props.refresh()
                    }else{
                        message.error("添加失败，请重试或联系CC")
                    }
                })

            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} layout="inline" style={{width:700}} >
            <div style={{height:50,marginTop:50}} >
                <FormItem>
                    {getFieldDecorator('pp', {
                        rules: [{ required: true, message: '请输入品牌!' }],
                    })(
                        <Select mode="combobox" placeholder="请输入品牌" style={{width:200}} >
                            {this.state.ppOption}
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('zl', {
                        rules: [{ required: true, message: '请输入种类!' }],
                    })(
                        <Select mode="combobox" placeholder="请输入种类" style={{width:200}} >
                            {this.state.zlOption}
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('xh', {
                        rules: [{ required: true, message: '请输入型号!' }],
                    })(
                        <Input placeholder="请输入型号"  style={{width:200}}/>
                    )}
                </FormItem>
                </div>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: 630}}>
                        添加
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const AddType = Form.create()(NormalLoginForm);

export default AddType;