import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'
import classnames from 'classnames'
// import Xgplayer from 'xgplayer-react';
import {message} from 'antd'
console.log(styles)
const vator = [
    [-3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [-2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [-2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
]

const point = [-3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const speen = 3

const eleVator = [
    {
        floor: -3,
        isRun: false,
        position: 'top'
    },
    {
        floor: -2,
        isRun: false,
        position: 'top'
    },
    {
        floor: -2,
        isRun: false,
        position: 'top'
    }
]

export default class Elevator extends Component<any> {
  render() {
      const {title, onClose} = this.props
    return (
      <Window title={title} onClose={onClose}>
        <div className={styles.elevator}>
            <div className={styles.build}>
                {
                    vator.map((v, i) => {
                        return <ul key={i}>
                            {
                                v.reverse().map((vv, ii) => {
                                    return <li className={classnames({
                                        [styles.active]: eleVator[i].floor === vv,
                                        [styles['vator-position-top']]: eleVator[i].position === 'top',
                                        [styles['vator-position-bottom']]: eleVator[i].position === 'bottom'
                                    })} style={{
                                        top: ((vv < 1 ? vv + 1 : vv) * -40) + 'px',
                                        left: (i * 40) + 'px'
                                    }} data-floor={vv} key={ii} >
                                        <span />
                                    </li>
                                })
                            }
                        </ul>
                    })
                }
                <div className={styles.point}>
                    <ul>
                        {
                            point.reverse().map((v ,i ,a) => {
                                return (
                                    <li key={i}>
                                        <strong>{v}F</strong>
                                        {
                                            i === 0 ? '' : <button onClick={this.top.bind(this)} className={styles['point-top']}>></button>
                                        }
                                        {
                                            i === a.length - 1 ? '' : <button onClick={this.bottom.bind(this)} className={styles['point-bottom']}>></button>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
      </Window>
    )
  }

  top () {

  }

  bottom () {

  }

  componentDidMount () {

  }
}
