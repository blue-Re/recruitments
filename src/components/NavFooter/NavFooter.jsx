import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router' // 让非路由组件具有路由组件的api

const Item = TabBar.Item
class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    // unReadCount: PropTypes.number.isRequired
  }
  render() {
    let { navList } = this.props
    console.log(this.props);
    // 过滤掉hide为true的nav
    navList = navList.filter(nav => !nav.hide)
    const path = this.props.location.pathname // 请求的path
    return (
      <TabBar>
        {
          navList.map((nav) => (
            <Item key={nav.path}
              // badge={nav.path === '/message' ? unReadCount : 0}
              title={nav.text}
              icon={{ uri: require(`./images/${nav.icon}.png`).default }}
              selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`).default }}
              selected={path === nav.path}
              onPress={() => this.props.history.replace(nav.path)} />
          ))
        }
      </TabBar>
    )
  }
}
export default withRouter(NavFooter)