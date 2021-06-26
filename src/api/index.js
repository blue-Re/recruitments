import ajax from "./ajax";

// 登录
export function reqLogin(username,password) {  
  return ajax({
    url:'/login',
    method:'POST',
    data:{
      username,password
    }
  })
}

// 注册
export function reqRegister(username,password,type) {  
  return ajax({
    url:'/register',
    method:'POST',
    data:{
      username,password,type
    }
  })
}

// 更新用户接口
export function reqUpdateUser(user) {  
  return ajax({
    url:'/update',
    method:'POST',
    data:user
  })
}

// 获取用户信息
export function reqUser() {  
  return ajax({
    url:'/user',
    method:'GET'
  })
}

// 获取用户列表
export function reqUserList(type) {  
  return ajax({
    url:'/userlist',
    method:'GET',
    params:{type}
  })
}

// 获取当前用户的消息列表
export function reqChatMsgList() {  
  return ajax({
    url:'/msglist',
    method:'GET'
  })
}

// 修改指定消息为已读
export function reqReadMsg(from) {  
  return ajax({
    url:'/readmsg',
    method:'POST',
    params:{from}
  })
}
