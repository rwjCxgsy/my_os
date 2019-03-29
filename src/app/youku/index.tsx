import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'
import classnames from 'classnames'
import Xgplayer from 'xgplayer-react';
console.log(styles)

let Player: any = null


const videoList = [
    {
        url: 'https://h5player.bytedance.com/video/mp4/xgplayer-demo-720p.mp4',
        title: '西瓜视频宣传片'
    },
    {
        url: 'https://vdn1.vzuu.com/SD/b5fc7060-4e9d-11e9-8db6-0a580a449c44.mp4?disable_local_cache=1&bu=com&expiration=1579850414&auth_key=1553850414-0-0-14e757956416c5ef1fecf41515d11dc0&f=mp4&v=hw',
        title: '海洋里到底有什么可怕的东西？'
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

  componentWillMount () {
      this.setState({
          url: videoList[0].url
      })
  }
}
