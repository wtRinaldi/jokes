<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useJokesStore } from '../stores/joke-store'
import type { Joke } from './models'

const jokesStore = useJokesStore()

const displayedText = ref('')
const showPunchline = ref(false)
const currentJoke = ref<Joke | null>(null)

function nextJoke() {
  const joke = jokesStore.getRandomJoke()
  if (!joke) return

  currentJoke.value = joke
  displayedText.value = ''
  showPunchline.value = false

  let i = 0
  const text = joke.setup
  const interval = setInterval(() => {
    displayedText.value += text[i]
    i++
    if (i === text.length) {
      clearInterval(interval)
      setTimeout(() => {
        showPunchline.value = true
      }, 1000)
    }
  }, 50)
}

onMounted(() => {
  nextJoke()
})
</script>

<template>
  <div class="q-pa-md flex flex-center column">
    <q-card class="q-pa-lg q-ma-md" flat bordered>
      <q-card-section>
        <div class="text-h6">{{ displayedText }}</div>
      </q-card-section>

      <q-card-section v-if="showPunchline">
        <div class="text-subtitle1 text-primary">
          {{ currentJoke?.punchline }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn color="primary" label="Next Joke" @click="nextJoke" />
      </q-card-actions>
    </q-card>
  </div>
</template>
