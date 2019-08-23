<template>
  <el-container class="home-container">
    <el-aside class="home-aside" width="230px">
      <div class="home-logo">
        <img :src="logo" />
      </div>
      <el-menu default-active="/page1" class="home-menu-vertical" :router="true">
        <el-submenu index="/">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>配置管理</span>
          </template>
          <el-menu-item index="/page1">配置上传</el-menu-item>
          <el-menu-item index="/page2">page2</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="home-header">
        <el-dropdown>
          <div class="home-dropdown">
            <div class="home-header-icon">
            <i class="el-icon-user" />
          </div>
          <div class="home-header-name">用户1</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="home-dropdown-exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
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
  MenuItem,
  Dropdown,
  DropdownItem,
  DropdownMenu
} from "element-ui";
import logo from "assets/img/logo.jpg";
export default {
  data: function() {
    return {
      logo,
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
    [MenuItem.name]: MenuItem,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu
  }
};
</script>
<style lang="less">
.home-dropdown{
  display: flex;
  cursor: pointer;
  color: #409EFF;
}
.home-dropdown-exit{
  width: 60px;
  text-align: center;
}
.home-container {
  width: 100%;
  height: 100%;
}
.home-aside {
  box-sizing: border-box;
  padding-top: 230px;
  position: relative;
}
.home-logo {
  box-sizing: border-box;
  position: absolute;
  height: 230px;
  width: 100%;
  top: 0;
  left: 0;
  border-right: solid 1px #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 50%;
    width: 50%;
    object-fit: cover;
  }
}
.home-header {
  display: flex;
  justify-content: flex-end;
  border-bottom: 5px solid #72bff3;
}
.home-menu-vertical {
  height: 100%;
}
.home-header-icon {
  font-size: 30px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: white;
}
.home-header-name {
  line-height: 50px;
}
</style>


