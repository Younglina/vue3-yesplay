import { h, render } from 'vue'
import MessageContext from './message.vue'

let seed = 1
const instances = []

const closeMessage = (instance) => {
  const idx = instances.indexOf(instance)
  console.log(idx,'idx')
  if (idx === -1) return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}

const createMessage = (
  options,
  context
) => {
  const id = `message_${seed++}`
  const userOnClose = options.onClose

  const container = document.createElement('div')
  const appendTo = document.body
  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose?.()
      closeMessage(instance)
    },
    onDestroy: () => {
      render(null, container)
    },
  }
  const vnode = h(
    MessageContext,
    props
  )
  vnode.appContext = context || message._context

  console.log(vnode,container,'container')
  render(vnode, container)
  console.log(options,'options')
  appendTo.appendChild(container.firstElementChild)

  const vm = vnode.component

  const handler = {
    close: () => {
      vm.exposed.visible.value = false
    },
  }

  const instance = {
    id,
    vnode,
    vm,
    handler,
    props: props,
  }

  return instance
}

const message = (options, context) => {
  let config = typeof options === 'string'? {message: options} : options
  const instance = createMessage(config, context)
  instances.push(instance)
  console.log(instances)
  return instance.handler
}

export default message