import {Form, Icon, Input, Button, Select, DatePicker} from 'antd'
import {CCFetch} from '../../../ccutil/ccfetch'
import React from 'react';
import moment from 'moment'
import 'moment/locale/zh-cn';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

class SearchForm extends React.Component{

    handleSubmit =(e)=> {
        e.preventDefault();
        var that = this;
        this.props.form.validateFields((err, values) => {
            if(!err){
                CCFetch('/orders/list',values).then((res) => {
                    that.props.setData(res,values)
                })
            }
        })
    }

    handleReset = () => {
        this.props.form.resetFields();
      }

    render(){
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} layout="inline">
                <FormItem>
                    {getFieldDecorator('searchKey')
                        (<Input placeholder="用户名/手机号" style={{width:200}} />)
                    }
                </FormItem>
                <FormItem>
                    {getFieldDecorator('assigner')
                        (<Select style={{width:200}} placeholder="责任人">
                            {this.props.data}
                        </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    {getFieldDecorator('state')
                        (<Select style={{width:200}} placeholder="状态">
                            <Option value="-1">待审核</Option>
                            <Option value="0">未完成</Option>
                            <Option value="2">已完成</Option>
                        </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    {getFieldDecorator('type')
                        (<Select style={{width:200}} placeholder="订单类型">
                            <Option value="普通订单">普通订单</Option>
                            <Option value="简易订单">简易订单</Option>
                            <Option value="贴膜活动">贴膜活动</Option>
                        </Select>
                        )
                    }
                </FormItem>
                <div style={{float:"right", marginTop:2.5}}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        搜索
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                        重置
                    </Button>
                </div>
            </Form>
        )
    }
}

export default Form.create()(SearchForm)