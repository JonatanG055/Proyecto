<template>
  <v-app>
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
/* Puedes agregar estilos globales aquí */
</style>
