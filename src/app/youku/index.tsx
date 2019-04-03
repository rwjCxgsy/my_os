import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'
import classnames from 'classnames'
// import Xgplayer from 'xgplayer-react';
import {message} from 'antd'

let Player: HTMLVideoElement | null = null


const videoList = [
    {
        url: 'https://h5player.bytedance.com/video/mp4/xgplayer-demo-720p.mp4',
        title: '西瓜视频宣传片'
    },
    {
        url: 'https://vdn1.vzuu.com/SD/b5fc7060-4e9d-11e9-8db6-0a580a449c44.mp4?disable_local_cache=1&bu=com&expiration=1579850414&auth_key=1553850414-0-0-14e757956416c5ef1fecf41515d11dc0&f=mp4&v=hw',
        title: '海洋里到底有什么可怕的东西？'
    },
    {
        url: 'http://hc.yinyuetai.com/uploads/videos/common/BE600169CBBFFACE8BC6383ED22133C3.mp4?sc=8358efeab6ff2fb1&br=781&vid=3368599&aid=43925&area=US&vst=0',
        title: '【MV】Billie Eilish-bad guy '
    }
]

export default class Youku extends Component<any> {

    state: any = {
        // config: {
        //     url: 'https://h5player.bytedance.com/video/mp4/xgplayer-demo-720p.mp4',
        //     id: 'youku',
        //     autoplay: true,
        //     height: 600,
        //     width: 800
        // }
        url: ''
    }

  render() {
    const {title, onClose} = this.props
    const {url} = this.state
    return (
      <Window title={title} onClose={onClose}>
        <div className={styles.youku}>
            <div className={styles.left}>
                {/* <Xgplayer config={config} playerInit={(player: any) => {
                    Player = player
                 }} /> */}
                 <video controls ref={e => {Player = e}} controlsList="nodownload" src={url}/>
            </div>
            <div className={styles.right}>
                <ul>
                        {
                            videoList.map((v, i) => {
                                return (
                                    <li className={classnames({
                                        [styles.active]: url === v.url
                                    })} key={i} onClick={this.changeVideo.bind(this, v)}>{v.title}</li>
                                )
                            })
                        }
                </ul>
            </div>
        </div>
      </Window>
    )
  }

  changeVideo (v: any) {
    this.setState({
        url: v.url
    })
  }

  nextPlayVideo (tips: string, isError: boolean) {
    const {url} = this.state
    const current = videoList.find(v => url === v.url)
    if (isError) {
        message.error(tips)
    } else {
        message.warn(tips)
    }
    let nextVideo = videoList[0]
    videoList.forEach((v, i, a) => {
        if (v === current) {
            if (a[i+1]) {
                nextVideo = a[i+1]
            } else {
                nextVideo = a[0]
            }
        }
    })
    setTimeout(() => {
        this.setState({
            url: nextVideo.url
        })
    }, 1000)
  }

  componentDidMount () {
    Player!.addEventListener('loadeddata', () => {
        console.log('加载成功')
        Player!.play()
    })
    Player!.addEventListener('ended', () => {
        this.nextPlayVideo('该视频已播放完毕，即将播放下一个', false)
    })
    Player!.addEventListener("error", () => {
        this.nextPlayVideo('该视频已失效，即将播放下一个', true)
    })
  }

  componentWillMount () {
      this.setState({
          url: videoList[0].url
      })
  }
}
