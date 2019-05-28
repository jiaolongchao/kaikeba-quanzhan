import { createVNode } from './jlcvdom'
// 编写第一个函数，实现一个createElement
function createElement (type, props, ...children) {
  props.children = children
  let vtype
  if (typeof type === 'string') {
    vtype = 1
  } else if (typeof type === 'function') {
    if (type.isClassComponent) {
      vtype = 2 // 类组件
    } else {
      vtype = 3 // 函数组件
    }
  }
  // 创建虚拟dom
  return createVNode(vtype, type, props)
}

export default { createElement }

export class Component {
  // 区分某个组件是函数
  static isClassComponent = true

  constructor (props) {
    this.props = props
    this.state = {}
  }
  setState () {}
}
