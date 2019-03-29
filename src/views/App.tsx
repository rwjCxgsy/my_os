import React, { Component, ReactEventHandler, MouseEvent } from 'react';
// import logo from './logo.svg';

import {connect} from 'react-redux'
import styles from './App.module.less';
import Enum from '../components/enum'

import NProgress from 'nprogress'
import Launcher from '../components/launcher/index'
import Clock from '../components/clock';

import {render} from 'react-dom'

import {message} from 'antd'

import {getAppList} from './appList'


function fullScreen (): void {
  if (!(document as any).webkitIsFullScreen) {
    document.documentElement.requestFullscreen().then(v => {
      console.log('全屏')
    }).catch(e => {
      console.log('失败')
    })    
  } else {
    (document as any).webkitCancelFullScreen()
  }
}

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
    const {pointX, pointY, width, height} = this.state
    return (
      <div className={styles.App}>
        <div className={styles.header}>
          <div className={styles['header-left']}>
            <div className={styles.logo}>
              <img src={require("../assets/windows.png")} />              
            </div>
          </div>
          <div className={styles['header-right']}>
            <Clock />
            <div className={styles.full} onClick={fullScreen} title="全屏">
              <img src={require("../assets/full.png")}/>              
            </div>
          </div>
        </div>
        <div className={styles.content} onMouseDown={this.handleDown.bind(this)}>
          {/* <div className={styles.mask} style={{
            width: width + 'px',
            height: height + 'px',
            left: pointX + 'px',
            top: pointY + 'px'
          }} /> */}
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
    
    if (runApps[launcher.id]) {
      message.info('运行中...');
      return
    }
    const app: HTMLElement = document.createElement('div')
    app.setAttribute('id', launcher.id)
    runApps[launcher.id] = app
    render(<launcher.app title={launcher.title} onClose={() => {
      app.remove()
      delete runApps[launcher.id]
    }}/>, app)
    document.body.append(app)
  }

  handleDown = (e: MouseEvent) : void => {
    if (divEmun) {
      divEmun.remove()
      divEmun = null
    }
    console.log('鼠标下')
    const {pageX, pageY} = e
    enumShow: false
    // this.setState({
    //   ...this.state,
    //   pointX: pageX,
    //   pointY: pageY,
    //   isFocus: true,
    //   enumShow: false
    // })
  }

  handleMove = (e: MouseEvent) : void=> {
    const {isFocus} = this.state
    if (!isFocus) {
      return 
    }
    let {pointX, pointY} = this.state
    let {pageX, pageY} = e
    const width = Math.abs(pageX - pointX)
    const height = Math.abs(pageY - pointY)
    if (pageX < pointX) {
      [pointX, pageX] = [pageX, pointX]
    }
    if (pageY < pointY) {
      [pointY, pageY] = [pageY, pointY]
    }
    console.log(width, height)
    this.setState({
      ...this.state,
      pointX,
      pointY,
      width,
      height
    })
  }

  mouseUpHandle = (e: MouseEvent) : void => {
    console.log('鼠标起')
    this.setState({
      width: 0,
      height: 0,
      pointX: 0,
      pointY: 0,
      isFocus: false
    })
  }

  componentWillUpdate () {
    NProgress.start()
  }
  componentDidUpdate () {
    NProgress.done()
  }
  componentWillMount() {
    document.oncontextmenu = (e: any) :any => {
      e.preventDefault()
      if (divEmun) {
        return
      }
      // const target = e.target
      const {pageX, pageY} = e
      divEmun! = document.createElement('div')
      render(
          <Enum style={{
            left: pageX + 'px',
            top: pageY + 'px'
          }} show={true}
            eunmClick={() => {
              divEmun!.remove()
            }}
          />,
          divEmun
      )
      document.body.append(divEmun)
    }
  }
}

const mapState = (state: any) => {
  console.log(state)
  return {
    launcherList: state.launcherList
  }
} 

export default connect(mapState)(App);
