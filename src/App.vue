<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchLangSwitch } from '@/utils/i18n.js'

const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

watchLangSwitch(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})

if (document.getElementById('Loading')) {
  document.getElementById('Loading').remove()
}
</script>

<style></style>
