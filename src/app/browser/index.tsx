import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'

export default class Browser extends Component<any> {

  render() {
    return (
      <Window title="搜索结果" onClose={this.props.onClose}>
        <div className={styles.warp}>

        </div>
      </Window>
    )
  }
}
