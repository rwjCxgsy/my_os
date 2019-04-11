import React, { Component } from 'react'
import styles from './index.module.less';
import {addDocumentMoveEvent, addDocumentUpEvent, removeDocumentMoveEvent, removeDocumentUpEvent} from '../../utils'
import classname from 'classnames'
import { message } from 'antd';
import { Icon } from 'antd-mobile';
interface Istate {
    isFullScreen: boolean
}

interface Iprops {
    title: string
    isAbleFull?: boolean
    onClose: () => void
    onFullScreen?: () => void
    onExitFullScreen?: () => void
}


// let isDown: boolean = false
// let pointX: number = 0
// let pointY: number = 0
// let lastLeft = 0
// let lastTop = 0
// let windows: HTMLElement = document.createElement('div')

let zIndex = 99
export default class Window extends Component<Iprops, Istate> {
    raletive: any = {
        isDown: false,
        pointX: 0,
        pointY: 0,
        lastLeft: 0,
        lastTop: 0,
        windows: document.createElement('div')
    }
    state: Istate = {
        isFullScreen: false
    }
    render() {
        const {isFullScreen} = this.state
        const {title} = this.props
        console.log(isFullScreen)
        return (
            <div className={classname([styles.window, 'zoomIn'])} ref={e => {
                if (e) {
                    this.raletive.windows = e                    
                }
            }}>
                <div className={styles.header}
                    id="windowHeader">
                    <div className={styles.left}>
                        <Icon size={'md'} type="left"/>
                        <span>{title}</span>
                    </div>
                    <div className={styles.right}>
                        <svg className="icon" aria-hidden="true" onClick={this.props.onClose}>
                            <use xlinkHref="#icon-windows" />
                        </svg> 
                        {/* <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-jianhao" />
                        </svg>
                        {
                            !isFullScreen ? (
                                <svg className="icon" aria-hidden="true" onClick={e => {
                                    e.stopPropagation()
                                    this.fullScreen()
                                }}>
                                    <use xlinkHref="#icon-quanping" />
                                </svg>                    
                            ) : (
                                <svg className="icon" aria-hidden="true" onClick={e => {
                                    e.stopPropagation()
                                    this.exitScreen()
                                }}>
                                    <use xlinkHref="#icon-huanyuan" />
                                </svg>                    
                            )
                        }
                        <svg onClick={this.props.onClose} className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-guanbi" />
                        </svg> */}
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.main}>
                        {this.props.children}                        
                    </div>
                </div>
            </div>
        )
    }

    exitScreen (): void {
        const {windows, lastLeft, lastTop} = this.raletive
        console.log(this.raletive)
        windows.style.left = '';
        windows.style.top = '';
        windows.style.width = ''
        windows.style.height = ''
        windows.style.marginLeft = `${lastLeft}px`
        windows.style.marginTop = `${lastTop}px`
        windows.style.transform = '';
        windows.classList.remove('full')
        this.setState({
            isFullScreen: false
        })
    }

    fullScreen (): void {
        const {isAbleFull = true} = this.props
        if (!isAbleFull) {
            message.info('该app不能全屏')
            return 
        }
        const {windows} = this.raletive
        windows.style.left = '0px';
        windows.style.top = '40px';
        windows.style.width = window.innerWidth + 'px'
        windows.style.height = (window.innerHeight - 30) + 'px'
        windows.style.marginLeft = '0px'
        windows.style.marginTop = '0px'
        windows.style.transform = 'translate(0, 0)';
        console.log(windows.classList)
        windows.classList.add('full')
        this.setState({
            isFullScreen: true
        })
        const {onFullScreen = () => {}} = this.props
        onFullScreen()
    }

    mouseDownHandle = (e: any): void => {
        if (this.state.isFullScreen) {
            return 
        }
        zIndex ++
        console.log(zIndex)
        this.raletive.windows.style.zIndex = zIndex
        const {pageX, pageY} = e
        this.raletive.pointX = pageX,
        this.raletive.pointY = pageY
        this.raletive.isDown = true
    }
    componentDidMount () {
        const {isAbleFull = true} = this.props
        if (isAbleFull) {
            this.fullScreen()
        }        
        addDocumentMoveEvent((e: MouseEvent) => {
            if (!this.raletive.isDown) return
            const {pageX, pageY} = e
            // let marginLeft: any = windows.style.marginLeft
            // let marginTop: any = windows.style.marginTop
            // if (marginLeft) {
            //     marginLeft = parseInt(marginLeft.substring(0, marginLeft.length - 2)) || 0
            // }
            // if (marginTop) {
            //     marginTop = parseInt(marginTop.substring(0, marginTop.length - 2)) || 0
            // }
            // console.log(marginTop, marginLeft)
            const left = pageX - this.raletive.pointX
            const top = pageY - this.raletive.pointY
            this.raletive.windows.style.marginLeft = `${this.raletive.lastLeft + left}px`
            this.raletive.windows.style.marginTop = `${this.raletive.lastTop + top}px`
        })
        addDocumentUpEvent((e: MouseEvent) => {
            // const {pageX, pageY} = e
            let marginLeft: any = this.raletive.windows.style.marginLeft
            let marginTop: any = this.raletive.windows.style.marginTop
            if (marginLeft) {
                marginLeft = parseInt(marginLeft.substring(0, marginLeft.length - 2)) || 0
            }
            if (marginTop) {
                marginTop = parseInt(marginTop.substring(0, marginTop.length - 2)) || 0
            }
            console.log(marginLeft, marginTop)
            this.raletive.lastLeft = marginLeft,
            this.raletive.lastTop = marginTop
            this.raletive.isDown = false
        })
    }

    componentWillUnmount () {

        // removeDocumentMoveEvent()
        // removeDocumentUpEvent()
    }
}
