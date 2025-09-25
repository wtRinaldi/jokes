import { defineStore } from 'pinia'
import axios from 'axios'
import type { Joke } from 'src/components/models'
import { Notify } from 'quasar'

// Extend Joke type with favorite
export interface JokeWithFavorite extends Joke {
  favorite?: boolean
}

export const useJokesStore = defineStore('jokes', {
  state: () => ({
    jokes: [] as JokeWithFavorite[],
    types: [] as string[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    totalJokes: (state) => state.jokes.length,
    favoriteJokes: (state) => state.jokes.filter(j => j.favorite),
    // getter that works like a function: jokesStore.isFavorite(id)
    isFavorite: (state) => {
      return (id: number) => {
        const joke = state.jokes.find(j => j.id === id)
        return joke?.favorite === true
      }
    }
  },

  actions: {
    async fetchJokes() {
      this.loading = true
      this.error = null
      try {
        const { data } = await axios.get(
          'https://official-joke-api.appspot.com/jokes/random/451'
        )
        // add favorite flag
        this.jokes = data.map((joke: Joke) => ({
          ...joke,
          favorite: false,
        }))
      } catch (err) {
        if (err instanceof Error) {
          this.error = err.message
        } else {
          this.error = 'Failed to fetch jokes'
        }
        Notify.create({
          message: 'Unable to fetch jokes. No Joke.',
          color: 'negative',
          position: 'top',
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
          position: 'top',
        })
      } finally {
        this.loading = false
      }
    },

    getRandomJoke(): JokeWithFavorite | null {
      if (!this.jokes.length) return null
      return (
        this.jokes[Math.floor(Math.random() * this.jokes.length)] || null
      )
    },

    toggleFavorite(id: number) {
      const joke = this.jokes.find(j => j.id === id)
      if (joke) {
        joke.favorite = !joke.favorite
      }
    },
  },
})
