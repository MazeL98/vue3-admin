<!--  -->
<template>
  <div class="project-card-container">
    <el-card>
      <template #header>
        <span>{{ $t('msg.profile.introduce') }}</span>
      </template>
      <div class="user-profile">
        <div class="box-center">
          <pan-thumb
            :image="$store.getters.userInfo.avatar"
            :width="'100px'"
            :height="'100px'"
            :hoverable="false"
          >
          </pan-thumb>
        </div>
        <div class="box-center">
          <div class="username">{{ $store.getters.userInfo.username }}</div>
          <div class="user-role">{{ $store.getters.userInfo.title }}</div>
        </div>
      </div>
      <div class="profile-bio">
        <div class="profile-bio-section">
          <div class="profile-bio-sec-header">
            <svg-icon icon="introduce"></svg-icon>
            <span>{{ $t('msg.profile.projectIntroduction') }}</span>
          </div>
          <div class="profile-bio-sec-body">
            {{ $t('msg.profile.muted') }}
          </div>
        </div>
        <div class="profile-bio-section">
          <div class="profile-bio-sec-header">
            <svg-icon icon="reward"></svg-icon>
            <span>{{ $t('msg.profile.projectFeature') }}</span>
          </div>
          <div class="profile-bio-sec-body">
            <div
              v-for="item in props.feature"
              :key="item.title"
              class="feature-item"
            >
              <div>{{ item.title }}</div>
              <el-progress :percentage="item.percentage" status="success" />
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import PanThumb from '@/components/PanThumb.vue'

const props = defineProps({
  feature: {
    type: Array
  }
})
</script>

<style lang="scss" scoped>
.project-card-container {
  margin-right: 20px;

  .user-profile {
    margin-bottom: 25px;
    & .box-center {
      text-align: center;
      & .username {
        font-weight: 600;
        margin: 10px 0 3px;
      }
      & .user-role {
        font-size: 14px;
      }
    }
  }

  .profile-bio {
    color: #606266;
    .profile-bio-section {
      margin-top: 20px;
      .profile-bio-sec-header {
        font-weight: 600;
        padding-bottom: 10px;
        border-bottom: 1px solid #dfe6ec;
        & span {
          margin-left: 10px;
        }
      }
      .profile-bio-sec-body {
        padding: 10px 0;
        font-size: 14px;
      }
    }
  }
}

.feature-item {
  margin: 8px 0;
  & > div {
    margin-bottom: 3px;
  }
}
</style>
