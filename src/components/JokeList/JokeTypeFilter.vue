<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  jokeTypes: string[]
  selectedType: string | null
}>()

const { jokeTypes, selectedType } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:selectedType', value: string | null): void
}>()

function selectType(type: string | null) {
  emit('update:selectedType', type)
}
</script>

<template>
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
</template>

<style scoped>
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
  flex: 1 1 auto;
  min-width: 80px;
  text-align: center;
}

.button-group button.active,
.button-group button:hover {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
