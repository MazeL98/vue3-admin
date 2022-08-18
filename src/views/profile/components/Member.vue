<!--  -->
<template>
  <div class="member-container">
    <el-card>
      <template #header>
        <span class="member-title">{{ $t('msg.profile.memberTitle') }}</span>
      </template>
      <div class="member-item box-center">
        <el-avatar
          shape="circle"
          :size="50"
          src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
        ></el-avatar>
        <div class="item-content">
          <div class="item-name">Jake</div>
          <div class="item-role">
            <span>Frontend developer</span>
          </div>
          <div class="item-contact">
            <svg-icon icon="mail" class="member-mail"></svg-icon>
            <span>jake1027@gmail.com</span>
          </div>
        </div>
      </div>
      <div class="member-item box-center">
        <el-avatar
          shape="circle"
          :size="50"
          src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
        ></el-avatar>
        <div class="item-content">
          <div class="item-name">Peralta</div>
          <div class="item-role">
            <span>Frontend developer</span>
          </div>
          <div class="item-contact">
            <svg-icon icon="mail" class="member-mail"></svg-icon>
            <span>peralta0913@yahoo.com</span>
          </div>
        </div>
      </div>
      <div class="member-item box-center">
        <el-avatar
          shape="circle"
          :size="50"
          src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
        ></el-avatar>
        <div class="item-content">
          <div class="item-name">Boyle</div>
          <div class="item-role">
            <span>Backend developer</span>
          </div>
          <div class="item-contact">
            <svg-icon icon="mail" class="member-mail"></svg-icon>
            <span>boyle0621@gmail.com</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.member-container {
  margin-top: 15px;
  font-family: 'Lato';
  ::v-deep(.el-card__header) {
    border-bottom: 0;
    padding: 20px 20px 10px;
  }
  ::v-deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    padding: 10px 20px 20px;
  }
}
.member-title {
  font-size: 24px;
  font-family: 'Lato';
  font-weight: bold;
}
.member-item {
  display: flex;
  padding: 25px 0 25px;
  border-bottom: 1px solid #f1f1f1;
}
.item-content {
  margin-left: 20px;
}
.item-name {
  display: inline-block;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 2px;
}
// .item-detail {
//   display: flex;
//   align-items: center;

// }
.item-role span,
.item-contact span {
  font-size: 14px;
  margin-left: 5px;
}
.item-role span {
  color: #949494;
}

.item-role {
  display: inline-block;
  margin-left: 10px;
}
.item-contact {
  display: flex;
}
</style>
