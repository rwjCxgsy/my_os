import React from 'react';
import styles from './index.module.less';
import {connect} from 'react-redux'

class Launcher extends React.Component<Ilauncher> {
    render () {
        const {type, id, icon, text, launcher} = this.props
        console.log(icon)
        new Image().src = icon
        return (
            <div className={styles.launcher}>
                <img className={styles.icon} src={icon}/>
                <span>{text}</span>
            </div>
        )
    }
}

export default connect((state) => state, (dispatch => {
    return {
        open () {
            dispatch({type: 'open_menu'})
        }
    }
}))(Launcher)