import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class BinTu extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        let data = this.props.data;
        for(let i in data){
            data
        }
        const option = {
            title: {
                text: '收入占比图',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#777'
                }
            },
        
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
        
            visualMap: {
                show: false,
                min: 10,
                max: 10000,
                inRange: {
                    colorLightness: [0.3, 0.9]
                }
            },
            series : [
                {
                    name:'收入',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:this.props.data.sort(function (a, b) { return a.value - b.value}),
                    roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#777'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#777'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: '#777'
                        }
                    },
        
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        
        return (
        <ReactEcharts
                option={option}
                style={{height: '300px', width: '100%'}}
                className={'react_for_echarts'}
            />
        );
    }
}