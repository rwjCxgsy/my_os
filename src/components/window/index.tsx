import React, { Component } from 'react'
import styles from './index.module.less';
import classname from 'classnames'
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

    componentWillUnmount () {

        // removeDocumentMoveEvent()
        // removeDocumentUpEvent()
    }
}
