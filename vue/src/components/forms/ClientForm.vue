<template>
    <form @submit.prevent="submit">
        <!-- First name Input -->
        <div>
            <InputField :title="'First name'" :input="{ value: clientStore.newClient.form.firstName }"
                :errors="v$.firstName.$errors" title-color="black" :type="'text'" class="text-white"
                @change="(value: string) => clientStore.newClient.form.firstName = value" />
        </div>
        <!-- Last name Input -->
        <div>
            <InputField :title="'Last name'" :input="{ value: clientStore.newClient.form.lastName }"
                :errors="v$.lastName.$errors" title-color="black" :type="'text'" class="text-white"
                @change="(value: string) => clientStore.newClient.form.lastName = value" />
        </div>
        <!-- Email Input -->
        <div>
            <InputField :title="'Email Address'" :input="{ value: clientStore.newClient.form.email }"
                :errors="v$.email.$errors" title-color="black" :type="'email'" class="text-white"
                @change="(value: string) => clientStore.newClient.form.email = value" />
        </div>
        <slot></slot>
    </form>
</template>

<script setup lang="ts">
import { useClientStore } from '../../stores/ClientStore';
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'
import { computed } from 'vue';
import InputField from '../ui/InputField.vue';

const clientStore = useClientStore()
const emits = defineEmits(['submit']);
// Ad new client form rules
const rules = computed(() => {
    return {
        email: { required, email },
        firstName: { required },
        lastName: { required },
    }
});
// Create Validation with rules
const v$ = useVuelidate(rules, clientStore.newClient.form);

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