/* 包含多个creator 异步action 同步action */

import { reqChatMsgList, reqLogin, reqReadMsg, reqRegister, reqUpdateUser, reqUser, reqUserList } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG, MSG_READ, RECEIVE_MSG, RECEIVE_MSG_LIST, RECEIVE_USER, RECEIVE_USER_LIST, RESET_USER } from './action-types'
import io from 'socket.io-client'

const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })  // 授权成功的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })  // 错误提示信息的action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user }) // 接收用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })  // 重置用户的同步action
export const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList }) // 接收用户列表的同步action
export const receiveMsgList = ({ users, chatMsgs ,userid}) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs,userid } })// 接收消息列表
const receiveMsg = (chatMsg,userid)=>({type:RECEIVE_MSG,data:{chatMsg,userid}}) // 接收一个消息
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}}) //查看过了某条消息

/* 
单例对象
  1.创建对象之前：判断对象是否已经存在，只有不存在时才回去创建
  2.创建对象之后：保存对象
*/
function initI0(dispatch,userid) {
  if (!io.socket) {
    // 连接服务端,得到服务器的连接对象
    io.socket = io('ws://localhost:3000') //2.保存对象

    // 绑定监听，接收服务器发送的消息
    io.socket.on('serve-sendMsg', function (chatMsg) {
      console.log('客户端接收到服务端发的消息', chatMsg);
      // 只有当chatMsg是与当前用户相关的消息，才会去分发同步action保存消息
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg(chatMsg,userid))
      }
    })
  }


}

// 获取消息列表数据
async function getMsgList(dispatch,userid) {
  initI0(dispatch,userid)
  const response = await reqChatMsgList()
  const result = response.data
  if (result.code === 0) {
    const { users, chatMsgs } = result.data
    dispatch(receiveMsgList({ users, chatMsgs ,userid}))
  }
}


// 异步发送消息
export const sendMsg = ({ from, to, content }) => {
  return dispatch => {
    console.log('客户端向服务器发送消息', { from, to, content });

    // 发消息
    io.socket.emit('client-sendMsg', { from, to, content })
  }
}

// 异步读取消息
export const readMsg = (from,to)=>{
  return async dispatch=>{
    const response = await reqReadMsg(from)
    const result = response.data
    console.log(result);
    if (result.code===0) {
      const count = result.data
      dispatch(msgRead({count,from,to}))
    }
  }
}


// 异步注册action
export const register = (user) => {
  const { username, password, password2, type } = user
  if (!username || !password) {
    return errorMsg('用户名或密码不能为空')
  } else if (password !== password2) {
    return errorMsg('2次密码不一致')
  }
  return async dispatch => {
    // 发送异步请求
    const response = await reqRegister(username, password, type)
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch,result.data._id)
      // 成功分发授权成功的同步action
      dispatch(authSuccess(result.data))
    } else {
      // 失败分发错误的提示信息同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 异步登录action
export const login = (user) => {
  const { username, password } = user
  if (!username || !password) {
    return errorMsg('用户名或密码不能为空')
  }

  return async dispatch => {
    // 发送异步请求
    const response = await reqLogin(username, password)
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch,result.data._id)
      // 成功分发授权成功的同步action
      dispatch(authSuccess(result.data))
    } else {
      // 失败分发错误的提示信息同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 更新用户异步action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 0) { // 更新成功: data
      dispatch(receiveUser(result.data))
    } else { // 更新失败: msg
      dispatch(resetUser(result.msg))
    }
  }
}

// 异步获取用户action
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch,result.data._id)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(receiveUser(result.msg))
    }
  }
}

// 异步获取用户列表
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}


