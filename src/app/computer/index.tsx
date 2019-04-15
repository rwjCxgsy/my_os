import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'
import { number } from 'prop-types';
console.log(styles)

interface Iprops {
  title: string
}


let txt: string = ''
let table: null | HTMLTableElement= null
export default class Computer extends Component<any> {
  state: any = {
    result: '0'
  }
  render() {
    const {title, onClose} = this.props
    return (
      <div>
          <Window title={title} onClose={onClose} isAbleFull={false}>
              <div className={styles.computer}>
                <div className={styles.output} id="outputHeight">
                 <p>{this.state.result === '' ? '0' : this.state.result}</p>
                </div>
                <div className={styles.input}>
                  <table ref={((e: HTMLTableElement) => {
                    table = e
                  })}>
                    <tbody>
                      <tr>
                        <td onClick={this.computerMath.bind(this, '/', 'sign')}>/</td>
                        <td onClick={this.computerMath.bind(this, '*', 'sign')}>*</td>
                        <td onClick={this.computerMath.bind(this, '-', 'sign')}>-</td>
                        <td onClick={this.clearComputer.bind(this)}>CE</td>
                      </tr>
                      <tr>
                        <td onClick={this.computerMath.bind(this, '7', '')}>7</td>
                        <td onClick={this.computerMath.bind(this, '8', '')}>8</td>
                        <td onClick={this.computerMath.bind(this, '9', '')}>9</td>
                        <td onClick={this.computerMath.bind(this, '+', 'sign')} rowSpan={2}>+</td>                      
                      </tr>
                      <tr>
                        <td onClick={this.computerMath.bind(this, '4', '')}>4</td>
                        <td onClick={this.computerMath.bind(this, '5', '')}>5</td>
                        <td onClick={this.computerMath.bind(this, '6', '')}>6</td>
                      </tr>
                      <tr>
                        <td onClick={this.computerMath.bind(this, '1', '')}>1</td>
                        <td onClick={this.computerMath.bind(this, '2', '')}>2</td>
                        <td onClick={this.computerMath.bind(this, '3', '')}>3</td>
                        <td onClick={this.computerResult.bind(this)} rowSpan={2}>=</td>
                      </tr>
                      <tr>
                        <td onClick={this.computerMath.bind(this, '0', '')} colSpan={2}>0</td>
                        <td onClick={this.computerMath.bind(this, '.', '')}>.</td>
                      </tr>                      
                    </tbody>
                  </table>
                </div>
              </div>
          </Window>
      </div>
    )
  }

  clearComputer () {
    txt = ''
    this.setState({
      result: txt
    })
  }

  computerMath (value: string, sign?: string) {
    const {length} = txt
    const last = txt.substr(length - 1)
    if (length === 0 && sign) {
      return 
    }
    const isNumber = (txt + value).split(/[/+*-]+/g)
    console.log(isNumber)
    const check = isNumber.every(v => {
      if (isNaN(Number(v))) {
        return false
      }
      console.log(Number(v))
      return typeof Number(v) === 'number'
    })
    if (!check) return false
    if (['*', '/', '-', '+', '.'].includes(last) && sign) {
      txt = txt.substring(0, length - 1) + value
    } else {
      txt += value
    }
    this.setState({
      result: txt
    })
  }
  computerResult () {
    if (!txt) return
    txt = txt.replace(/(\d)+/g, (v: string): any => {
      return Number(v) + ''
    })
    try {
      const result = eval(txt)
      txt = result + ''
      this.setState({
        result: txt
      })   
    } catch (error) {
      console.error('计算不规范', error)
    }
  }
  componentDidMount () {
    setTimeout(() => {
      const headerHeight = (document.getElementById('windowHeader') as HTMLDivElement).offsetHeight
      const outputHeight = (document.getElementById('outputHeight') as HTMLDivElement).offsetHeight
      table!.style.height = (window.innerHeight - headerHeight - outputHeight) + 'px'
    }, 0)
  }

  componentWillUnmount () {
    txt = ''
  }
}
