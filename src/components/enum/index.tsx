import React, { Component } from 'react'
import styles from './index.module.less';
import {List} from 'antd'
type Point = {
    pointX: number,
    pointY: number    
}

interface Iprops {
    show: boolean,
    point: Point,
    style: object
}

const enumList = [
  {
    icon: '#icon-chakan',
    text: '查看',
    event () {
      console.log('查看')
    }
  },
  {
    icon: '#icon-xinzeng1',
    text: '新建',
    event () {
      console.log('新建')
    }
  },
  {
    icon: '&#xe603;',
    text: '刷新',
    event () {
      console.log('刷新')
    }
  },
  {
    icon: '#icon-fuzhi',
    text: '复制',
    event () {
      console.log('复制')
    }
  },
  {
    icon: '#icon-jianqie',
    text: '粘体',
    event () {
      console.log('粘体')
    }
  },
  {
    icon: '#icon-shanchu1',
    text: '删除',
    event () {
      console.log('删除')
    }
  }
]

export default class Eeum extends Component<Iprops> {
  render() {
    const {show, style} = this.props
    return (
      <div>
          {
              show ? <div className={styles['right-enum']} style={style}>
                {
                  enumList.map((v, i) => {
                    return (
                      <div onClick={v.event} key={i}>
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref={v.icon} />
                        </svg>
                        <span>{v.text}</span>
                      </div>                      
                    )
                  })
                }
              </div> : ''
          }
      </div>
    )
  }
}
