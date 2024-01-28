<script setup>
import { ref, computed, watch } from 'vue'
import Movies from './components/Movies.vue'
import Series from './components/Series.vue'
import NotFound from './components/NotFound.vue'
import Sidebar from './components/Sidebar.vue'
import Details from './components/Details.vue'
import Liked from './components/Liked.vue'

const routes = {
  '/movies': Movies,
  '/series': Series,
  '/details': Details,
  '/non-existent-path': NotFound,
  '/liked': Liked
}

const menus = {
  '/movies': Movies,
  '/series': Series,
  '/liked': Liked
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const props = ref({})

const currentView = computed(() => {
  props.value = currentPath.value.includes('?') ? Object.fromEntries(new URLSearchParams(currentPath.value.slice(1).split('?')[1])) : {};
  const path = currentPath.value.slice(1).split('?')[0]
  const component = routes[path] || NotFound
  return component;
})



</script>

<template>
  <sidebar :currentView="currentView" :routes="menus">
    <template v-slot:default>
      <component :is="currentView" v-bind="props" />
    </template>
  </sidebar>
</template>