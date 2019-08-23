import Uploader from './uploader'
import defaultRequest  from './request'

Uploader.upload = function (options) {
  return defaultRequest(options)
}

export default Uploader
