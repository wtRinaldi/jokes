<script setup lang="ts">
import { ref, computed } from 'vue'
import { useJokesStore } from '../../stores/joke-store'
import JokeListItem from './JokeListItem.vue'
import JokeTypeFilter from './JokeTypeFilter.vue'

const jokesStore = useJokesStore()
const selectedType = ref<string | null>(null)

// Get all jokes from store
const jokes = computed(() => {
  if (!selectedType.value) return jokesStore.jokes
  return jokesStore.jokes.filter(j => j.type === selectedType.value)
})

</script>

<template>
  <div class="joke-container">
    <!-- Button group -->
    <joke-type-filter     
      :joke-types="jokesStore.types"
      v-model:selectedType="selectedType"
    />

    <!-- Scrollable joke list -->
  <q-scroll-area class="scroll-area">
    <div class="joke-list q-mr-md q-my-md">
      <joke-list-item v-for="joke in jokes" :key="joke.id" :joke="joke" />
    </div>
  </q-scroll-area>
  </div>
</template>

<style scoped>
.joke-container {
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.scroll-area {
  flex: 1;
  min-height: 200px;
  max-height: 100%;
}

</style>
