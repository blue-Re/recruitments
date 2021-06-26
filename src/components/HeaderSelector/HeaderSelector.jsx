import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropsTypes from 'prop-types'


export default class HeaderSelector extends Component {
  state = {
    icon: null // 图片对象
  }
  constructor(props) {
    super(props)
    // 准备要显示的头像列表数据
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: '头像' + (i + 1),
        icon: require(`../../assets/images/头像${i+1}.png`).default //不能使用import
        // icon: header[i]
      })
    }
  }
  static propTypes = {
    setHeader: PropsTypes.func.isRequired
  }

  handleClick = ({text,icon}) => {
    // 更新当前组件状态
    this.setState({icon})
    // 调用函数更新父组件状态
    this.props.setHeader(text)
  }
  render() {
    const { icon } = this.state
    // 头部界面
    const listHeader = !icon ? '选择头像' : (
      <div>
        已选择头像：<img src={icon} alt=""/>
      </div>
    )

    return (
      <List renderHeader={() => listHeader}>
        <Grid onClick={this.handleClick} data={this.headerList} columnNum={5} />
      </List>
    )
  }
}
