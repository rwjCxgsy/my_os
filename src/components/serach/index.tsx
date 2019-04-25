import React, { Component } from 'react'
import styles from './index.module.less'
export default class SearchTop extends Component<any> {
  render() {
    return (
      <div className={styles['search-top']}>
        <div className={styles.input}>
            {/* <svg className={styles.icon} aria-hidden="true">
                <use xlinkHref={'#icon-baidu'} />
            </svg> */}
            <div>
              <span>C</span>
              <span>x</span>
              <span>g</span>
              <span>s</span>
              <span>y</span>
            </div>
            <input type="search" ref={e => {
              (e as any).onsearch = this.find
            }}/>
        </div>
      </div>
    )
  }

  find = (e: any) => {
    console.log('搜索')
    e.target.blur()
    const {Find = () => {}} = this.props
    Find()
  }
}
