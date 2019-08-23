<template>
  <div class="full-uploader">
    <div class="file-list-area">
      <BaseUploader
        :action="action"
        :headers="headers"
        :data="uploaderData"
        :name="uploaderName"
        directory
        mergeRequest
        :beforeTraverse="beforeTraverse"
        :onSuccess="handleUploadSuccess"
        :onError="handleUploadError"
      >
        <div style="padding: 20px 0;color:">
            <i class="el-icon-upload"></i>
          <p>点击选择文件(夹) 或 拖拽文件(夹)至此 进行上传</p>
        </div>
      </BaseUploader>
      <Spin fix v-if="uploading" />
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
// import { cookies, localStorage } from '@common/utils'
import { BaseUploader } from '@components'

const maxFileSize = 1000 // 文件大小限制(m)
const maxFilesSizeReal = maxFileSize * 1024 * 1024 // 实际文件大小限制(b)

export default {
  components: { BaseUploader },
  props: {
    rootPath: String,
    rootTitle: String,
    value: String,
    maxSize: Number,
    default: maxFilesSizeReal,
  },
  data () {
    return {
      currentPath: '',
      pathInit: false,
      tempPath: '',

      modalVisible: false,
      loadingTree: false,

      modalFavor: false,
      favorDesc: '',

      action: '/ftcms-app/v1/fileUpload/upload',
      headers: {
        // 'Authorization': cookies.getAuthorization(),
      },
      uploaderName: 'uploadFile',

      uploading: false,
    }
  },
  computed: {
    uploaderData () {
      return { path: this.currentPath }
    },
  },
  watch: {
    currentPath () {
      if (this.currentPath !== '') {
        this.pathInit = true
      }
    },
    value () {
      this.currentPath = this.value
    },
  },

  mounted () {
    this.currentPath = this.value
  },

  methods: {
    // 显示弹窗
    showModal () {
      this.modalVisible = true
    },
    hideModal () {
      this.modalVisible = false
    },
    // 上传路径选择
    handlePathSelect (target) {
      this.tempPath = target.path || ''
    },
    // 上传路径设定
    handlePathSet () {
      this.currentPath = this.tempPath
      this.hideModal()
    },
    beforeTraverse (fileList) {
      return new Promise((resolve, reject) => {
        if (!fileList.length) {
          this.$Modal.warning({
            title: '提示',
            content: '待上传文件列表为空！',
          })
        } else {
          let fullSize = 0
          fileList.forEach(fi => {
            fullSize += fi.size
          })
          if (fullSize > maxFilesSizeReal) {
            this.$Message.error(`单次文件上传不能超过${maxFileSize}M`)
            reject()
            return
          }
          this.$Modal.confirm({
            title: '操作确认',
            content: `
<br/>  上传路径：<strong>${this.currentPath}</strong>
<br/>  文件数量：<strong>${fileList.length}</strong>
<br/>  文件体积：<strong>${fullSize}b</strong>
<br/>确认进行此次操作吗？`,
            onOk: () => {
              resolve()
              this.uploading = true
            },
            onCancel: () => {
              reject()
            },
          })
        }
      })
    },
    handleUploadSuccess (res) {
      this.uploading = false
      console.log(res)
      if (res && res.code === 'Y') {
        this.$Notice.success({ title: '上传成功', desc: res.body })
      } else if (res) {
        this.$Notice.error({ title: '上传失败', desc: res.body })
      } else {
        this.handleUploadError()
      }
    },
    handleUploadError (res) {
      this.uploading = false
      this.$Notice.success({
        title: '上传失败',
        desc: res.body,
        duration: 0,
      })
    },
    // 增加收藏夹
    showModalFavor () {
      this.modalFavor = true
    },
    submitFavorCreate () {
      const currentPath = this.currentPath
      const favorDesc = this.favorDesc
      if (!favorDesc || favorDesc === '') {
        this.$Message.warning('收藏描述不能为空')
      } else {
        // 不查重，直接添加
        this.$Modal.confirm({
          title: '操作确认',
          content: `
添加path收藏：
<br/> <strong>${favorDesc}</strong>
<br/> <strong>${currentPath}</strong>
`,
          onOk: () => {
            const strList = localStorage.get('pathFavor')
            const realList = JSON.parse(strList) || []
            console.log(realList)
            realList.push({
              rootPath: this.rootPath,
              path: currentPath,
              desc: favorDesc,
            })
            localStorage.set('pathFavor', JSON.stringify(realList))
            this.hideModalFavor()
            this.pathInit = false
            this.$emit('on-addFavor')
          },
        })
      }
    },
    // 关闭收藏弹窗
    hideModalFavor () {
      this.modalFavor = false
      this.favorDesc = ''
    },
  },
}
</script>


<style lang="less">
@import "~@styles/theme.less";
@import '~@styles/mixins.less';

.full-uploader {
  position: relative;
  border: 1px solid @THEME_BORDER_COLOR_BASE;
  border-radius: 3px;
  width: 400px;
  .file-list-area {
    min-height: 56px;
    padding: @THEME_PAD_VER @THEME_PAD_HOR;
  }
  .el-icon-upload{
    font-size: 67px;
    color: #c0c4cc;
    margin: 40px 0 16px;
    line-height: 50px;
  }
}
</style>
