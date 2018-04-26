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

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, row } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="新增账本"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
                width={400}
            >
            <div style={{marginLeft:30}}>
                <Form layout="vertical" hideRequiredMark={true}>
                    <FormItem {...formItemLayout} label="账本类型">
                        {getFieldDecorator('booktype', {
                            rules: [{ required: true, message: '请选择账本类型!' }]
                        })
                            (<Select placeholder="账本类型" style={{width:200}}>
                                <Option value='维修'>维修</Option>
                                <Option value='二手回收'>二手回收</Option>
                                <Option value='二手出售'>二手出售</Option>
                                <Option value='零售'>零售</Option>
                                <Option value='支出'>支出</Option>
                                <Option value='进货'>进货</Option>
                            </Select>
                            )
                        }
                    </FormItem>

                    <FormItem {...formItemLayout} label="账本名称">
                        {getFieldDecorator('bookname', {
                            rules: [{ required: true, message: '请输入账本名称!' }]
                        })(
                            <Input style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="成本">
                        {getFieldDecorator('cost')(
                            <InputNumber style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="收款">
                        {getFieldDecorator('inmoney')(
                            <InputNumber style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="备注">
                        {getFieldDecorator('remark')(
                            <Input style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    
                </Form>
            </div>
            </Modal>
        );
    }
);

class AddBookForm extends Component {
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
            values.amount = (values.inmoney?values.inmoney:0) - (values.cost?values.cost:0);
            values.searchKey = 0;
            CCFetch("/books/add", values).then((res) => {
                if(res.code == 1){
                    this.props.reloadTable(1);
                    message.success("添加成功")
                }else{
                    message.error("添加失败，请重试或联系CC")
                }
            })

            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };


    render() {
        return (
            <div style={{marginBottom:20}}>
                <Button type="primary" onClick={this.showModal}>新增</Button>
                
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    row = {this.props.row}
                />
                
            </div>
        );
    }
}

export default AddBookForm;