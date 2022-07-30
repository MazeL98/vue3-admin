<!--  -->
<template>
  <div class="bar-animation-container">
    <svg class="equilizer" viewbox="0 0 128 128">
      <g>
        <rect class="bar" transform="translate(0,0)" y="10"></rect>
        <rect class="bar" transform="translate(4,0)" y="10"></rect>
        <rect class="bar" transform="translate(8,0)" y="10"></rect>
        <rect class="bar" transform="translate(12,0)" y="10"></rect>
        <rect class="bar" transform="translate(16,0)" y="10"></rect>
        <rect class="bar" transform="translate(20,0)" y="10"></rect>
        <rect class="bar" transform="translate(24,0)" y="10"></rect>
      </g>
    </svg>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss">
.bar-animation-container {
  width: 30px;
  height: 22px;
}
.equilizer {
  width: 30px;
  height: 22px;
  transform: rotate(180deg);
}

.bar {
  fill: #56c596;
  width: 3px;
  animation: equalize 7s 0s infinite normal;
}

.bar:nth-child(1) {
  animation-delay: -0.2s;
  animation-direction: reverse;
}

.bar:nth-child(2) {
  animation-delay: -1.3s;
}

.bar:nth-child(3) {
  animation-delay: -0.6s;
}

.bar:nth-child(4) {
  animation-delay: -1.1s;
  animation-direction: reverse;
}

.bar:nth-child(5) {
  animation-delay: -0.7s;
}
.bar:nth-child(6) {
  animation-delay: -1.1s;
  animation-direction: reverse;
}
.bar:nth-child(7) {
  animation-delay: -0.9s;
}
@keyframes equalize {
  0% {
    height: 60%;
  }
  4% {
    height: 50%;
  }
  8% {
    height: 40%;
  }
  12% {
    height: 30%;
  }
  16% {
    height: 20%;
  }
  20% {
    height: 30%;
  }
  24% {
    height: 40%;
  }
  28% {
    height: 10%;
  }
  32% {
    height: 40%;
  }
  36% {
    height: 60%;
  }
  40% {
    height: 20%;
  }
  44% {
    height: 40%;
  }
  48% {
    height: 70%;
  }
  52% {
    height: 30%;
  }
  56% {
    height: 10%;
  }
  60% {
    height: 30%;
  }
  64% {
    height: 50%;
  }
  68% {
    height: 60%;
  }
  72% {
    height: 70%;
  }
  76% {
    height: 80%;
  }
  80% {
    height: 70%;
  }
  84% {
    height: 60%;
  }
  88% {
    height: 50%;
  }
  92% {
    height: 60%;
  }
  96% {
    height: 70%;
  }
  100% {
    height: 80%;
  }
}
</style>
