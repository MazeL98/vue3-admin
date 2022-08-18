<!--  -->
<template>
  <div class="user-info-container">
    <el-card>
      <div class="user-profile">
        <div class="box-right">
          <svg-icon icon="setting"></svg-icon>
        </div>
        <div class="box-center">
          <pan-thumb
            :image="$store.getters.userInfo.avatar"
            width="90px"
            height="90px"
            :hoverable="false"
          >
          </pan-thumb>
        </div>
        <div class="box-center">
          <div class="user-name">
            Hello, {{ $store.getters.userInfo.username }}!
          </div>
          <div class="user-role">{{ $store.getters.userInfo.title }}</div>
          <div class="user-contact">954712345@gmail.com</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {} from 'vue'
import PanThumb from '@/components/PanThumb.vue'
import { useStore } from 'vuex'
const store = useStore()
const mainColor = store.getters.mainColor
</script>

<style lang="scss" scoped>
.user-info-container {
  ::v-deep(.el-card__body) {
    padding: 30px 20px 20px;
  }
}
.user-profile {
  margin-bottom: 20px;
  & .user-name {
    font-weight: 600;
    font-size: 18px;
    margin: 15px 0;
    font-family: 'Lato';
  }
  .user-role,
  .user-contact {
    font-size: 14px;
    color: #949494;
    margin-bottom: 3px;
    font-family: 'Lato';
  }
}
.box-center {
  position: relative;
  text-align: center;
}
.box-right {
  text-align: right;
  ::v-deep(.svg-icon) {
    font-size: 20px;
    fill: v-bind(mainColor);
    cursor: pointer;
  }
}
</style>
