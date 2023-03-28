import instance from './instance.js'
import { withInstallFunction } from '@/utils/useTool.js'

export const Message = withInstallFunction(instance, '$message')
export default Message
export * from './instance'
