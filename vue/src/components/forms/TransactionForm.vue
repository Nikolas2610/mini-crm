<template>
    <form @submit.prevent="submit">
        <!-- Select user -->
        <div class="mb-3">
            <SelectField
                :options="clients.map(client => ({ id: client.id, name: client.firstName + ' ' + client.lastName }))"
                title="Client" :emptyValue="false" :input="{ value: transactionsStore.newTransaction.form.client_id }"
                :errors="v$.client_id.$errors"
                @update="(value: number) => transactionsStore.newTransaction.form.client_id = value"
                :disable="selectDisable" />
        </div>
        <!-- Amount Input -->
        <div>
            <InputField :title="'Amount'" :input="{ value: transactionsStore.newTransaction.form.amount }"
                :errors="v$.amount.$errors" title-color="black" :type="'number'" :step="'0.01'"
                @change="(value: number) => transactionsStore.newTransaction.form.amount = value" />
        </div>
        <!-- Transaction Date input -->
        <div>
            <InputField :title="'Transaction Date'" :input="{ value: transactionsStore.newTransaction.form.transaction_date }"
                :errors="v$.transaction_date.$errors" title-color="black" :type="'date'"
                @change="(value: any) => transactionsStore.newTransaction.form.transaction_date = value" />
        </div>
        <slot></slot>
    </form>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'
import { PropType, computed, onUnmounted } from 'vue';
import { useTransactionStore } from '../../stores/TransactionStore';
import type { SelectClient } from '../../types/SelectClient';
// Components import
import InputField from '../ui/InputField.vue';
import SelectField from '../ui/SelectField.vue';

// Variables
const transactionsStore = useTransactionStore()
const props = defineProps({
    clients: { type: Array as PropType<SelectClient[]>, required: true },
    selectDisable: { type: Boolean, default: false }
})
const emits = defineEmits(['submit']);

// Add new transaction form rules
const rules = computed(() => {
    return {
        amount: { required },
        client_id: { required },
        transaction_date: { required },
    }
});

// Create Validation with rules
const v$ = useVuelidate(rules, transactionsStore.newTransaction.form);

const submit = () => {
    // Validate Form 
    v$.value.$validate()
    // Check for error forms
    if (!v$.value.$error) {
        // Success Form
        emits('submit');
    }
}

// Erase form on destroy
onUnmounted(() => {
    transactionsStore.eraseForm();
})
</script>