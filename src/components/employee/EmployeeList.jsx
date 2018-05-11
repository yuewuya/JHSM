import React,{Component} from 'react'
import {Card, Icon, Col, message, Popconfirm,Button} from 'antd'
import Ability from './component/Ability'
import EditForm from './component/EditForm'
import {CCFetch} from '../../ccutil/ccfetch'
import AddForm from './component/AddForm'

export default class EmployeeList extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        this.loadAllAdmin()
    }

    loadAllAdmin =()=>{
        CCFetch("/admin/list").then(res =>{
            let child = [];
            for(let i in res.data){
                child.push(
                    <Col md={11} style={{marginRight:20,marginBottom:20}} id={res.data[i].id}>
                        <Card bordered={true}>
                            <div>
                                <Popconfirm title="确定删除该员工？" okText="确定" cancelText="取消" onConfirm={()=>this.deleteEMP(res.data[i].id)}>
                                    <Icon type="close" style={{fontSize: 15, float:"right"}}/>
                                </Popconfirm>
                            </div>
                            <Col lg={12} md={24}>
                                <EditForm user={res.data[i]} refresh={this.loadAllAdmin}/>
                            </Col>
                            <Col lg={12} md={24}>
                                <Ability user={res.data[i]} />
                            </Col>
                        </Card>
                    </Col>
                )
            }
            this.setState({
                data:child
            })
        })
    }

    addEMP=()=>{
        this.setState({
            data:[]
        });
        this.loadAllAdmin();
    }

    deleteEMP =(id)=>{
        
        let param = {};
        param.id = id;
        CCFetch("/admin/delete",param).then(res =>{
            if(res.code == 1){
                message.success("成功删除该员工");
                document.getElementById(id).style.display="none";
            }else{
                message.error("删除失败，请重试或者联系cc")
            }
        })
    }


    render(){
        return (
            <div style={{marginTop:20}} className="gutter-example button-demo">
                <div style={{overflow:'hidden'}}>
                    <AddForm refresh={this.addEMP}/>
                    <Button onClick={this.addEMP} style={{float:'left',marginLeft:10}}>刷新</Button>
                </div>
                <br/>  
                <div>
                    {this.state.data}
                </div>
                
            </div>
        )
    }
}