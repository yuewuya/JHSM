/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card, Pagination } from 'antd';
import { getPros } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {CCFetch} from '../../ccutil/ccfetch'
import SearchForm from '../forms/SearchForm'

const columns = [
    {
        title: '订单号',
        dataIndex: 'id'
        
    }, 
    {
        title: '姓名',
        dataIndex: 'userName'
    }, 
    {
        title: '手机号码',
        dataIndex: 'cellphone'
    },
    {
        title: '设备',
        dataIndex: 'type'
    },
    {
        title: '故障',
        dataIndex: 'startResource'
    },
    {
        title: '责任人',
        dataIndex: 'repair'
    },
    {
        title: '状态',
        dataIndex: 'state',
        render: (text,row) => {console.log("-----row",row); return text == 0 ? "未完成" : "已完成"}
    }
];

class AsynchronousTable extends React.Component {
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
        loading: false,
        data: [],
        param : {},
        totalCount : 0
    };
    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        let param = {};
        param.pageNum = 0;
        CCFetch("/orders/list",param).then((res) => {
            this.setData(res,param)
        })
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    pageChange =(pageNumber)=> {
        let param = this.state.param;
        param.pageNum = pageNumber-1;
        CCFetch("/orders/list", param).then((res) => {
            this.setData(res,param)
        })
    }

    setData =(data,param)=> {
        this.setState({
            data : data.data,
            param : param,
            loading : false,
            totalCount : data.count
        })
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="表格" second="异步表格" />
                <SearchForm setData={this.setData}/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="异步表格--GitHub今日热门javascript项目" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table 
                                    rowSelection={rowSelection} 
                                    columns={columns} 
                                    dataSource={this.state.data} 
                                    pagination={false}
                                    expandedRowRender={record => <p>这是{record.userName}的{record.type},责任人是{record.repair}</p>}
                                />
                                <Pagination showQuickJumper total={this.state.totalCount} onChange={this.pageChange} style={{marginTop:20,float:"right"}} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AsynchronousTable;