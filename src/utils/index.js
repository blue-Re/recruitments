// 返回对应的路由地址
export function getRedirectTo(type, header) {
  let path
  if (type === 'laoban') {
    path = '/laoban'
  } else {
    path = '/dashen'
  }
  if (!header) { // 没有值，返回信息完善界面的path
    path += 'info'
  }
  return path
}