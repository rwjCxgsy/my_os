import React, { Component } from 'react'
import styles from './index.module.less'
import Jsonp from 'jsonp'
import lodash from 'lodash'
const debounce = lodash.debounce
// console.log(debounce)
export default class SearchTop extends Component<any> {

  state = {
    show: false
  }

  render() {
    const {show} = this.state 
    return (
      <div className={styles['search-top']}>
        <div className={styles.input}>
            <div>
              <span>C</span>
              <span>x</span>
              <span>g</span>
              <span>s</span>
              <span>y</span>
            </div>
            <input type="search"
              onChange={this.inputHandle}
              placeholder="搜索查找"
            />
        </div>
      </div>
    )
  }
  
  showFn = () => {
    console.log('查找')
  }

  inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target)
    const {value} = e.target
    debounce(this.find, 333)
  }

  find = (e: any) => {
    console.log('搜索')
    e.target.blur()
    const {Find = () => {}} = this.props
    Find()
  }
}
