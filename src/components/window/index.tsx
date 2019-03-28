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


let isDown: boolean = false
let pointX: number = 0
let pointY: number = 0
let lastLeft = 0
let lastTop = 0
let windows: HTMLElement = document.createElement('div')
export default class Window extends Component<Iprops, Istate> {
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
                    windows = e                    
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
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-quanping" />
                                </svg>                    
                            ) : (
                                <svg className="icon" aria-hidden="true">
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
    mouseDownHandle = (e: any): void => {
        console.log(e)
        const {pageX, pageY} = e
        pointX = pageX,
        pointY = pageY
        isDown = true
    }
    componentDidMount () {
        addDocumentMoveEvent((e: MouseEvent) => {
            if (!isDown) return
            console.log(e)
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
            const left = pageX - pointX
            const top = pageY - pointY
            windows.style.cssText = `margin-left: ${lastLeft + left}px;margin-top: ${lastTop + top}px`
        })
        addDocumentUpEvent((e: MouseEvent) => {
            // const {pageX, pageY} = e
            let marginLeft: any = windows.style.marginLeft
            let marginTop: any = windows.style.marginTop
            if (marginLeft) {
                marginLeft = parseInt(marginLeft.substring(0, marginLeft.length - 2)) || 0
            }
            if (marginTop) {
                marginTop = parseInt(marginTop.substring(0, marginTop.length - 2)) || 0
            }
            lastLeft = marginLeft,
            lastTop = marginTop
            isDown = false
            console.log(pointX, pointY)
        })
    }

    componentWillUnmount () {
        removeDocumentMoveEvent()
        removeDocumentUpEvent()
    }
}
