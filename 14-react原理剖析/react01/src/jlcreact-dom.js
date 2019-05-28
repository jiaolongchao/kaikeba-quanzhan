import { initVNode } from './jlcvdom'
function render (vnode, container) {
  const node = initVNode(vnode)
  container.appendChild(node)
}

export default { render }



