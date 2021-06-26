import React, { Component } from 'react'
import Logo from '../../components/Logo/Logo'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'

import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import { Redirect } from 'react-router'


class Login extends Component {
  state = {
    username: '',
    password: '',
  }
  login = () => {
    this.props.login(this.state)
  }
  // 处理输入数据
  handleChange = (name, val) => {
    this.setState({
      [name]: val // 属性名是name的值
    })
  }
  // 跳转到登陆页面
  toRegister = () => {
    this.props.history.replace('/register')
  }



  render() {
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
            <Button type="primary" onClick={this.toRegister}>注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace />
            <Button onClick={this.login}>登&nbsp;&nbsp;&nbsp;陆</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login)