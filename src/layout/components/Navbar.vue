<!--  -->
<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger class="left-item hamburger"></hamburger>
      <breadcrumb
        id="guide-breadcrumb"
        class="left-item breadcrumb"
      ></breadcrumb>
    </div>
    <div class="right-menu">
      <guide class="guide right-item"></guide>
      <header-search class="header-search right-item"></header-search>
      <fullscreen class="fullscreen right-item"></fullscreen>
      <theme-select class="theme-select right-item"></theme-select>
      <lang-select class="lang-select right-item"></lang-select>
      <div class="profile right-item">
        <el-dropdown
          trigger="click"
          @command="handleCommand"
          class="profile-dropdown"
          size="default"
        >
          <div class="avatar-wrapper">
            <el-avatar
              shape="circle"
              :size="40"
              :src="$store.getters.userInfo.avatar"
            ></el-avatar>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/">
                <el-dropdown-item>{{
                  $t('msg.navBar.home')
                }}</el-dropdown-item></router-link
              >
              <a target="_blank" href="https://github.com/MazeL98/vue3-admin">
                <el-dropdown-item>{{
                  $t('msg.navBar.sourceCode')
                }}</el-dropdown-item>
              </a>
              <a target="_blank" href="http://www.mazel98.com">
                <el-dropdown-item>{{ $t('msg.navBar.blog') }}</el-dropdown-item>
              </a>
              <el-dropdown-item divided @click="logout">{{
                $t('msg.navBar.logout')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import store from '@/store'
import Hamburger from '@/components/Hamburger.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Guide from '@/components/guide/Guide.vue'
import HeaderSearch from '@/components/HeaderSearch.vue'
import LangSelect from '@/components/LangSelect.vue'
import ThemeSelect from '@/components/themeSelect/index.vue'
import Fullscreen from '@/components/Fullscreen.vue'

const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  background: #fff;
  box-shadow: 0px 1px 3px 1px rgba(208, 208, 208, 0.3);

  .left-menu {
    display: flex;
    align-items: center;
    float: left;

    & .left-item {
      float: left;
    }

    .breadcrumb {
      margin-left: 10px;
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    text-align: center;

    .right-item {
      float: left;
      padding: 0 8px;
      cursor: pointer;
    }

    .guide {
      ::v-deep(.guide-icon) {
        padding-top: 2px;
        font-size: 25px;
        vertical-align: middle;
      }
    }

    .header-search {
      ::v-deep(.header-search-icon) {
        font-size: 21px;
        vertical-align: middle;
      }
    }
    .fullscreen {
      ::v-deep(.fullscreen-icon) {
        font-size: 18px;
        padding-top: 1px;
        vertical-align: middle;
        color: currentColor;
      }
    }
    .theme-select {
      ::v-deep(.theme-change-icon) {
        font-size: 20px;
        vertical-align: middle;
      }
    }
    .lang-select {
      ::v-deep(.language-icon) {
        font-size: 24px;
        vertical-align: middle;
      }
    }

    .profile {
      margin: 5px 10px 5px 0px;

      ::v-deep(.avatar-wrapper) {
        .el-avatar {
          margin-right: 10px;
        }
        ::v-deep(.el-icon) {
          vertical-align: bottom;
        }
      }
    }
  }
}
</style>
