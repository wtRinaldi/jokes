<script setup lang="ts">
import type { Joke } from '../models'

defineProps<{
  joke: Joke
}>()
</script>

<template>
  <div class="joke-item">
    <p><strong>{{ joke.setup }}</strong></p>
    <p>{{ joke.punchline }}</p>
    <hr />
  </div>
</template>

<style scoped>
.joke-item {
  margin-bottom: 1rem;
}
</style>
