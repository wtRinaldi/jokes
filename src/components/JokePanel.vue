<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useJokesStore } from '../stores/joke-store'
import type { Joke } from './models'

const jokesStore = useJokesStore()
const jokes = ref<(Joke & { flipped?: boolean })[]>([])

function fetchJokes(count = 12) {
  jokes.value = []
  for (let i = 0; i < count; i++) {
    const joke = jokesStore.getRandomJoke()
    if (joke) jokes.value.push({ ...joke, flipped: false })
  }
}

function flipCard(joke: Joke & { flipped?: boolean }) {
  jokes.value.forEach(j => {
    if (j !== joke) j.flipped = false
  })
  joke.flipped = !joke.flipped
}

onMounted(() => {
  fetchJokes()
})
</script>

<template>
  <div class="q-pa-md">
    <div class="joke-grid">
      <div 
        v-for="(joke, index) in jokes" 
        :key="index" 
        class="flip-card" 
        @click="flipCard(joke)"
      >
        <div class="flip-card-inner" :class="{ flipped: joke.flipped }">
          <!-- Front side -->
          <div class="flip-card-front q-pa-md">
            <div class="setup">{{ joke.setup }}</div>
          </div>

          <!-- Back side -->
          <div class="flip-card-back q-pa-md">
            <div class="punchline">{{ joke.punchline }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-mt-md flex justify-center">
      <q-btn color="primary" label="Refresh Jokes" @click="fetchJokes()" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.joke-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.flip-card {
  background-color: transparent;
  width: 250px;
  height: 150px;
  perspective: 1000px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 1px solid #ccc;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.flip-card-front {
  background-color: #ffffff;
  color: #000;
}

.flip-card-back {
  background-color: var(--q-primary);
  color: white;
  transform: rotateY(180deg);
}

.setup {
  font-weight: bold;
  font-size: 1.1rem;
}

.punchline {
  font-style: italic;
  font-size: 1rem;
}
</style>
