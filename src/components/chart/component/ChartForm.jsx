import {Form, Icon, Input, Button, Select, DatePicker} from 'antd'
import {CCFetch} from '../../../ccutil/ccfetch'
import React from 'react';
import moment from 'moment'
import 'moment/locale/zh-cn';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

class ChartForm extends React.Component{

    handleSubmit =(e)=> {
        e.preventDefault();
        var that = this;
        this.props.form.validateFields((err, values) => {
            if(!err){
                CCFetch('/books/searchChart',values).then((res) => {
                    that.props.changeDate(res.data, res.count)
                })
                CCFetch('/books/bfb',values).then(res => {
                    that.props.setBFB(res.data)
                })
                CCFetch('/books/bfbout',values).then(res => {
                    this.props.setBFBOUT(res.data,res.count)
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
            <div style={{width:"100%",background:" #021f1b0d",padding: "20px 30px",margin: "20px 0",overflow:"hidden"}}>
            <Form onSubmit={this.handleSubmit} layout="inline">
                <FormItem>
                    {getFieldDecorator('startTime')
                        (<RangePicker placeholder={["开始日期", "结束日期"]} style={{width:400}} />)
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
            </div>
        )
    }
}

export default Form.create()(ChartForm)