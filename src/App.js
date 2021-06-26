import React, { Component } from 'react'
import '../node_modules/antd-mobile/dist/antd-mobile.css'
import { Switch, Route } from 'react-router'
import Register from './containers/Register/Register'
import Login from './containers/Login/Login'
import BossInfo from './containers/BossInfo/BossInfo'
import ManitoInfo from './containers/ManitoInfo/ManitoInfo'
import Main from './containers/Main/Main'
export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/laobaninfo" component={BossInfo} />
          <Route path="/dasheninfo" component={ManitoInfo} />
          <Route component={Main}></Route>
        </Switch>
      </div>
    )
  }
}
