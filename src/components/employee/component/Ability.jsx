/**
 * Created by hao.cheng on 2017/4/22.
 */
import React from 'react';
import {Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';

let data = [
    { subject: '考勤'},
    { subject: '技术'},
    { subject: '业务'},
    { subject: '沟通', A: 99, fullMark: 150 },
    { subject: '专业', A: 85, fullMark: 150 },
    // { subject: '兴趣', A: 65, fullMark: 150 },
];

export default class Ability extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        const user = this.props.user;
        data[0].A=user.kq;
        data[1].A=user.js;
        data[2].A=user.yw;
        return (
            <div style={{marginLeft:50}}>
                <ResponsiveContainer width="80%" height={250}>
                    <RadarChart outerRadius={90} data={data}>
                        <Radar name={user.name} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <PolarGrid />
                        <Legend />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        )
    }
}