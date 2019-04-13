import React, { Component } from 'react'
import styles from './info.module.less'
import { parseQuery } from '../../../utils'

export default class Info extends Component {

  url = parseQuery('url') || ''
  state = {
    html: ''
  }
  render() {
    return (
      <div className={styles.info} dangerouslySetInnerHTML={{__html: this.state.html}} />
    )
  }

  async getHTML () {
    const d = fetch(decodeURIComponent(this.url))
    d.then(data => {
      console.log(data)
      return data.text()
    }).then(html => {
      let content = html.match(/<article.+id="J_article"[\s\S]+?<\/article>/gi)
      if (content) {
        this.setState({
          html: content[0]
        })
        console.log(this)
      }
    })
  }

  componentWillMount () {
    this.getHTML()
  }
}
