// 创建虚拟dom
export function createVNode (vtype, type, props) {
  const vnode = { vtype, type, props }
  return vnode // 创建虚拟节点
}

// vdom -> dom
export function initVNode (vnode) {
  const { vtype } = vnode
  if (!vtype) {
    return document.createTextNode(vnode)
  }
  if (vtype === 1) {
    return createElment(vnode)
  } else if (vtype == 2) {
    return createClassComp(vnode)
  } else if (vtype == 3) {
    return cretaeFuncComp(vnode)
  }
}

function createElment (vnode) {
  const { type, props } = vnode
  const node = document.createElement(type)
  const { key, children, ...rest } = props
  
  Object.keys(rest).forEach(k => {
    if (k == 'className') {
      node.setAttribute('class', rest[k])
    } else if (k.startsWith('on')) {
      const event = k.toLowerCase()
      node[event] = rest[k]
    } else if (k === 'style') {
      const style = Object.keys(rest[k])
        .map(s => {
          return s + ':' + rest[k][s]
        })
        .join(';')
      node.setAttribute('style', style)
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
  const com = new type(props)
  const render = com.render()
  return initVNode(render)
}



function cretaeFuncComp (vnode) {
  const { type, props } = vnode
  const vdom = type(props)
  return initVNode(vdom)
}



