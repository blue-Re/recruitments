/*对话聊天的路由组件
*/
import React, { Component } from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, readMsg } from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'


const Item = List.Item

class Chat extends Component {

  state = {
    content: '',
    isShow: false // 默认是否显示表情列表
  }

  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)

  }
  componentDidUpdate() {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillUnmount() {
    // 发请求更新未读消息数量
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }

  componentWillMount() {
    // 初始化表情列表数据
    const emojis = [
      '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀'
      , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
      , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
      , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
    ]

    this.emojis = emojis.map(emoji => ({ text: emoji }))
  }

  handleSend = () => {
    // 收集数据
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    // 发送请求(发消息)
    if (content) {
      this.props.sendMsg({ from, to, content })
    }
    // 清除输入数据
    this.setState({
      content: '',
      isShow: false
    })
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({ isShow })
    if (isShow) {
      // 异步手动派发resize事件，解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  render() {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    // 计算当前聊天的chatId
    const meId = user._id
    if (!users[meId]) { // 如果还没有获取到数据那就不做任何显示
      return null
    }
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')

    //对 chatMsgs进行过滤
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

    // 得到目标用户的头像
    const targetHeader = users[targetId].header
    const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`).default : null


    return (
      <div id='chat-page'>
        <NavBar className="sticky-header"
          onLeftClick={() => this.props.history.goBack()}
          icon={<Icon type="left" />
          }>{users[targetId].username}</NavBar>
        <List style={{ marginTop: 50, marginBottom: 50 }}>
          <QueueAnim type="top">
            {
              msgs.map(msg => {
                if (targetId === msg.from) {// 对方发给我的
                  return (
                    <Item
                      key={msg._id}
                      thumb={targetIcon}
                    >
                      {msg.content}
                    </Item>
                  )
                } else { // 我发给对方的
                  return (
                    <Item
                      key={msg._id}
                      className='chat-me'
                      extra='我'
                    >
                      {msg.content}
                    </Item>
                  )
                }
              })
            }
          </QueueAnim>
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            onFocus={() => this.setState({ isShow: false })}
            value={this.state.content}
            onChange={val => this.setState({ content: val })}
            extra={
              <span>
                <span onClick={this.toggleShow} style={{ marginRight: 5 }}>😀</span>
                <span onClick={this.handleSend}>发送</span>
              </span>
            }
          />
          {
            this.state.isShow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item) => {
                  this.setState({ content: this.state.content + item.text })
                }}
              />
            ) : null
          }

        </div>
      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user, chat: state.chat }),
  { sendMsg, readMsg }
)(Chat)