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
        const { visible, onCancel, onCreate, form, assigner, row } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="修改账本"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
                width={400}
            >
            <div style={{marginLeft:30}}>
                <Form layout="vertical" hideRequiredMark={true}>

                    <FormItem {...formItemLayout} label="账本名称">
                        {getFieldDecorator('bookname', {
                            rules: [{ required: true, message: '请输入账本名称!' }],
                            initialValue: row.bookname
                        })(
                            <Input style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="成本">
                        {getFieldDecorator('cost', {
                            rules: [{ required: true, message: '请输入成本!' }],
                            initialValue: row.cost
                        })(
                            <InputNumber style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="收款">
                        {getFieldDecorator('inmoney', {
                            rules: [{ required: true, message: '请输入收款!' }],
                            initialValue: row.inmoney
                        })(
                            <InputNumber style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="备注">
                        {getFieldDecorator('remark', {
                            initialValue: row.remark?row.remark:''
                        })(
                            <Input style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    
                </Form>
            </div>
            </Modal>
        );
    }
);

class EditBookForm extends Component {
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

            let param = this.props.row;
            param.bookname = values.bookname;
            param.cost = values.cost;
            param.inmoney = values.inmoney;
            param.remark = values.remark;
            param.amount = values.inmoney - values.cost;
            CCFetch("/books/edit", param).then((res) => {
                if(res.code == 1){
                    this.props.reloadTable(1);
                    message.success("修改成功")
                }else{
                    message.error("修改失败，请重试或联系CC")
                }
            })


            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };

    
    deleteOrder =()=>{
        let param = {};
        param.id = this.props.row.id;
        CCFetch("/books/delete", param).then((res) => {
            if(res.code == 1){
                this.props.reloadTable(1);
                message.success("成功删除")
            }else{
                message.error("删除失败，请重试或联系CC")
            }
        })
    }
    render() {
        return (
            <div>
                <a onClick={this.showModal}>编辑</a>

                <Divider type="vertical" />
                <Popconfirm title="确定删除？" okText="删除" cancelText="取消" onConfirm={this.deleteOrder}>
                    <a>删除</a>
                </Popconfirm>
                
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

export default EditBookForm;