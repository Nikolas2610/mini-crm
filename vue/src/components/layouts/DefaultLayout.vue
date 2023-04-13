<template>
    <NavBar />
    <main class="h-screen overflow-y-auto pt-14">
        <RouterView></RouterView>
    </main>
</template>

<script setup lang="ts">
import NavBar from '../navbar/NavBar.vue';

</script>

<style scoped>

</style>