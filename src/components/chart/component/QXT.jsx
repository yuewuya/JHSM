import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {Col} from 'antd'
import {CCFetch} from '../../../ccutil/ccfetch'
import ChartForm from './ChartForm'
import BinTu from './BinTu'
import BinTuOUT from './BinTuOUT'

export default class QXT extends Component {
    constructor(props){
        super(props);
        this.state={
            amountData:[],
            count:0,
            bfbData:[],
            bfbOUT:[],
            outCount:0
        }
    }
    componentDidMount(){
        this.start()
    }

    start =()=>{
        let param = {id : 1};
        CCFetch('/books/searchChart',param).then(res => {
            this.setState({
                amountData : res.data,
                count : res.count
            })
        })
        CCFetch('/books/bfb',param).then(res => {
            this.setState({
                bfbData : res.data
            })
        })
        CCFetch('/books/bfbout',param).then(res => {
            this.setState({
                bfbOUT : res.data,
                outCount : res.count
            })
        })
    }

    changeDate=(a,b)=>{
        this.setState({
            amountData : a,
            count: b,
        })
    }

    setBFB=(a)=>{
        this.setState({
            bfbData : a
        })
    }

    setBFBOUT=(a,b)=>{
        this.setState({
            bfbOUT: a,
            outCount : b
        })
    }
    render(){
        return (
            <div>
                <ChartForm changeDate={this.changeDate} setBFB={this.setBFB} setBFBOUT={this.setBFBOUT}/>

                <div>
                    <Col className="gutter-row" md={12} style={{textAlign:"center"}}>
                        <BinTu data={this.state.bfbData}/>
                        总额：￥{this.state.count}
                    </Col>
                    <Col className="gutter-row" md={12} style={{textAlign:"center"}}>
                        <BinTuOUT data={this.state.bfbOUT}/>
                        总额：￥{this.state.outCount}
                    </Col>
                </div>

                <h3 style={{marginLeft:30,marginBottom:10}}>利润图：</h3>
                <h4 style={{marginLeft:50,marginBottom:20}}>该阶段总利润为：￥{this.state.count}</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={this.state.amountData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >

                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="维修" stroke="#8884d8" activeDot={{r: 8}} />
                        <Line type="monotone" dataKey="二手" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="零售" stroke="red" />
                    </LineChart>
                </ResponsiveContainer>
                
            
            </div>
        )
    }
    
}
