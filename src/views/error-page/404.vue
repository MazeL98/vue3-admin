<!--  -->
<template>
  <div class="cont_principal">
    <div class="cont_error">
      <h1>Oops</h1>
      <p>The Page you're looking for isn't here.</p>
      <el-button @click="onClick" class="back-button">Go Back</el-button>
    </div>
    <div class="cont_aura_1"></div>
    <div class="cont_aura_2"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

onMounted(() => {
  document.querySelector('.cont_principal').className =
    'cont_principal cont_error_active'
})
const router = useRouter()
const onClick = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
* {
  margin: 0px auto;
  padding: 0px;
  text-align: center;
}
.cont_principal {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #d4d9ed !important;
}
.cont_error {
  position: absolute;
  width: 100%;
  height: 300px;
  top: 50%;
  margin-top: -200px;
}

.cont_error > h1 {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 150px;
  color: #fff;
  position: relative;
  left: -100%;
  transition: all 0.5s;
}

.cont_error > p {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 24px;
  letter-spacing: 5px;
  color: #9294ae;
  position: relative;
  left: 100%;
  transition: all 0.5s;
  transition-delay: 0.5s;
  -webkit-transition: all 0.5s;
  -webkit-transition-delay: 0.5s;
  margin-top: 10px;
}

.back-button {
  padding: 5px 10px;
  font-size: 16px;
  color: #8a65df;
  margin-top: 60px;
  :active {
    outline: none;
  }
}

.cont_aura_1 {
  position: absolute;
  width: 300px;
  height: 120%;
  top: 25px;
  right: -340px;
  background-color: #8a65df;
  box-shadow: 0px 0px 60px 20px rgba(137, 100, 222, 0.5);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_aura_2 {
  position: absolute;
  width: 100%;
  height: 300px;
  right: -10%;
  bottom: -301px;
  background-color: #8b65e4;
  box-shadow: 0px 0px 60px 10px rgba(131, 95, 214, 0.5),
    0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  z-index: 5;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.cont_error_active > .cont_error > h1 {
  left: 0%;
}
.cont_error_active > .cont_error > p {
  left: 0%;
}

.cont_error_active > .cont_aura_2 {
  animation-name: animation_error_2;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  transform: rotate(-20deg);
}
.cont_error_active > .cont_aura_1 {
  transform: rotate(20deg);
  right: -170px;
  animation-name: animation_error_1;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@-webkit-keyframes animation_error_1 {
  from {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  to {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
}
@-o-keyframes animation_error_1 {
  from {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  to {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
}
@-moz-keyframes animation_error_1 {
  from {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  to {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
}
@keyframes animation_error_1 {
  from {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  to {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
}

@-webkit-keyframes animation_error_2 {
  from {
    -webkit-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }
  to {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
}
@-o-keyframes animation_error_2 {
  from {
    -webkit-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }
  to {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
}

@-moz-keyframes animation_error_2 {
  from {
    -webkit-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }
  to {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
}
@keyframes animation_error_2 {
  from {
    -webkit-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }
  to {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
}
</style>
