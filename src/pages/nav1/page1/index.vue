<template>
  <div>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <h2 class="mystyle">hahha</h2>
    <img :src="img" alt="">
  </div>
</template>
<script>
import { Button } from "element-ui"
import img from 'assets/img/amd.jpeg'
export default {
  data: function() {
    return {
      name: "vivi",
      img,
    };
  },
  components: {
    [Button.name]: Button,
  }
}
</script>
<style>
  .mystyle{
    background: red;
    transform: scale(2)
  }
</style>



