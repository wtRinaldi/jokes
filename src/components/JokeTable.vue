<script setup lang="ts">
import { useJokesStore } from '../stores/joke-store'
import { ref } from 'vue'
import type { QTableColumn } from 'quasar'

const jokesStore = useJokesStore()
const { jokes } = jokesStore

const columns = ref<QTableColumn[]>([
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'type', label: 'Type', field: 'type', align: 'left', sortable: true },
  { name: 'setup', label: 'Setup', field: 'setup', align: 'left', sortable: false },
  { name: 'punchline', label: 'Punchline', field: 'punchline', align: 'left', sortable: false },
])
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Jokes"
      :rows="jokes"
      :columns="columns"
      row-key="id"
      :loading="jokesStore.loading"
      flat
      bordered
    >
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
</template>
