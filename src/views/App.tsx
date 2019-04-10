import React, { Component, ReactEventHandler, MouseEvent } from 'react';
// import logo from './logo.svg';

import {connect} from 'react-redux'
import styles from './App.module.less';
import Launcher from '../components/launcher/index'
import {render} from 'react-dom'
import {message} from 'antd'
import {getAppList} from './appList'

import TopSearch from '../components/serach'
import TopWeather from '../components/weather'

// import Clock from '../components/clock';
// import Enum from '../components/enum'
// import NProgress from 'nprogress'

interface Istate {
  pointX: number,
  pointY: number,
  width: number,
  height: number,
  isFocus: boolean
}
interface Iporps {
  launcherList: Ilauncher[]
}


const runApps: any = {}

let divEmun: HTMLElement | null  = null

let enumShow: boolean = false

class App extends Component<Iporps, Istate> {

  state: Istate = {
    pointX: 0,
    pointY: 40,
    width: 0,
    height: 0,
    isFocus: false
  }

  constructor(props: Iporps) {
    super(props);
  }
  
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.header}>
          <div className={styles.searchInput}>
            <TopSearch/>
            <TopWeather/>
          </div>
        </div>
        <div className={styles.content}>
          {
            getAppList().map((v: Ilauncher, i) => {
              return (
                <Launcher key={i} {...v} onOpen={this.openLauncher.bind(this, v)}/>
              )
            })
          }
        </div>
      </div>
    )
  }

  openLauncher (launcher: Ilauncher): void {
    if (!launcher.app) {
      message.error(`${launcher.title}未安装`)
      return
    }
    
    if (runApps['appId_' + launcher.id]) {
      message.info('运行中...');
      return
    }
    const app: HTMLElement = document.createElement('div')
    app.setAttribute('id', 'appId_' + launcher.id)
    runApps[launcher.id] = app
    render(<launcher.app title={launcher.title} onClose={() => {
      app.remove()
      delete runApps[launcher.id]
    }}/>, app)
    document.body.append(app)
    setTimeout(() => {
      console.log('添加完成')
      console.log(document.getElementById(`appId_${launcher.id}`))
    }, 0)
  }

}

const mapState = (state: any) => {
  console.log(state)
  return {
    launcherList: state.launcherList
  }
} 

export default connect(mapState)(App);
