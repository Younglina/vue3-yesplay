import { withInstallFunction } from '@/utils/useTool.js'

import instance from './instance.js'

export const Message = withInstallFunction(instance, '$message')
export default Message
export * from './instance'
