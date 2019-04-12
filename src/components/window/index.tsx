import React, { Component } from 'react'
import styles from './index.module.less';
import classname from 'classnames'
// import { Icon } from 'react-onsenui';
import {createHashHistory} from 'history'

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
                    <div className={styles.left}>
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
