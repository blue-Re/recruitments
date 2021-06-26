import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { WhiteSpace, WingBlank, Card } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

const Header = Card.Header
const Body = Card.Body

// 显示指定用户列表的UI组件
class UserList extends Component {
  static propTypes = {
    userList: PropsTypes.array.isRequired
  }
  render() {
    const { userList } = this.props
    return (
      <WingBlank style={{ marginBottom: 50, marginTop: 50 }}>
        <QueueAnim type="left">
          {
            userList.map((user) => {
              return (
                <div key={user._id}>
                  <WhiteSpace />
                  <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                    <Header
                      thumb={require(`../../assets/images/${user.header}.png`).default}
                      extra={user.username}
                    />
                    <Body>
                      <div>职位: {user.post}</div>
                      {user.company ? <div>公司: {user.company}</div> : null}
                      {user.salary ? <div>月薪: {user.salary}</div> : null}
                      <div>描述: {user.info}</div>
                    </Body>
                  </Card>
                </div>
              )
            })
          }
        </QueueAnim>

      </WingBlank>
    )
  }
}
export default withRouter(UserList)