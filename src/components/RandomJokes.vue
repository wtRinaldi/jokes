<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useJokesStore } from '../stores/joke-store'
import type { Joke } from './models'

const jokesStore = useJokesStore()

const displayedText = ref('')
const showPunchline = ref(false)
const currentJoke = ref<Joke | null>(null)
let typingInterval: ReturnType<typeof setInterval> | null = null

function nextJoke() {
  // Stop any existing typing
  if (typingInterval) clearInterval(typingInterval)
  
  const joke = jokesStore.getRandomJoke()
  if (!joke) return

  currentJoke.value = joke
  displayedText.value = ''
  showPunchline.value = false

  let i = 0
  const text = joke.setup
  typingInterval = setInterval(() => {
    displayedText.value += text[i]
    i++
    if (i === text.length) {
      clearInterval(typingInterval!)
      typingInterval = null
      setTimeout(() => {
        showPunchline.value = true
      }, 500)
    }
  }, 40)
}

onMounted(() => {
  nextJoke()
})
</script>

<template>
  <div class="q-pa-md flex flex-center column">
    <q-card class="joke-card" flat>
      <div class="joke-content">
        <!-- Setup -->
        <q-card-section class="text-center">
          <div class="setup">{{ displayedText }}</div>
        </q-card-section>

        <q-separator />

        <!-- Punchline with fade -->
        <q-card-section class="text-center">
          <transition name="fade">
            <div v-if="showPunchline" class="punchline">
              {{ currentJoke?.punchline }}
            </div>
          </transition>
        </q-card-section>
      </div>
    </q-card>
    <q-btn color="primary" label="Next Joke" @click="nextJoke" />
  </div>

</template>

<style lang="scss" scoped>
.joke-card {
  max-width: 500px;
  min-height: 350px;
  width: 100%;
  position: relative;

  .joke-content {
    min-height: 150px; // reserve space for setup + punchline
  }

  .setup {
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 0.25rem;
    line-height: 2.4rem;
    margin-bottom: 0.5rem;
  }

  .punchline {
    font-size: 1.5rem;
    font-style: italic;
    color: var(--q-primary);
    margin-top: 0.5rem;
  }

  .actions-fixed {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.actions-fixed {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  .q-btn {
    white-space: nowrap;  // prevent text wrap
    min-width: 120px;     // ensure consistent width
  }
}

/* Fade transition for punchline */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
