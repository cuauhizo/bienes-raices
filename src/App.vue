<script setup>
import { ref, watch, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useDisplay } from "vuetify";
import IrArriba from '@/components/IrArriba.vue'

const auth = useAuthStore();
const currentBreakpoint = ref("");
const { sm, md, lg, xl } = useDisplay();
const drawer = ref(false);
const group = ref(null);

onMounted(() => {
  // Set initial breakpoint value
  if (xl.value) {
    currentBreakpoint.value = "xl";
  } else if (lg.value) {
    currentBreakpoint.value = "lg";
  } else if (md.value) {
    currentBreakpoint.value = "md";
  } else if (sm.value) {
    currentBreakpoint.value = "sm";
  } else {
    currentBreakpoint.value = "xs";
  }


  // console.log('Current breakpoint:', currentBreakpoint.value);
})

watch(group, () => {
  drawer.value = false;
});

watch([sm, md, lg, xl], ([isSm, isMd, isLg, isXl]) => {
  if (isXl) {
    currentBreakpoint.value = "xl";
  } else if (isLg) {
    currentBreakpoint.value = "lg";
  } else if (isMd) {
    currentBreakpoint.value = "md";
  } else if (isSm) {
    currentBreakpoint.value = "sm";
  } else {
    currentBreakpoint.value = "xs";
  }
  // console.log('Current breakpoint:', currentBreakpoint.value);
});
</script>

<template>
  <v-card elevation="3" max-width="1200" class="mx-auto">
    <v-layout>
      <v-app-bar color="blue-darken-1">
        <v-toolbar-title>
          <v-btn :to="{ name: 'home' }"> Bienes Raices </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="currentBreakpoint === 'sm' || currentBreakpoint === 'xs'">
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </template>
        <template v-else>
          <div v-if="auth.isAuth">
            <v-btn :to="{ name: 'admin-propiedades' }"> Admin </v-btn>
            <v-btn @click="auth.logout"> Cerrar Sesión </v-btn>
          </div>
          <div v-else>
            <v-btn :to="{ name: 'home' }"> Inicio </v-btn>
            <v-btn :to="{ name: 'login' }"> Iniciar Sesión </v-btn>
          </div>
        </template>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" location="bottom" temporary>
        <v-list v-if="auth.isAuth">
          <v-list-item :to="{ name: 'admin-propiedades' }"> Admin </v-list-item>
          <v-list-item @click="auth.logout"> Cerrar Sesión </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item :to="{ name: 'home' }"> Inicio </v-list-item>
          <v-list-item :to="{ name: 'login' }"> Iniciar Sesión </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <!-- <div>
          <p>Current breakpoint: {{ currentBreakpoint }}</p>
        </div> -->
        <v-container>
          <RouterView />
          <IrArriba/>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>