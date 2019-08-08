<template>
  <div>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
</template>
<script>
import { Button } from "element-ui";
export default {
  data: function() {
    return {
      name: "vivi"
    };
  },
  components: {
    [Button.name]: Button,
  }
};
</script>
<style scoped>
</style>


