// vdom => dom
// diff
// vtype元素类型： 1-html 元素 2-类组件 3-函数组件
export function createVNode (vtype, type, props) {
  // 创建虚拟节点
  const vnode = { vtype, type, props }
  return vnode
}

// vdom -> dom
export function initVNode (vnode) {
  const { vtype } = vnode
  if (!vtype) {
    // 文本节点
    return document.createTextNode(vnode)
  }
  if (vtype === 1) {
    // 原生组件
    return createElment(vnode)
  } else if (vtype === 2) {
    // 类组件
    return createClassComp(vnode)
  } else if (vtype === 3) {
    // 函数组件
    return createFuncComp(vnode)
  }
}

function createElment (vnode) {
  const { type, props } = vnode
  const node = document.createElement(type)

  const { key, children, ...rest } = props
  Object.keys(rest).forEach(k => {
    // 处理特殊className htmlFor
    if (k === 'className') {
      node.setAttribute('class', rest[k])
    } else if (k === 'htmlFor') {
      node.setAttribute('for', rest[k])
    } else if (k === 'style' && typeof rest[k] === 'object') {
      const style = Object.keys(rest[k])
        .map(s => {
          return s + ':' + rest[k][s]
        })
        .join(';')
      node.setAttribute(k, style)
    } else if (k.startsWith("on")) {
      const event = k.toLowerCase();
      node[event] = rest[k]
    } else {
      node.setAttribute(k, rest[k])
    }
  })

  // 递归子元素
  children.forEach(c => {
    node.appendChild(initVNode(c))
  })
  return node
}
function createClassComp (vnode) {
  const { type, props } = vnode
  const component = new type(props)
  const render = component.render()
  return initVNode(render)
}
function createFuncComp (vnode) {
  const { type, props } = vnode
  const vdom = type(props)
  return initVNode(vdom)
}
