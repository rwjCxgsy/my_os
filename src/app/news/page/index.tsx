import React, { Component } from 'react'
import jsonp from 'jsonp'

import styles from './index.module.less';
import list from './list';
import { Fab, Icon} from 'react-onsenui';
import {Link} from 'react-router-dom'

import { loading, destory } from '../../../utils'
interface Istate {
  list: any [],
  sideShow: boolean
}

const newsType = [
  {
    name: '头条',
    value: 'top'
  },
  {
    name: '社会',
    value: 'shehui'
  },
  {
    name: '国内',
    value: 'guonei'
  },
  {
    name: '国际',
    value: 'guoji'
  },
  {
    name: '娱乐',
    value: 'yule'
  },
  {
    name: '体育',
    value: 'tiyu'
  },
  {
    name: '军事',
    value: 'junshi'
  },
  {
    name: '科技',
    value: 'keji'
  },
  {
    name: '财经',
    value: 'caijing'
  },
  {
    name: '时尚',
    value: 'shishang'
  }
]

export default class News extends Component<any, Istate> {

  state: Istate = {
    list: [],
    sideShow: false
  }

  render() {
    const {list, sideShow} = this.state

    const scale = 750 / window.innerWidth

    const liHTML = newsType.map((v, i) => {
      return <li style={{
        top: Math.sin(Math.PI * 2 / newsType.length * i) * 100 - (40 / scale) + 'px',
        left: Math.cos(Math.PI * 2 / newsType.length * i) * 100 - (40 / scale) + 'px',
        opacity: 1,
      }}>{v.name}</li>
    })

    return (
      <div className={styles.news}>
        {/* <div>
          <Icon icon="reorder"/>
        </div> */}
        <Fab modifier="mini" position={'bottom right'} onClick={this.toggleNewsType}>
          <Icon icon="reorder"/>
        </Fab>
        {
          sideShow ? <div className={styles.mask} onClick={this.toggleNewsType}>
              <div className={styles['news-type']}>
              {
                sideShow ? <ul>{liHTML}</ul> : ''
              }
            </div>
          </div> : ''
        }
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

  toggleNewsType = () => {
    this.setState({
      ...this.state,
      sideShow: !this.state.sideShow
    })
  }

  selectNewsType = (e: any) =>{
    console.log(e)
    e.stopPropagation()
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
    // loading('加载中...')
    setTimeout(this.initData.bind(this), 350)
    // setTimeout(destory, 1000)
  }
}
