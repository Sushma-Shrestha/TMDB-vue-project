<template>
    <div class="sidebar">
        <!-- <a href="#/" class="link">Movies</a>
        <a href="#/about" class="link">Series</a>
        <a href="#/non-existent-path" class="link">Liked</a> -->
        <a v-for="(component, path) in routes" :key="path" :href="`#${path}`" :class="{ 'active': currentView === component }" class="link">
        {{ capitalizeFirstLetter(path.slice(1)) }}
        </a>
    </div>
  <div class="content">
    <slot></slot>
</div>
</template>

<script setup>
import { ref, toRef } from 'vue'

const props = defineProps(['currentView', 'routes'])
const currentPath = toRef(props, 'currentView')

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>