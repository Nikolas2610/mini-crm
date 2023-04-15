<template>
    <Flex class="bg-dark px-8 py-4 rounded-xl text-white">
        <slot></slot>
    </Flex>
</template>

<script setup lang="ts">
import Flex from '../wrappers/Flex.vue';
</script>