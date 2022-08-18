<!--  -->
<template>
  <div class="box">
    <div
      class="pan-thumb"
      :style="{
        backgroundImage: `url(${image})`,
        'z-index': zIndex,
        width: width,
        height: height
      }"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  image: {
    type: String
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  }
})
</script>

<style lang="scss" scoped>
.box {
  display: inline-block;
  border: 3px solid #dbdfe8;
  padding: 5px;
  border-radius: 50%;
  // cursor: pointer;

  .pan-thumb {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    box-shadow: 0px 0px 3px 2px rgba(194, 194, 194, 0.3);
  }
}
</style>
