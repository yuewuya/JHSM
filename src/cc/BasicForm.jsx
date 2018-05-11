import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, Modal, message, notification, Tabs} from 'antd';
import {CCFetch} from "../ccutil/ccfetch";
import OldPhoneDJ from './OldPhoneDJ'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

let allType = {}

class UserYDJForm extends Component {
    state = {
        confirmDirty: false,
        firstV : false,
        firstText : '',
        firstContent : null,
        firstTitle : '请选择品牌'
    };

    componentDidMount(){
        this.setFirstContent();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let url = "/orders/addYDJorder";
                CCFetch(url,values).then((res) => {
                    if(res.code == 0){
                        message.error("信息提交失败，请稍后再试！")
                    }else if(res.code == 1){
                        this.submitSuccess(res.msg);
                        this.props.form.resetFields();
                    }
                })
            }
        });
    };

    submitSuccess = (msg) => {
        notification['success']({
            message: '提交成功',
            description: msg,
        });
    };

    clearForm =()=>{
        this.props.form.resetFields();
    }

    firstType =()=>{
        this.setState({
            firstV : true
        })
    }

    setFirstContent =()=>{

        CCFetch("/allType/list").then(res=>{
            allType = res;
            const child = [];
            for(let i in allType){
                child.push(<Button style={{marginBottom:20, marginLeft:10}} onClick={()=>this.setFirstText(i)}>{i}</Button>)
            }
            this.setState({
                firstContent : child
            })
        })
    }
    setFirstText =(text)=>{
        const a =eval('allType["' + text + '"]');
        const child = [];
        for(let i in a){
            child.push(<Button style={{marginBottom:20, marginLeft:10}} onClick={()=>this.setSecondText(i)}>{i}</Button>)
        }
        this.setState({
            firstText : text,
            firstContent : child,
            firstTitle : '请选择设备'
        })
    }

    setSecondText =(text)=>{
        let a = eval('allType["' + this.state.firstText + '"]["' + text + '"]')
        const child = [];
        for(let i in a){
            child.push(<Button onClick={()=>this.setTypeValue(a[i])} style={{marginBottom:20, marginLeft:10}}>{a[i]}</Button>)
        }
        this.setState({
            firstContent : child,
            firstTitle : '请选择型号'
        })
    }

    setTypeValue =(text)=>{
        this.props.form.setFieldsValue({ type : text });
        this.firstCancle()
    }

    firstCancle=()=>{
        this.setState({
            firstText : '',
            firstV:false,
            firstTitle : '请选择品牌'
        })
        this.setFirstContent();
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
        <div className="gutter-example">
            <Row gutter={16}>
                <Col className="gutter-row" xs={24}>
                    <div className="gutter-box">

                        <Tabs>
                            <TabPane tab="维修预登记" key="1">
                                            
                                <Col className="gutter-row" style={{marginTop:60}} xs={{ span: 16, offset: 1 }}>
                                    
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormItem
                                            {...formItemLayout}
                                            label={(
                                                <span>
                                                    姓名
                                                </span>
                                            )}
                                            hasFeedback
                                        >
                                            {getFieldDecorator('userName', {
                                                rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                                            })(
                                                <Input />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="电话号码"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('cellphone', {
                                                rules: [{ required: true, message: '请输入你的电话号码!' }],
                                            })(
                                                <Input />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="型号"
                                            hasFeedback
                                        >
                                            {/* {getFieldDecorator('type', {
                                                rules: [{ required: true, message: '请选择您的设备!' }],
                                            })(
                                                <Input onClick={this.firstType}/>
                                            )} */}
                                            {getFieldDecorator('type')(
                                                <Input onClick={this.firstType}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="故障原因"
                                            hasFeedback
                                        >
                                            {/* {getFieldDecorator('startResource', {
                                                rules: [{ required: true, message: '请输入你设备的故障!' }],
                                            })(
                                                <Input />
                                            )} */}
                                            {getFieldDecorator('startResource')(
                                                <Input />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="设备密码"
                                            hasFeedback
                                        >
                                            {/* {getFieldDecorator('remark', {
                                                rules: [{ required: true, message: '请输入你设备的密码!' }],
                                            })(
                                                <Input />
                                            )} */}
                                            {getFieldDecorator('remark')(
                                                <Input />
                                            )}
                                        </FormItem>
                                        <FormItem >
                                            <Button type="primary" style={{width:"30%", marginLeft:"33%"}} htmlType="submit" size="large">登记</Button>
                                            <Button type="solid" style={{width:"30%"}} size="large" onClick={this.clearForm}>重置</Button>
                                            <Button type="dashed" onClick={this.setFirstContent}  size="large"  style={{width:"62%", marginLeft:"33%", marginTop:20}}>刷新机型</Button>
                                        </FormItem>
                                    </Form>
                            </Col>
                        </TabPane>
                        <TabPane tab="二手机回收" key="2"><OldPhoneDJ/></TabPane>
                    </Tabs>


                        

                            <Modal 
                                title={this.state.firstTitle}
                                visible={this.state.firstV}
                                onCancel={this.firstCancle}
                                footer={null}
                            >
                                <div style={{margin:30}}>
                                    {this.state.firstContent}
                                </div>
                            </Modal>
                    </div>
                </Col>
            </Row>
        </div>
        )
    }
}

const UserYDJ = Form.create()(UserYDJForm);

export default UserYDJ;