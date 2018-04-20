/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, InputNumber, Select, Divider  } from 'antd';
import moment from 'moment'
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
                title="创建新收藏"
                okText="创建"
                onCancel={onCancel}
                onOk={onCreate}
                width={400}
            >
                <Form layout="vertical">
                    <FormItem {...formItemLayout} label="承诺时间">
                        {getFieldDecorator('endTime', {
                            rules: [{ required: true, message: '请选择承诺时间!' }],
                            initialValue: moment(row.endTime)
                        })(
                            <DatePicker 
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{marginTop:-10, width:200}}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="实收金额">
                        {getFieldDecorator('endPrice', {
                            rules: [{ required: true, message: '请输入实收金额!' }],
                            initialValue: row.endPrice!=0?row.endPrice:row.startPrice
                        })(
                            <InputNumber style={{marginTop:-10, width:200}}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="售后保障">
                        {getFieldDecorator('endResource', {
                            rules: [{ required: true, message: '请选择售后保障!' }],
                            initialValue: row.endResource
                        })(
                            <Select style={{marginTop:-10, width:200}}>
                                <Option value="当面验收，离店不保">当面验收，离店不保</Option>
                                <Option value="7天">7天</Option>
                                <Option value="一个月">一个月</Option>
                                <Option value="三个月">三个月</Option>
                                <Option value="六个月">六个月</Option>
                                <Option value="一年">一年</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="责任人">
                        {getFieldDecorator('repair', {
                            rules: [{ required: true, message: '请选择责任人!' }],
                            initialValue: row.repair
                        })(
                            <Select style={{marginTop:-10, width:200}}>
                                {assigner}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

class EditOrderForm extends Component {
    state = {
        visible: false,
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

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    render() {
        return (
            <div>
                <a onClick={this.showModal}>编辑</a>
                <Divider type="vertical" />
                {/* {this.props.row.state == 2 ? (<Divider type="vertical" /> : ''} */}
                {this.props.row.state == 2 ? (<a onClick={this.showModal}>完成</a>) : ''}
                {this.props.row.state == 2 ? (<Divider type="vertical" />) : ''}
                <a onClick={this.showModal}>删除</a>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    assigner={this.props.assigner}
                    row = {this.props.row}
                />
            </div>
        );
    }
}

export default EditOrderForm;