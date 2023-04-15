<template>
    <div class="flex items-center justify-center">
        <img :src="loader" alt="loading">
    </div>
</template>

<script setup lang="ts">
import loader from '../assets/loader.gif'
</script>