import React, { Component } from 'react'
import jsonp from 'jsonp'

import styles from './index.module.less';
import list from './list';
import { Fab, Icon } from 'react-onsenui';
import {Link} from 'react-router-dom'
interface Istate {
  list: any []
}
export default class Wechat extends Component<any, Istate> {

  render() {
    return (
      <div className={styles.wechat}>1
      </div>
    )
  }

  componentDidMount () {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }

}
