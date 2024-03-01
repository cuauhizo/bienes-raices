<template>
  <button @click="scrollToTop" v-if="showButton" class="go-top-button">
        <v-icon icon="mdi-chevron-up" />
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showButton = ref(false);

onMounted(() => {
  // Mostrar el botón cuando se desplaza hacia abajo más de 100px
  window.addEventListener('scroll', checkScrollPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScrollPosition);
});

function checkScrollPosition() {
  showButton.value = window.scrollY > 20;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>
.go-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
}

.go-top-button:hover {
  background-color: #0056b3;
}

</style>
