import * as Core from './exports'
export * from './exports'
import { globalThisPolyfill } from '@designable/shared'

// window上注册Designable
if (globalThisPolyfill?.['Designable']?.['Core']) {
  // FIXME 此处的module在vite中会报错
  if (module.exports) {
    module.exports = {
      __esModule: true,
      ...globalThisPolyfill['Designable']['Core'],
    }
  }
} else {
  globalThisPolyfill['Designable'] = globalThisPolyfill['Designable'] || {}
  globalThisPolyfill['Designable'].Core = Core
}
