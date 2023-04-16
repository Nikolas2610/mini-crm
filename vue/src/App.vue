<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import DefaultLayout from './components/layouts/DefaultLayout.vue';
import { useUserStore } from './stores/UserStore';
import PreLoader from './components/PreLoader.vue'

const loading = ref(false);
const userStore = useUserStore();

onBeforeMount(async () => {
  // Check store if has token
  const token = localStorage.getItem("token");
  // If has token get the user 
  if (token) {
    loading.value = true
    await userStore._getUser(token).then(() => {
      loading.value = false
    });
  }
})
</script>

<template>
  <div class="overflow-y-hidden overflow-x-hidden">
    <!-- Render the App after check if the is user log -->
    <DefaultLayout v-if="!loading" />
  </div>
</template>
