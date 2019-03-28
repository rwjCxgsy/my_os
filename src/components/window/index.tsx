import React, { Component } from 'react'
import styles from './index.module.less';

interface Istate {
    isFullScreen: boolean
}

interface Iprops {
    title: string,
    onClose: () => void
}

export default class Window extends Component<Iprops, Istate> {
    state: Istate = {
        isFullScreen: false
    }
    render() {
        const {isFullScreen} = this.state
        const {title} = this.props
        console.log(isFullScreen)
        return (
            <div className={styles.window}>
                <div className={styles.header}>
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
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
