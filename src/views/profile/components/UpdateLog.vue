<!--  -->
<template>
  <el-timeline class="timeline-container">
    <el-timeline-item center timestamp="2022/7/19" placement="top">
      <el-card>
        <h4>更新Logo与英文字体</h4>
        <p>自制Logo，更换网站标题字体，更换页面中的英文字体</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item center timestamp="2022/7/15" placement="top">
      <el-card>
        <h4>更换图标</h4>
        <p>更换侧边栏图标，尽量选择面式，使风格、大小统一</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item center timestamp="2022/7/10" placement="top">
      <el-card>
        <h4>新增 Dashboard 数据可视化页面</h4>
        <p>
          增加数据总览模块，包括“月度累计收益”“今日收入”“今日支出”“今日结余”；
        </p>
        <p>增加周数据详情模块，可以查看近7日收入与支出；</p>
        <p>增加3个月内数据详情模块，点击日历即可查看该日分时段营收详情；</p>
        <p>以上内容均做国际化处理，目前支持中文与英文两种语言。</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup></script>

<style lang="scss" scoped>
.timeline-container {
  & h4 {
    margin-bottom: 15px;
  }
  p {
    margin-bottom: 7px;
  }
  ::v-deep(.el-timeline-item__timestamp) {
    margin: 18px 0 10px 4px;
  }
}
</style>
