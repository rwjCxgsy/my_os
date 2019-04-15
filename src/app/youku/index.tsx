import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'
import classnames from 'classnames'
// import Xgplayer from 'xgplayer-react';
// import {message} from 'antd'
// import _ from 'lodash';
console.log(styles)
let Player: HTMLVideoElement | null = null

// console.log(_)

// const _ = require('lodash/array')
// console.log(_)

let divPosition: any[] = []
export default class Password extends Component<any> {

    state: any = {
        paw: [1, 2, 3, 4, 5]
    }

  render() {
    const {title, onClose} = this.props
    const {url, isFullScreen} = this.state
    const map = [
        1,2,3,
        4,5,6,
        7,8,9
    ]
    return (
      <Window title={title} onClose={onClose}>
        <div className={styles.password}>
            <p></p>
            <div id="points">
                {
                    map.map(v => {
                        return <div key={v}>
                            <span />
                        </div>
                    })
                }
                <canvas id="canvas" />
            </div>
        </div>
      </Window>
    )
  }

  componentDidMount () {

      const getDivPositionLeft = (node: any) => {
          let left = node.offsetLeft
          let parent = node.offsetParent
          debugger
          while(parent) {
            left += parent.offsetLeft
            parent = parent.offsetParent
          }
          return left
      }

      const getDivPositionTop = (node: any) => {
        let Top = node.offsetTop
        while(node.offsetParent) {
          Top += node.offsetParent.offsetTop
          node = node.offsetParent
        }
        return Top
    }
      setTimeout(() => {
        const div = document.querySelectorAll('#points div');
        divPosition: any[] = [];
        [].forEach.call(div, (v: any, i: number, a: any) => {
            divPosition.push({
                left: v.getBoundingClientRect().left | 0,
                top: v.getBoundingClientRect().top | 0,
                width: v.offsetWidth,
                height: v.offsetHeight
            })
        })    
        console.log(div, divPosition)
        this.getCanvasContext()
      }, 305)
  }

  getCanvasContext () {
      const canvas: HTMLCanvasElement = (document.getElementById('canvas') as HTMLCanvasElement)
      const context = canvas!.getContext('2d');
      let isTouch = false
      canvas.addEventListener('touchstart', e => {
        isTouch = true
      })
      document.addEventListener('touchmove', e => {
          if (!isTouch) return
          const {pageX, pageY} = e.touches[0]
          console.log(pageX, pageY)
        //   divPosition.find(v => {
        //       return v
        //   })
      })

      document.addEventListener('touchend', e => {
        isTouch = false
    })
  }
}
