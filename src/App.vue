<script lang="ts">
export default {
  name: 'App',
}
</script>

<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    
    <router-view />
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.element-plus-logo {
  width: 50%;
}
</style>
