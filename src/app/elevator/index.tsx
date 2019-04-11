import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'
import classnames from 'classnames'
// import Xgplayer from 'xgplayer-react';
import {message, Popover, Modal, Radio, Checkbox} from 'antd'
console.log(styles)

const CheckboxGround = Checkbox.Group
const vator = [
    [-3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [-2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [-2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
]

let point: any[] = []

vator.forEach(v => {
    v.forEach(vv => {
        if (!point.includes(vv)) {
            point.push(vv)
        }
    })
})
point = point.sort((a, b) => {
    return a > b ? 1 : -1
})
console.log(point)
const speen = 3

const eleVator = [
    {
        floor: -3,
        maxFloor: 10,
        minFloor: -3,
        isRun: false,
        aim: [],
        position: 'top'
    },
    {
        floor: -2,
        maxFloor: 10,
        minFloor: -2,
        isRun: false,
        aim: [],
        position: 'top'
    },
    {
        floor: -2,
        maxFloor: 12,
        minFloor: -2,
        isRun: false,
        aim: [],
        position: 'top'
    }
]


const SelectFloor = (
        <ul>
            {
                point.reverse().map((v, i) => {
                    return <li key={i}>{v}F</li>
                })
            }
        </ul>
    )

export default class Elevator extends Component<any, any> {
    state = {
        selectFloorVisible: false
    }
  render() {
      const {title, onClose} = this.props
      const options = point.reverse().map(v => {
          return {
            label: v + 'F', value: v 
          }
      })
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
                                            i === 0 ? '' : <button onClick={this.top.bind(this, v)} className={styles['point-top']}>☛</button>
                                        }
                                        {
                                            i === a.length - 1 ? '' : <button onClick={this.bottom.bind(this)} className={styles['point-bottom']}>☛</button>
                                        }  
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Modal
                    title="选择楼层"
                    mask={false}
                    visible={this.state.selectFloorVisible}
                    onOk={this.selectFloorOk}
                    onCancel={this.selectFloorCancel}>
                    <CheckboxGround options={options}/>
                </Modal>
            </div>
        </div>
      </Window>
    )
  }

  selectFloorOk = () => {
    this.setState({
        selectFloorVisible: false
    })
  }

  selectFloorCancel = () => {
    this.setState({
        selectFloorVisible: false
    })
  }

  top (v: number) {
      const ableUseElevator: any[] = []
      eleVator.forEach(vator => {
        if (v <= vator.maxFloor && v >= vator.minFloor) {
            ableUseElevator.push(vator)
          }
      })
      ableUseElevator.forEach(vator => {
          if (vator.floor <= v && vator.point === 'top') {
            vator.aim.push(1)
          }
      })
  }

  bottom () {

  }

  componentDidMount () {
    // setTimeout(() => {
    //     this.render()
    // }, 3000)
  }
}
