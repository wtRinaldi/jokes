<script setup lang="ts">
import { ref, computed } from 'vue'
import { useJokesStore } from '../stores/joke-store'

const jokesStore = useJokesStore()
const selectedType = ref<string | null>(null)

// Get all jokes from store
const jokes = computed(() => {
  if (!selectedType.value) return jokesStore.jokes
  return jokesStore.jokes.filter(j => j.type === selectedType.value)
})

// Get unique joke types from store
const jokeTypes = computed(() => {
  const types = jokesStore.jokes.map(j => j.type)
  return Array.from(new Set(types))
})

// Select a type
function selectType(type: string | null) {
  selectedType.value = type
}
</script>

<template>
  <div class="joke-container">
    <!-- Button group -->
    <div class="button-group">
      <button
        :class="{ active: selectedType === null }"
        @click="selectType(null)"
      >
        All
      </button>
      <button
        v-for="type in jokeTypes"
        :key="type"
        :class="{ active: selectedType === type }"
        @click="selectType(type)"
      >
        {{ type }}
      </button>
    </div>

    <!-- Scrollable joke list -->
    <q-scroll-area class="scroll-area q-pa-sm">
      <div class="joke-list">
        <div v-for="joke in jokes" :key="joke.id" class="joke-item">
          <p><strong>{{ joke.setup }}</strong></p>
          <p>{{ joke.punchline }}</p>
          <hr />
        </div>
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

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1rem;
  justify-content: center;
}

.button-group button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  flex: 1 1 auto; /* buttons grow/shrink to fit row */
  min-width: 80px;
  text-align: center;
}

.button-group button.active,
.button-group button:hover {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.scroll-area {
  flex: 1;
  min-height: 200px;
  max-height: 100%;
}

.joke-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}

.joke-item {
  padding: 0.5rem 0;
}

/* Small screen adjustments */
@media (max-width: 600px) {
  .button-group button {
    min-width: 60px;
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
  .joke-container {
    padding: 0.5rem;
  }
}
</style>
