import { createVNode } from './kvdom'

// 编写第一个函数，实现一个createElement
function createElement (type, props, ...children) {
  // console.log(arguments);
  props.children = children
  delete props.__source
  // 对vtype组件类型判断
  let vtype
  if (typeof type === 'string') {
    vtype = 1 // 原来组件
  } else if (typeof type === 'function') {
    if (type.isClassComponent) {
      vtype = 2 // 类组件
    } else {
      vtype = 3 // 函数组件
    }
  }
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
