import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'
import classnames from 'classnames'

const osList = [
  {
    icon: '#icon-windows',
    text: '系统盘',
    max: '128',
    value: '50'
  },
  {
    icon: '#icon-yingpancopy',
    text: 'D盘(应用)',
    max: '128',
    value: '10'
  },
  {
    icon: '#icon-yingpancopy',
    text: 'E盘（文件）',
    max: '128',
    value: '5'
  },
  {
    icon: '#icon-yingpancopy',
    text: 'F盘（娱乐）',
    max: '128',
    value: '100'
  }
]

export default class MyOS extends Component<any> {
  render() {
    const {title, onClose} = this.props
    return (
      <Window title={title} onClose={onClose}>
        <div className={styles.os}>
          <ul className={styles.main}>
            {
              osList.map(v => {
                return (
                  <li>
                    <div className={styles.icon}>
                      <svg className={classnames([styles.svg, 'icon'])} aria-hidden="true">
                          <use xlinkHref={v.icon} />
                      </svg>
                    </div>
                    <div className={styles.des}>
                      <strong>{v.text}</strong>
                      <progress value={v.value} max={v.max}></progress>
                      <p>{`${v.value}G已用,合计${v.max}G`}</p>
                    </div>
                  </li>                  
                )
              })
            }
          </ul>
        </div>
      </Window>
    )
  }
}
