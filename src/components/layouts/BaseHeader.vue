<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})

const { circleUrl } = toRefs(state)
</script>

<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo items-center pr-3" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <el-menu-item index="0">RD Immo</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <router-link to="/" class="decoration-none">
        Liste des logements
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/applications" class="decoration-none">
        Liste des candidatures
      </router-link>
    </el-menu-item>
    <el-tooltip class="box-item" effect="dark" content="Connecté en tant que Jean">
      <div class="demo-basic--circle pl-3">
        <div class="block">
          <el-avatar :size="35" :src="circleUrl" />
        </div>
      </div>
    </el-tooltip>
  </el-menu>
</template>
