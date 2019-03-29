import React, { Component } from 'react'
import styles from './index.module.less'
import Window from '../../components/window'
import {Input, Button} from "antd";

function IsURL(str_url: string){
  var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
          +'?(([0-9a-z_!~*().&=+$%-]+: )?[0-9a-z_!~*().&=+$%-]+@)?' //ftp的user@
          + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
          + '|' // 允许IP和DOMAIN（域名）
          + '([0-9a-z_!~*()-]+.)*' // 域名- www.
          + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
          + '[a-z]{2,6})' // first level domain- .com or .museum
          + '(:[0-9]{1,4})?' // 端口- :80
          + '((/?)|' // a slash isn't required if there is no file name
          + '(/[0-9a-z_!~*().;?:@&=+$,%#-]+)+/?)$';
  var re=new RegExp(strRegex);
  if (re.test(str_url)){
      return (true);
  }else{
      return (false);
  }
}

export default class Browser extends Component<any> {
  state = {
    url: 'http://www.baidu.com',
  }
  render() {
    const {url} = this.state
    return (
      <Window title="浏览器" onClose={this.props.onClose}>
        <div className={styles.warp}>
          <div className={styles.header}>
            <Input placeholder="输入网址" type='url' value={url} onChange={e => {
              this.setState({
                url: e.target.value
              })
              console.log('-----------', IsURL(url))
            }}/>
            <Button type="primary">搜索</Button>
          </div>
          <div className={styles.content}>
            {
              IsURL(url)
              ? <iframe src={url}/>
              : ''
            }            
          </div>
        </div>
      </Window>
    )
  }
}
