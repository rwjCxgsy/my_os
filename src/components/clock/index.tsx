import React, { Component } from 'react'
import styles from "./index.module.less";
class Clock extends Component {
  state = {
    day: new Date().toLocaleString()
  }
   render() {
     const {day} = this.state
     return (
       <div className={styles.clock}>
         <span>{day.split(' ')[1].slice(2)}</span>
         <p>{day.split(' ')[0]}</p>
       </div>
     )
   }

   componentWillMount = () => {
     const {day} = this.state
     setInterval(() => {
       this.setState({
         day: new Date().toLocaleString()
       })
     }, 1000);
   }
}

 export default Clock
 