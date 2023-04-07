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
</style>
