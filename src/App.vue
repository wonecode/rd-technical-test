<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>

<style>
</style>
