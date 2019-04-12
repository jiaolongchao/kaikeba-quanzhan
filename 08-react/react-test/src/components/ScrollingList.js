import React, { Component } from 'react'

export default class ScrollingList extends Component {
  constructor(props){
      super(props)
      this.listRef = React.createRef();
  }
  getSnapshotBeforeUpdate(prevProps, prevState){
      //我们是否要添加新的items到列表？
      //捕捉滚动条位置，以便我们可以稍后调整滚动
      if(prevProps.list.length < this.props.list.length){
          const list = this.listRef.current;
          return list.scrollHeight - list.scrollTop
      }
      return null;
  }
  componentDidUpdate(prevProps,prevState,snapshot){
      //如果我们有snapshot值，我们加了新的items
      //调整滚动以至于这些新的items 不会将旧的items推出视图
      if(snapshot != null){
          const list = this.listRef.current;
          list.scrollTop = list.scrollHeight - snapshot;
      }
  }
  render() {
    return (
      <div ref={this.listRef}>
        <p>getSnapshotBeforeUpdate</p>
        <p>//我们是否要添加新的items到列表？
      //捕捉滚动条位置，以便我们可以稍后调整滚动</p>
      <p>getSnapshotBeforeUpdate</p>
        <p>//我们是否要添加新的items到列表？
      //捕捉滚动条位置，以便我们可以稍后调整滚动</p>
      <p>getSnapshotBeforeUpdate</p>
        <p>//我们是否要添加新的items到列表？
      //捕捉滚动条位置，以便我们可以稍后调整滚动</p>
      <p>getSnapshotBeforeUpdate</p>
        <p>//我们是否要添加新的items到列表？
      //捕捉滚动条位置，以便我们可以稍后调整滚动</p>
      <p>getSnapshotBeforeUpdate</p>
        <p>//我们是否要添加新的items到列表？
      //捕捉滚动条位置，以便我们可以稍后调整滚动</p>
      <p>getSnapshotBeforeUpdate</p>
        <p>//我们是否要添加新的items到列表？
      //捕捉滚动条位置，以便我们可以稍后调整滚动</p>
      <p>getSnapshotBeforeUpdate</p>
        <p>//我们是否要添加新的items到列表？
      //捕捉滚动条位置，以便我们可以稍后调整滚动</p>
      <p>getSnapshotBeforeUpdate</p>
        <p>//我们是否要添加新的items到列表？
      //捕捉滚动条位置，以便我们可以稍后调整滚动</p>
      </div>
    )
  }
}
