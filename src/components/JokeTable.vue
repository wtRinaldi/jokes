<script setup lang="ts">
import { useJokesStore } from '../stores/joke-store'
import { ref, computed } from 'vue'
import type { QTableColumn } from 'quasar'

const jokesStore = useJokesStore()
const { jokes } = jokesStore

const columns = ref<QTableColumn[]>([
  { name: 'type', label: 'Type', field: 'type', align: 'left', sortable: true, style: 'width: 120px' },
  { name: 'setup', label: 'Setup', field: 'setup', align: 'left', sortable: false, style: 'width: 40%' },
  { name: 'punchline', label: 'Punchline', field: 'punchline', align: 'left', sortable: false, style: 'width: 40%' },
])

const pagination = ref({
  page: 1,
  rowsPerPage: 25,
})

const search = ref('')
const selectedType = ref<string | null>(null)

// Filter rows based on search + selected type
const filteredRows = computed(() => {
  let rows = jokes

  if (selectedType.value) {
    rows = rows.filter(j => j.type === selectedType.value)
  }

  if (search.value) {
    const queryString = search.value.toLowerCase()
    rows = rows.filter(
      joke =>
        joke.setup.toLowerCase().includes(queryString) ||
        joke.punchline.toLowerCase().includes(queryString)
    )
  }

  return rows
})
</script>

<template>
  <div class="q-pa-md full-width sm:bg-primary">

    <q-table
      title="Jokes"
      :rows="filteredRows"
      :columns="columns"
      v-model:pagination="pagination"
      row-key="id"
      :loading="jokesStore.loading"
      flat
      bordered
      class="fixed-table"
    >
      <!-- Top slot with search & type filter -->
      <template v-slot:top>
        <div class="column sm:row sm:items-center full-width q-gutter-sm md:bg-primary">
          <q-select
            v-model="selectedType"
            :options="jokesStore.types"
            placeholder="Filter by type"
            clearable
            outlined
            class="col"
          />

          <q-input
            v-model="search"
            debounce="300"
            placeholder="Search jokes..."
            clearable
            outlined
            class="col"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

      </template>

      <template v-slot:body-cell-setup="props">
        <q-td :props="props">
          {{ props.row.setup }}
        </q-td>
      </template>

      <template v-slot:body-cell-punchline="props">
        <q-td :props="props">
          <q-chip color="secondary" text-color="white">
            {{ props.row.punchline }}
          </q-chip>
        </q-td>
      </template>
    </q-table>

    <div v-if="jokesStore.error" class="text-negative q-mt-md">
      Error: {{ jokesStore.error }}
    </div>
  </div>
        <div class="test"></div>
</template>

<style scoped>
  .fixed-table table {
    table-layout: fixed;
  }

  .filter-input {
    max-width: 350px;
  }

  
</style>
