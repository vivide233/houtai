<template>
  <el-container class="home-container">
    <el-header class="home-header">
        <div class="home-header-name">仁和在线销售配置后台</div>
        <el-dropdown>
          <div class="home-dropdown">
            <div>admin</div>
            <div class="home-header-icon">
              <i class="el-icon-user" />
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="home-dropdown-exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
    <el-container>
      <el-aside class="home-aside" width="230px">
      <!-- <div class="home-logo">
        <img :src="logo" />
      </div> -->
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
  color: #fff;
  justify-content: center;
  align-items: center;
  height: 100%;
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
}
.home-header {
  display: flex;
  justify-content:space-between;
  background: #20a0ff;
  padding-right: 35px;
  padding-left: 0;
  &-name{
    box-sizing: border-box;
    border-right: solid 1px #eef1f6;
    font-size: 18px;
    color: #fff;
    width: 230px;
    line-height: 60px;
    text-align: center;
  }
}
.home-menu-vertical {
  background: #eef1f6;
  height: 100%;
  border-right: 0; 
}
.home-header-icon {
  font-size: 30px;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #20a0ff;
  border-radius: 100%;
  border: 2px solid#fff;
  margin-left: 10px
}
.el-submenu .el-menu{
  background: #e4e8f1;
}
</style>


