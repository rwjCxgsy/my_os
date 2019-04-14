import React from 'react';
import styles from './index.module.less';
import {connect} from 'react-redux'
import classnames from 'classnames'

class Launcher extends React.Component<any> {
    render () {
        const {icon, title} = this.props
        return (
            <div className={styles.launcher} onClick={this.open.bind(this)}>
                <div>
                    <svg className={classnames([styles.icon, 'icon'])} aria-hidden="true">
                        <use xlinkHref={icon} />
                    </svg>
                    <span>{title}</span>                    
                </div>
            </div>
        )
    }

    open () {
        console.log('')
        const {onOpen} = this.props
        console.log('onOpen', onOpen)
        onOpen()
    }
}

export default connect()(Launcher)