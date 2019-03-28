import React from 'react';
import styles from './index.module.less';
import {connect} from 'react-redux'


class Launcher extends React.Component<any> {
    render () {
        const {type, id, icon, title, launcher, onOpen} = this.props
        return (
            <div className={styles.launcher}>
                <img className={styles.icon} onClick={this.open.bind(this)} src={icon}/>
                <span onClick={this.open.bind(this)}>{title}</span>
            </div>
        )
    }

    open () {
        const {onOpen} = this.props
        console.log('onOpen')
        onOpen()
    }
}

export default connect()(Launcher)