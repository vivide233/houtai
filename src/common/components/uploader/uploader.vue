<template>
  <div
    :class="classes"
    @click="onClick"
    @drop.prevent="onDrop"
    @dragover.prevent="dragOver = true"
    @dragleave.prevent="dragOver = false"
  >
    <input
      ref="fileInput"
      type="file"
      :style="{ display: 'none' }"
      :accept="accept"
      :directory="directory ? 'directory' : null"
      :webkitdirectory="directory ? 'webkitdirectory' : null"
      @change="onChange"
    />
    <slot />
  </div>
</template>

<script>
import { concat } from 'lodash'
import traverseFileTree from './traverseFileTree'
import getUid from './uid'
import attrAccept from './attr-accept'
import defaultRequest  from './request'

const prefixCls = 'cms-uploader'

export default {
  props: {
    type: {
      type: String,
      default: 'drag',
    },
    directory: Boolean,
    accept: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
    },

    action: String,
    headers: {
      type: Object,
    },
    name: {
      type: String,
      default: 'file',
    },
    withCredentials: Boolean,
    customRequest: Function,
    mergeRequest: Boolean,

    beforeTraverse: Function, // 遍历完要上传的文件列表的钩子
    beforeUpload: Function, // 每个文件的上传前置钩子
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
  },
  data () {
    return {
      isMounted: false,
      dragOver: false,
      reqs: {},
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-type-drag`]: this.type === 'drag',
          [`${prefixCls}-drag-over`]: this.type === 'drag' && this.dragOver,
        },
      ]
    },
  },

  mounted () {
    this.isMounted = true
  },
  beforeDestroy () {
    this.isMounted = false
    this.abort()
  },

  methods: {
    onClick () {
      const el = this.$refs.fileInput
      if (!el) {
        return
      }
      el.click()
    },
    onDrop (e) {
      this.dragOver = false
      const files = e.dataTransfer.files
      const items = e.dataTransfer.items
      // console.log(e)
      // console.log(files)
      // console.log(items)
      if (this.directory) {
        this.traverse(items)
      } else {
        this.traverse(files)
      }
    },
    onChange (e) {
      const files = e.target.files
      const dealArr = []
      for (const fi of files) {
        fi['uid'] = getUid()
        fi['fullPath'] = fi.webkitRelativePath
        dealArr.push(fi)
      }
      this.handleBeforeTraverse(dealArr)
    },
    async traverse (fileList) {
      let fileTargetArr = []
      const promiseArr = []
      if (this.directory) {
        const res = await Promise.all(traverseFileTree(
          fileList,
          fi => attrAccept(fi, this.accept)
        ))
        res.forEach((resolveRes) => {
          if (resolveRes instanceof Array) {
            fileTargetArr = concat(fileTargetArr, resolveRes)
          } else {
            fileTargetArr.push(resolveRes)
          }
        })
      } else {
        Array.prototype.slice.call(fileList).forEach((fi, idx) => {
          if (attrAccept(fi, this.accept)) {
            fi.uid = getUid()
            fileTargetArr.push(fi)
          }
        })
      }
      // console.log('full file arr: ', fileTargetArr)
      this.handleBeforeTraverse(fileTargetArr)
    },
    handleBeforeTraverse (fileArr) {
      if (!this.beforeTraverse) {
        return setTimeout(() => this.uploadFiles(fileArr), 0)
      }
      const before = this.beforeTraverse(fileArr)
      if (before && before.then) {
        before.then(() => {
          return this.uploadFiles(fileArr)
        }).catch(e => {
          console && console.log(e) // eslint-disable-line
        })
      } else if (before !== false) {
        setTimeout(() => this.uploadFiles(fileArr), 0)
      }
    },
    uploadFiles (files) {
      const postFiles = Array.prototype.slice.call(files)
      if (this.mergeRequest) {
        this.upload(null, postFiles)
      } else {
        postFiles.forEach((file) => {
          this.upload(file, postFiles)
        })
      }
    },
    //处理上传前置操作
    upload (file, fileList) {
      let body = file
      if (this.mergeRequest) {
        body = fileList
      }
      if (!this.beforeUpload) {
        // always async in case use react state to keep fileList
        return setTimeout(() => this.post(body), 0)
      }

      const before = this.beforeUpload(body)
      if (before && before.then) {
        before.then((processedFile) => {
          const processedFileType = Object.prototype.toString.call(processedFile)
          if (
            processedFileType === '[object File]' ||
            processedFileType === '[object Blob]'
          ) {
            return this.post(processedFile)
          }
          return this.post(body)
        }).catch(e => {
          console && console.log(e) // eslint-disable-line
        })
      } else if (before !== false) {
        setTimeout(() => this.post(body), 0)
      }
    },
    // 上传文件
    post (file) {
      if (!this.isMounted) {
        return
      }
      let data = this.data

      const onStart = this.onStart
      const onProgress = this.onProgress
      const onSuccess = this.onSuccess
      const onError = this.onError

      if (typeof data === 'function') {
        data = data(file)
      }
      new Promise(resolve => {
        const action = this.action
        if (typeof action === 'function') {
          return resolve(action(file))
        }
        resolve(action)
      }).then(action => {
        const { uid } = file
        const request = this.customRequest || defaultRequest
        this.reqs[uid] = request({
          action,
          filename: this.name,
          file,
          data,
          headers: this.headers,
          withCredentials: this.withCredentials,
          mergeRequest: this.mergeRequest,
          onProgress: onProgress ?
            (e) => {
              onProgress(e, file)
            } : null,
          onSuccess: (ret, xhr) => {
            delete this.reqs[uid]
            onSuccess && onSuccess(ret, file, xhr)
          },
          onError: (err, ret) => {
            delete this.reqs[uid]
            onError && onError(err, ret, file)
          },
        })
        onStart && onStart(file)
      })
    },
    // 清除上传请求序列
    abort (file) {
      const reqs = this.reqs
      if (file) {
        let uid = file
        if (file && file.uid) {
          uid = file.uid
        }
        if (reqs[uid]) {
          reqs[uid].abort()
          delete reqs[uid]
        }
      } else {
        Object.keys(reqs).forEach((uid) => {
          if (reqs[uid]) {
            reqs[uid].abort()
          }

          delete reqs[uid]
        })
      }
    },
  },
}
</script>

<style lang="less">
@import "~@styles/theme.less";
@import '~@styles/mixins.less';

@prefix: ~"cms-uploader";
@primary-color: #2d8cf0;

.@{prefix} {
  &-type-drag {
    position: relative;
    background: #fff;
    border: 1px dashed @THEME_BORDER_COLOR_BASE;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    transition: border-color .3s ease;
    &:hover{
        border: 1px dashed @primary-color;
    }
  }
  &-drag-over {
    border: 2px dashed @primary-color;
  }
}
</style>
