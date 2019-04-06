import React, { Component } from 'react'
import styles from './index.module.less';
import {addDocumentMoveEvent, addDocumentUpEvent, removeDocumentMoveEvent, removeDocumentUpEvent} from '../../utils'
import classname from 'classnames'
interface Istate {
    isFullScreen: boolean
}

interface Iprops {
    title: string,
    onClose: () => void
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
            <div className={styles.window} ref={e => {
                if (e) {
                    this.raletive.windows = e                    
                }
            }}>
                <div className={styles.header}
                    onMouseDown={this.mouseDownHandle.bind(this)}>
                    <span>{title}</span>
                    <div className={styles.right}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-jianhao" />
                        </svg>
                        {
                            !isFullScreen ? (
                                <svg className="icon" aria-hidden="true" onClick={this.fullScreen.bind(this)}>
                                    <use xlinkHref="#icon-quanping" />
                                </svg>                    
                            ) : (
                                <svg className="icon" aria-hidden="true" onClick={this.exitScreen.bind(this)}>
                                    <use xlinkHref="#icon-huanyuan" />
                                </svg>                    
                            )
                        }
                        <svg onClick={this.props.onClose} className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-guanbi" />
                        </svg>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles['ohter']}>
                        <div className={classname([styles['content-left'], styles['scalc']])}/>
                        <div className={styles.main}>
                            {this.props.children}                        
                        </div>
                        <div className={classname([styles['content-right'], styles['scalc']])} />
                    </div>
                    <div className={classname([styles['content-bottom'], styles['scalc']])} />
                </div>
            </div>
        )
    }

    exitScreen (e: any): void {
        e.stopPropagation()
        console.log(this.raletive)
        this.raletive.windows.style.left = '';
        this.raletive.windows.style.top = '';
        this.raletive.windows.style.width = ''
        this.raletive.windows.style.height = ''
        this.raletive.windows.style.marginLeft = `${this.raletive.lastLeft}px`
        this.raletive.windows.style.marginTop = `${this.raletive.lastTop}px`
        this.raletive.windows.style.transform = '';
        this.setState({
            isFullScreen: false
        })
    }

    fullScreen (e: any): void {
        e.stopPropagation()
        this.raletive.windows.style.left = '0px';
        this.raletive.windows.style.top = '40px';
        this.raletive.windows.style.width = window.innerWidth + 'px'
        this.raletive.windows.style.height = (window.innerHeight - 30) + 'px'
        this.raletive.windows.style.marginLeft = '0px'
        this.raletive.windows.style.marginTop = '0px'
        this.raletive.windows.style.transform = 'translate(0, 0)';
        this.setState({
            isFullScreen: true
        })
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
