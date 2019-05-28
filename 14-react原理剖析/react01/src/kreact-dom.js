import { initVNode } from './kvdom'

function render (vnode, container) {
  const node = initVNode(vnode)
  container.appendChild(node)
  // container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`
}

export default { render }
