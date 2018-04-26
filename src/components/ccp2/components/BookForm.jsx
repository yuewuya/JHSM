import {Form, Icon, Input, Button, Select, DatePicker} from 'antd'
import {CCFetch} from '../../../ccutil/ccfetch'
import React from 'react';
import moment from 'moment'
import 'moment/locale/zh-cn';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

class BookForm extends React.Component{

    handleSubmit =(e)=> {
        e.preventDefault();
        var that = this;
        this.props.form.validateFields((err, values) => {
            if(!err){
                values.type = this.props.type;
                CCFetch('/books/orderList',values).then((res) => {
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
                    {getFieldDecorator('startTime')
                        (<RangePicker placeholder={["签约开始日期", "签约结束日期"]} style={{width:200}} />)
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

export default Form.create()(BookForm)