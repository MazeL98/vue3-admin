<!--  -->
<template>
  <div class="about-container">
    <el-row>
      <el-col :span="8">
        <card icon="stack" title="最新技术栈">
          基于最新的Vue 3.2 版本，使用RFC script
          setup语法标准，结合最新的ElementPlus UI 框架，重构 Vue-Element-Admin
          经典后台管理系统。
        </card>
      </el-col>
      <el-col :span="8">
        <card icon="role-permission" title="权限管理">
          基于“用户->角色->权限”逻辑，实行二级权限体系：
          1、页面权限：后台返回当前用户对应角色的权限路由表，借助
          router.addRoutes 动态挂载到 router 上。
          2、功能权限：自定义权限指令，控制当前用户权限范围内功能按钮的显示与隐藏。
        </card></el-col
      >
      <el-col :span="8">
        <card icon="component" title="组件化开发">
          1、对于项目内可能会复用的组件单独封装以便高效利用。2、对于单页面组件内较复杂的功能抽取出来，提高代码可读性。
        </card></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <card icon="theme-custom" title="定制换肤">
          用户可通过颜色选择器更换任意主题颜色。通过“标记-替换”的方式更换UI框架中的颜色体系。
        </card>
      </el-col>
      <el-col :span="8">
        <card icon="mock" title="Mock数据">
          由于本项目以前端为主，后端数据无论开发环境和线上环境均使用 express.js
          + Mock.js 模拟生成。为了使数据尽可能贴近真实，使用 dayjs +
          node-schedule 实现每日刷新。</card
        >
      </el-col>
      <el-col :span="8">
        <card icon="visualization" title="数据可视化">
          引入 echarts.js
          呈现数据可视化页面，相较于以往版本，在模拟数据基础上做到了图标之间的数据联动。
        </card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <card icon="language-setting" title="国际化处理">
          采用 vue-i18n 的国际化处理方案，目前包括“中文”和“英文”两种系统语言。
        </card>
      </el-col>
      <el-col :span="8">
        <card icon="optimization" title="性能优化">
          使用配置Gzip、第三方库按需引入、web字体优化、CDN托管第三方库等诸多手段将网页首屏响应速度从40s提高到13s左右。
        </card>
      </el-col>
      <el-col :span="8">
        <card icon="others" title="其它" class="others-card">
          <ul>
            <li>ESLint + Git Hooks</li>
            <li>新手引导</li>
            <li>动态面包屑</li>
            <li>Tags View</li>
            <li>SVG 图标统一化管理</li>
            <li>Excel 文件导入导出</li>
            <li>富文本 + Markdown 编辑器</li>
            <li>表格的动态展示和拖拽</li>
          </ul>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {} from 'vue'
import Card from './Card.vue'
</script>

<style lang="scss" scoped>
.about-container {
  margin-top: 30px;
  .el-row {
    margin-bottom: 30px;
  }
  .el-col-8 {
    display: flex;
    justify-content: center;
  }
}
</style>
