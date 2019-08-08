<template>
  <el-container class="container">
    <el-header class="header">我是head</el-header>
    <el-container class="content-container">
      <el-aside class="aside-container">
        <el-menu default-active="/page1" class="el-menu-vertical-demo" :router="true">
          <el-submenu index="/">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>nav1</span>
            </template>
            <el-menu-item index="/page1">page1</el-menu-item>
            <el-menu-item index="/page2">page2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="aside-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem
} from "element-ui";
export default {
  data: function() {
    return {
      name: "vivi"
    };
  },
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Aside.name]: Aside,
    [Main.name]: Main,
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.header {
  background: pink;
}
.aside-container {
  background: blueviolet;
}
.aside-main {
  background: greenyellow;
}
.content-container {
}
</style>


