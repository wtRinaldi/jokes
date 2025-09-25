<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useJokesStore } from './stores/joke-store';

const jokesStore = useJokesStore()

onMounted(async () => {
  await Promise.all([
    jokesStore.fetchJokeTypes(),
    jokesStore.fetchJokes()
  ])
})
</script>
