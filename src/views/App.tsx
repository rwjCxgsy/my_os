import React, { Component, ReactEventHandler, MouseEvent } from 'react';
// import logo from './logo.svg';

import {connect} from 'react-redux'
import styles from './App.module.less';
console.log(styles)

import NProgress from 'nprogress'
import Launcher from '../components/launcher/index'
import Clock from '../components/clock';

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
    const {launcherList} = this.props
    const {pointX, pointY, width, height} = this.state
    return (
      <div className={styles.App}  onMouseMove={this.handleMove.bind(this)} onMouseUp={this.mouseUpHandle.bind(this)}>
        <div className={styles.header}>
          <div className={styles['header-left']}>
            <div className={styles.logo}>
              <img src={require("../assets/windows.png")} />              
            </div>
            <div className={styles.ie}>
              <img src={require("../assets/ie.png")}/>              
            </div>
            <div className={styles.holder}>
              <img src={require("../assets/icon/imageres.dll(1023).ico")}/>              
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
          <div className={styles.mask} style={{
            width: width + 'px',
            height: height + 'px',
            left: pointX + 'px',
            top: pointY + 'px'
          }} />
          {
            launcherList.map((v, i) => {
              return (
                <Launcher key={i} {...v}/>
              )
            })
          }
        </div>
      </div>
    )
  }

  handleDown = (e: MouseEvent) : void => {
    console.log('鼠标下')
    const {pageX, pageY} = e
    this.setState({
      ...this.state,
      pointX: pageX,
      pointY: pageY,
      isFocus: true
    })
  }

  handleMove = (e: MouseEvent) : void=> {
    const {pointX, pointY, isFocus} = this.state
    if (!isFocus) {
      return 
    }
    const {pageX, pageY} = e
    const width = Math.abs(pageX - pointX)
    const height = Math.abs(pageY - pointY)
    let _pointY = pointY
    let _pointX = pointX
    if (pageX < pointX) {
      _pointX = pageX
    }
    if (pageY < pointY) {
      _pointY = pageY
    }
    this.setState({
      ...this.state,
      pointX: _pointX,
      pointY: _pointY,
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
  componentWillMount(){
    document.oncontextmenu = (e: any) :any => {
      e.preventDefault()
      // const target = e.target
      // const {pageX, pageY} = e
      // console.log(e)
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
