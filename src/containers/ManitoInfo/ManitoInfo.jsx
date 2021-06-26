import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'
import HeaderSelector from '../../components/HeaderSelector/HeaderSelector'
import {Redirect} from 'react-router-dom'
import {updateUser} from '../../redux/actions'
class ManitoInfo extends Component {

  state = {
    header: '',
    post: '',
    info: '',
  }

  // 更新header状态
  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }
  render() {
    // 若信息完善，自动定义到组件页面
    const {header,type} = this.props.user
    if(header){ // 说明信息完善
      const path = type==='dashen'?'/dashen':'/laoban'
      return <Redirect to={path}/>
    }
    return (
      <div>
        <NavBar>Manito信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem placeholder='请输入求职岗位' onChange={val => { this.handleChange('post', val) }}>求职岗位:</InputItem>
        <TextareaItem title="个人介绍:"
          placeholder='请输入个人介绍'
          rows={3} onChange={val => { this.handleChange('info', val) }} />
        <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {updateUser}
)(ManitoInfo)