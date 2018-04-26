import React,{Component} from 'react'
import QXT from './component/QXT'
import {Card} from 'antd'
import {CCFetch} from '../../ccutil/ccfetch'

export default class AmountQXT extends Component{
    constructor(props){
        super(props);
        this.state={
            amountData:[]
        }
    }
    
    

    render(){
        return (
            <Card bordered={false} className={'no-padding'}>
                <QXT />
            </Card>
        )
    }
}