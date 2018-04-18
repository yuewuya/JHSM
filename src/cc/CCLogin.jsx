import React, { Component } from 'react';
import LoginForm from '../components/forms/LoginForm'

export default class CCLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg:'卢本伟牛逼'
        }
    }
    render(){
        return(
            <div>
                <img src="http://47.104.184.151/img/login.jpeg" style={{width:1910,height:940}}/>
                <div style={{position:"absolute",top: 190,left: 950,}}>
                 <LoginForm/>
                </div>
                
            </div>
        )
    }
}