<template>
    <form @submit.prevent="submit">
        <!-- Select user -->
        <div class="mb-3">
            <SelectField
                :options="clients.map(client => ({ id: client.id, name: client.firstName + ' ' + client.lastName }))"
                title="Client" :emptyValue="false" :input="{ value: transactionsStore.newTransaction.form.clientId }"
                :errors="v$.clientId.$errors"
                @update="(value: number) => transactionsStore.newTransaction.form.clientId = value"
                :disable="selectDisable" />
        </div>
        <!-- Amount Input -->
        <div>
            <InputField :title="'Amount'" :input="{ value: transactionsStore.newTransaction.form.amount }"
                :errors="v$.amount.$errors" title-color="black" :type="'number'" :step="'0.01'"
                @change="(value: number) => transactionsStore.newTransaction.form.amount = value" />
        </div>
        <slot></slot>
    </form>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'
import { PropType, computed } from 'vue';
import InputField from '../ui/InputField.vue';
import { useTransactionStore } from '../../stores/TransactionStore';
import SelectField from '../ui/SelectField.vue';
import type Client from '../../types/Client';

const transactionsStore = useTransactionStore()
const props = defineProps({
    clients: { type: Array as PropType<Client[]>, required: true },
    selectDisable: { type: Boolean, default: false }
})
const emits = defineEmits(['submit']);
// Ad new client form rules
const rules = computed(() => {
    return {
        amount: { required },
        clientId: { required },
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
    } else {
        console.log('Form error')
    }
}
</script>