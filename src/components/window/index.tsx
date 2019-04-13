import React, { Component } from 'react'
import styles from './index.module.less';
import classname from 'classnames'
// import { Icon } from 'react-onsenui';
import {createHashHistory} from 'history'
import {notification} from 'onsenui'
const history = createHashHistory()
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
                    <div className={styles.left} onClick={this.pageBack}>
                        <svg style={{
                            width: '24px',
                            height: '24px'
                        }} viewBox="0 0 24 24">
                            <path fill="#000000" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                        </svg>
                    </div>
                    <span>{title}</span>
                    <div className={styles.right}>
                        <svg className="icon" aria-hidden="true" onClick={this.closeWindow}>
                            <use xlinkHref="#icon-windows" />
                        </svg> 
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

    pageBack = () => {
        let {hash} = location
        hash = hash.slice(1)
        const path = hash.split('/')
        let length = 0
        path.forEach(v => {
            if (v) length++
        })
        if (!hash || length === 1) {
            notification.confirm({
                title: '提示',
                message: '确定要退出app吗？'
            }).then((isOk: any): void => {
                if (isOk === 1) {
                    history.goBack()
                    this.props.onClose()                    
                }
            })
            return 
        }
        history.goBack()
    }

    componentDidMount () {

    }
    closeWindow = () => {
        this.props.onClose()
        history.goBack()
    }

    componentWillUnmount () {

        // removeDocumentMoveEvent()
        // removeDocumentUpEvent()
    }
}
