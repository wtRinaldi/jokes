import { defineStore } from 'pinia'
import axios from 'axios'
import type { Joke } from 'src/components/models'

export const useJokesStore = defineStore('jokes', {
  state: () => ({
    jokes: [] as Joke[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    totalJokes: (state) => state.jokes.length,
  },

  actions: {
    async fetchJokes() {
      this.loading = true
      this.error = null
      try {
        const { data } = await axios.get(
          'https://official-joke-api.appspot.com/jokes/random/451'
        )
        this.jokes = data
      } catch (err) {
        if (err instanceof Error) {
          this.error = err.message
        } else {
          this.error = 'Failed to fetch jokes'
        }
      } finally {
        this.loading = false
      }
    },
    getRandomJoke(): Joke | null {
      if (!this.jokes.length) return null
      return this.jokes[Math.floor(Math.random() * this.jokes.length)] || null
    }
  },
})

// Automatically fetch jokes as soon as the store is imported
await useJokesStore().fetchJokes()
