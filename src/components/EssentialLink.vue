<template>
<q-item clickable :to="link">
  <q-item-section v-if="icon" side class="q-mr-sm flex items-center justify-center">
    <q-icon :name="icon" size="28px" />
  </q-item-section>

  <q-item-section class="flex flex-col justify-center">
    <q-item-label>{{ title }}</q-item-label>
    <q-item-label caption>{{ caption }}</q-item-label>
  </q-item-section>
</q-item>

</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string
  caption?: string
  link?: string
  icon?: string
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '/',
  icon: '',
})
</script>
