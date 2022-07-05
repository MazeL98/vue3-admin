<!--  -->
<template>
  <div
    class="pan-thumb-container"
    :style="{ 'z-index': zIndex, width: width, height: height }"
  >
    <div class="pan-info">
      <div class="pan-role-container">
        <slot />
      </div>
    </div>
    <div class="pan-thumb" :style="{ backgroundImage: `url(${image})` }"></div>
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
.pan-thumb-container {
  position: relative;
  display: inline-block;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
  }
  .pan-role-container {
    padding: 25px;
    font-size: 14px;
    text-align: center;
  }
  .pan-thumb {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    background-size: cover;
    background-position: center;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
}

.pan-thumb-container:hover .pan-thumb {
  transform: rotate(-110deg);
}

.pan-thumb-container:hover p {
  color: rgb(35, 35, 35);
  padding: 10px 5px;
  margin: 20px 20px;
  font-size: 14px;
}
</style>
