<script setup>
import { ref, computed, watch } from 'vue'
import Movies from './views/Movies.vue'
import Series from './views/Series.vue'
import NotFound from './views/NotFound.vue'
import Sidebar from './components/Sidebar.vue'
import Details from './views/Details.vue'
import Liked from './views/Liked.vue'

const routes = {
  '/': Movies,
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

// const props = ref({})

const currentView = computed(() => {
  if (currentPath.value === '') {
    return Movies
  }
  // props.value = currentPath.value.includes('?') ? Object.fromEntries(new URLSearchParams(currentPath.value.slice(1).split('?')[1])) : {};
  const path = currentPath.value.slice(1).split('?')[0]
  const component = routes[path] || NotFound
  return component;
})



</script>

<template>
  <sidebar :currentView="currentView" :routes="menus" v-cloak>
    <template v-slot:default>
      <component :is="currentView" />
    </template>
  </sidebar>
</template>