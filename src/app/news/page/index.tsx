import React, { Component } from 'react'
import jsonp from 'jsonp'

import styles from './index.module.less';
import list from './list';
import { Fab, Icon} from 'react-onsenui';
import {Link} from 'react-router-dom'
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
    return (
      <div className={styles.news}>
        <Fab modifier="mini" position={'bottom right'} onClick={this.showNewsType}>
          <Icon icon="reorder"/>
        </Fab>
        {/* <Splitter>
          <SplitterSide
            collapse
            side="left"
            width={200}
            swipeable={false}
            isOpen={sideShow}>
            {
              newsType.map((v, i) => {
                return <ListItem key={'id_news_type_' + i} >{v.name}</ListItem>
              })
            }
          </SplitterSide>
        </Splitter> */}
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
      // resolve(list)
      jsonp(url, option, (err: any, data: any) => {
        console.log(data, err)
        if (err) {
          reject(err)          
        } else {
          resolve(data)
        }
      })
    })
  }

  showNewsType = () => {
    this.setState({
      ...this.state,
      sideShow: true
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
