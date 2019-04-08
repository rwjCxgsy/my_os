import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'
import { number } from 'prop-types';
console.log(styles)

interface Iprops {
  title: string
}


let txt: string = ''
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
                <div className={styles.output}>
                  {this.state.result}
                </div>
                <div className={styles.input}>
                  <table>
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
    console.log(value, txt)
    const {length} = txt
    const last = txt.substr(length - 1)
    if (length === 0 && sign) {
      return 
    }
    console.log(last)
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
    console.log(txt)
    try {
      const result = eval(txt)
      txt = result + ''
      this.setState({
        result: txt
      })   
    } catch (error) {
      console.log('计算不规范')
    }
  }
}
