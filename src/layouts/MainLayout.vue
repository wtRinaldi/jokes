<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'All Jokes',
    caption: 'search jokes',
    icon: 'table_view',
    link: '/'
  },
  {
    title: 'Random Joke',
    caption: 'get a random joke',
    icon: 'casino',
    link: '/random'
  },
  {
    title: 'Joke List',
    caption: 'get list of jokes',
    icon: 'web',
    link: '/list'
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Jokes
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list class="q-ml-lg">
        <q-item-label
          header
        >
          Joke pages
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


