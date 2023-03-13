import { h, render, shallowReactive } from 'vue'
import MessageContext from './message.vue'

let seed = 1
const instances = shallowReactive([])

const closeMessage = (instance) => {
  const idx = instances.indexOf(instance)
  if (idx === -1) return
  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}

export const getInstance = (id) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  const current = instances[idx]
  let prev
  if (idx > 0) {
    prev = instances[idx - 1]
  }
  return { current, prev }
}

export const getLastOffset = (id) => {
  const { prev } = getInstance(id)
  if (!prev) return 0
  return prev.vm.exposed.bottom.value
}

export const getOffsetOrSpace = (id, offset) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  return idx > 0 ? 16 : offset
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

  render(vnode, container)
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

const mergeOptions = (options) => {
  return typeof options === 'string' ? { message: options } : options
}

const message = (options, context) => {
  let config = mergeOptions(options)
  const instance = createMessage(config, context)
  instances.push(instance)
  return instance.handler
}
const messageTypes = ['success', 'warning', 'info', 'error']
messageTypes.forEach((type) => {
  message[type] = (options = {}) => {
    let config = mergeOptions(options)
    return message({ ...config, type }, null)
  }
})
export default message