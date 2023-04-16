<template>
    <Teleport to="#modal">
        <Transition name="modal">
            <Flex class="bg-dark bg-opacity-90 fixed top-0 left-0 w-full h-full z-20" v-if="modalOpen">
                <div class="bg-white relative rounded-xl shadow lg:w-2/4 w-11/12" ref="modal">
                    <Flex justify="between" class="border-b-2 border-gray-500 px-4">
                        <div class="p-4 text-xl">
                            <slot name="modal_header"></slot>
                        </div>
                        <button
                            class="cursor-pointer text-2xl border border-transparent hover:bg-primary rounded-3xl p-2 transition duration-500 hover:text-white"
                            @click="$emit('closeModal')">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                class="bi bi-x h-6 w-6" viewBox="0 0 16 16">
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </Flex>

                    <!-- Modal Content -->
                    <Container class="px-8">
                        <slot></slot>
                    </Container>
                </div>
            </Flex>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
// Components import
import Container from '../wrappers/Container.vue';
import Flex from '../wrappers/Flex.vue';

// Variables
const emit = defineEmits(['closeModal']);
const props = defineProps<{
    modalOpen: Boolean
}>()
const modal = ref(null)

// Vueuse function
onClickOutside(modal, () => {
    emit('closeModal')
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all .5s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
</style>