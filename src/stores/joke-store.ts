import { defineStore } from 'pinia'
import axios from 'axios'
import type { Joke } from 'src/components/models'
import { Notify } from 'quasar'

console.log(Notify)
export const useJokesStore = defineStore('jokes', {
  state: () => ({
    jokes: [] as Joke[],
    types: [] as string[],   // <-- new state for joke types
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
        Notify.create({
          message: 'Unable to fetch jokes. No Joke.',
          color: 'negative',
          position: 'top'
        })
      } finally {
        this.loading = false
      }
    },

    async fetchJokeTypes() {
      this.loading = true
      this.error = null
      try {
        const { data } = await axios.get(
          'https://official-joke-api.appspot.com/types'
        )
        this.types = data
      } catch (err) {
        if (err instanceof Error) {
          this.error = err.message
        } else {
          this.error = 'Failed to fetch joke types'
        }
        Notify.create({
          message: 'Unable to fetch joke types. Not good!',
          color: 'negative',
          position: 'top'
        })
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

await useJokesStore().fetchJokeTypes()
await useJokesStore().fetchJokes()
