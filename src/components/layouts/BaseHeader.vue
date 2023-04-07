<script lang="ts" setup>
</script>

<template>
  <el-menu class="el-menu-demo items-center" mode="horizontal" :ellipsis="false">
    <p class="text-lg ml-4 my-0"><span class="font-bold text-primary">RD</span> Immobilier</p>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <router-link to="/" class="decoration-none">
        Liste des logements
      </router-link>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title><el-icon>
          <Tools />
        </el-icon> Administration</template>
      <el-menu-item index="2-1">
        <router-link to="/admin/applications" class="decoration-none">
          <el-icon>
            <Management />
          </el-icon>
          Liste des candidatures
        </router-link>
      </el-menu-item>
      <el-menu-item index="2-2">
        <router-link to="/admin/accomodations" class="decoration-none">
          <el-icon>
            <HomeFilled />
          </el-icon>
        Gestion des logements
      </router-link>
    </el-menu-item>
  </el-sub-menu>
</el-menu></template>
