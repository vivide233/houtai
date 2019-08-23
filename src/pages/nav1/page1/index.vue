<template>
  <div>
    <uplaoder />
  </div>
</template>

<script>
import {Upload} from 'element-ui';
import { Uplaoder } from '@/components'
export default {
  name: "integral-config",
  data() {
    return {
      url: "/osp/fileUpload/upload"
    };
  },
  components: {
    [Upload.name]: Upload,
    uplaoder: Uplaoder
  },
  methods: {
    async beforeUpload() {
      const result = await this.$prompt("请输入上传路径", "提示", {
        confirmButtonText: "上传",
        cancelButtonText: "取消",
        inputPattern: /^\/(\w+\/?)+$/,
        inputErrorMessage: "路径格式不正确",
        inputValue: this.url
      })
        .then(({ value }) => {
          this.url = value;
          return true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消上传"
          });
          return false;
        });
      return result;
    }
  }
};
</script>

<style scoped>
</style>