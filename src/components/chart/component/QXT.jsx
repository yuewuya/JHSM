import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {CCFetch} from '../../../ccutil/ccfetch'

// const data = [
//     {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//     {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//     {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
//     {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//     {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
//     {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//     {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
// ];

export default class QXT extends Component {
    constructor(props){
        super(props);
        this.state={
            amountData:[]
        }
    }
    componentDidMount(){
        this.start()
    }

    start =()=>{
        CCFetch('/books/7day').then(res => {
            this.setState({
                amountData : res.data
            })
        })
    }
    render(){
        return (
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
                </LineChart>
            </ResponsiveContainer>
        )
    }
    
}
