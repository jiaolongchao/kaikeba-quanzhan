import React, { Component } from 'react'

export default class Clock extends Component {
  state = {
      data : new Date()
  }  
  componentDidMount(){
      this.timer = setInterval(() => {
          this.setState({data:new Date()});
      }, 1000);
  }
  
  componentWillUnmount(){
      clearInterval(this.timer);
  }
  render() {
    return (
      <div>
        {this.state.data.toLocaleTimeString()}
      </div>
    )
  }
}
