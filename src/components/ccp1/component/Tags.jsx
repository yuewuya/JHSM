import React,{Component} from 'react'
import {Tag, Icon, Input, message} from 'antd'
import {CCFetch} from '../../../ccutil/ccfetch'

export default class Tags extends Component{
    constructor(props){
        super(props);
        this.state={
            inputVisible: false,
            inputValue: '',
            tags : this.props.text.split(";")
        }
    }

    deleteType=(text)=>{
        let a = this.state.tags.filter(tag => tag != text);
        let param = this.props.row;
        param.xh = a.join(";")
        CCFetch("/allType/delete",param).then(res =>{
            if(res.code == 1){
                message.success("删除成功")
            }else{
                message.error("删除失败，请重试或联系CC")
            }
        });
        this.setState({tags : a})
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        if(inputValue && inputValue != ''){
            let param = this.props.row;
            param.xh = tags.join(";")
            CCFetch("/allType/save",param).then(res =>{
                if(res.code == 1){
                    message.success("添加成功")
                }else{
                    message.error("添加失败，请重试或联系CC")
                }
            })
        }
        
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      }

    saveInputRef = input => this.input = input

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      }

    render(){
        const { tags, inputVisible, inputValue } = this.state;
        let a = [];
        for(let i in tags){
            a.push(<Tag color="blue" style={{marginBottom:5}} closable afterClose={()=>this.deleteType(tags[i])}>{tags[i]}</Tag>)
        }
        a.push( 
            (inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )),

              (!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus" /> 新增
                </Tag>
              ))
            )
        
        
        return (
            <div>
                {a}
            </div>
        )
    }
}