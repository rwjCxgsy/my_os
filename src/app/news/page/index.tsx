import React, { Component } from 'react'
import jsonp from 'jsonp'

import styles from './index.module.less';
import list from './list';
import { Fab, Icon } from 'react-onsenui';
import {Link} from 'react-router-dom'
interface Istate {
  list: any []
}
export default class News extends Component<any, Istate> {

  state: Istate = {
    list: []
  }

  render() {
    const {list} = this.state
    return (
      <div className={styles.news}>
        <Fab modifier="mini" position={'bottom right'}>
          <Icon icon="reorder"/>
        </Fab>
        <div className={styles.list}>
          {
            list.map((v, i) => {
              return <Link to={`/news/info?url=${encodeURIComponent(v.url)}`} key={i}>
                <div>
                  <strong>{v.title}</strong>
                  <div className={styles.imgs}>
                    <img src={v.thumbnail_pic_s} alt=""/>
                  </div>
                  <p>文章作者<i>{v.author_name}</i></p>
                  <span>{v.date}</span>
                </div>
              </Link>
            })
          }          
        </div>
      </div>
    )
  }

  getData (url: string, option: any = {}) {
    return new Promise((resolve, reject) => {
      resolve(list)
      // jsonp(url, option, (err: any, data: any) => {
      //   console.log(data, err)
      //   if (err) {
      //     reject(err)          
      //   } else {
      //     resolve(data)
      //   }
      // })
    })
  }

  async initData () {
    const d = await this.getData('/toutiao/index?type=&key=4b4fbad0b071dd8654ec37ac1f831df3')
    const {data} = (d as any).result
    this.setState({
      list: data
    })
  }

  componentWillMount () {
    this.initData()
  }
}
