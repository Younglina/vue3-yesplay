import MenuContext from './menu.vue'
import { h, render } from 'vue'

let curInstance = null
let seed = 1
const createMenu = (e, data) => {
  if(curInstance){
    curInstance.destroy()
  }
  curInstance = null
  let id = seed++
  const container = document.createElement('div')
  const appendTo = document.body
  const props = {
    data,
    onClose: () => {
      curInstance.destroy()
    },
  }
  const vnode = h(
    MenuContext,
    props
  )
  render(vnode, container)
  appendTo.appendChild(container.firstElementChild) // 需要先渲染，才能拿到offsetWidth

  const curMenu = vnode.el
  const { offsetWidth } = curMenu // 取出curMenu的宽度
  const { clientWidth } = appendTo // 获取body的可视区域的宽度
  const { clientX, clientY } = e // 取出右键点击时的坐标
  const leftOrRight = clientWidth - clientX > offsetWidth ? "left" : "right" // 如果越界就换方向，设置的是组件的left或者right属性
  const offsetLeft = Math.abs(clientWidth - clientX) // 可视区-右键点击的x值,x值可能比clientWidth大

  curMenu.style.top = `${clientY}px`
  curMenu.style[leftOrRight] = leftOrRight === "left" ? `${clientX + 20}px` : `${offsetLeft}px`

  const vm = vnode.component

  const instance = {
    id,
    vm,
    destroy: () => {
      render(null, container)
    },
  }
  curInstance = instance
  return instance

}

const contextMenu = (e, data) => {
  const instance = createMenu(e, data)
  return instance
}

export default contextMenu