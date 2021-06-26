import React, { Component } from 'react'
import Logo from '../../components/Logo/Logo'

import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'

import { connect } from 'react-redux'
import { register } from '../../redux/actions'
import { Redirect } from 'react-router-dom'

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: ''
  }
  register = () => {
    this.props.register(this.state)
  }
  // 处理输入数据
  handleChange = (name, val) => {
    this.setState({
      [name]: val // 属性名是name的值
    })
  }
  // 跳转到登陆页面
  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const { type } = this.state
    const { msg, redirectTo } = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        <NavBar>信&nbsp;院&nbsp;招&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div className="error-msg">{msg}</div> : ''}
            <WhiteSpace />
            <InputItem placeholder="请输入用户名" onChange={val => { this.handleChange("username", val) }}>用户名：</InputItem>
            <WhiteSpace />
            <InputItem placeholder="请输入密码" type="password" onChange={val => { this.handleChange("password", val) }}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace />
            <InputItem placeholder="确认密码" type="password" onChange={val => { this.handleChange("password2", val) }}>确认密码：</InputItem>
            <WhiteSpace />
            <ListItem>
              <span>用户类型：</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace />
            <Button onClick={this.toLogin}>登&nbsp;&nbsp;&nbsp;陆</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Register)
