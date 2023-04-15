<template>
    <div class="mx-auto">
        <div class="flex flex-col">
            <div class="overflow-x-auto shadow-md sm:rounded-lg">
                <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden ">
                        <table class="min-w-full divide-y table-fixed divide-gray-700">
                            <thead class="bg-gray-700">
                                <tr>
                                    <th scope="col" v-for="(title, index) in tableHeaders" :key="index"
                                        class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400">
                                        {{ title }}
                                    </th>
                                    <th scope="col" class="p-4" v-if="actions">
                                        <span class="sr-only">actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y bg-dark divide-gray-700">
                                <slot></slot>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Flex class="p-2 rounded-lg" v-if="pagination">
        <v-pagination v-model="pagination.current_page" :pages="pagination.last_page"
            :range-size="pagination.per_page" active-color="#4E9F3D" @update:modelValue="(value) => $emit('onPageChange', value)" />
    </Flex>
</template>

<script setup lang="ts">
import Flex from '../wrappers/Flex.vue';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { PropType } from 'vue';
import type { Pagination } from '../../types/Pagination';

const props = defineProps({
    tableHeaders: { type: Array<String>, required: true },
    actions: { type: Boolean, default: false },
    pagination: {type: Object as PropType<Pagination> }
})
const emits = defineEmits(['onPageChange'])
</script>