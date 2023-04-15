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
        <!-- Avatar input -->
        <div class="">
            <div class="font-semibold mb-2">Avatar Image</div>
            <Flex justify="start" :gap="4">
                <!-- Loaded image -->
                <img :src="imageScreen" class="w-20 h-20" v-if="imageScreen">
                <input id="imageFile" type="file" class="rounded-md border border-gray-300" @change="onImageChoose" />
            </Flex>
            <div v-for="error in v$.imageFile.$errors" :key="error.$uid"
                class="text-rose-700 text-base font-medium mt-1 px-2">
                {{ error.$message }}
            </div>
        </div>
        <slot></slot>
    </form>
</template>

<script setup lang="ts">
import { useClientStore } from '../../stores/ClientStore';
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'
import { computed, onMounted, ref, onUnmounted } from 'vue';
// Components import
import InputField from '../ui/InputField.vue';
import Flex from '../wrappers/Flex.vue';

// Variables
const clientStore = useClientStore()
const emits = defineEmits(['submit']);
const imageScreen = ref();

// Add new client form rules
const rules = computed(() => {
    return {
        email: { required, email },
        firstName: { required },
        lastName: { required },
        imageFile: { required },
    }
});

// Create Validation with rules
const v$ = useVuelidate(rules, clientStore.newClient.form);

// Get and load image
const onImageChoose = (ev: any) => {
    const file = ev.target.files[0];
    clientStore.newClient.form.imageName = file.name
    clientStore.newClient.form.imageFile = file;
    loadImage(file);
}

// Load image
const loadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
        imageScreen.value = reader.result
    }
    reader.readAsDataURL(file)
}

// Load the image for the edit client
onMounted(() => {
    const { imageFile } = clientStore.newClient.form;
    
    // Check the image if is a file or a URL
    if (imageFile?.constructor === File) {
        loadImage(imageFile);
    } else {
        imageScreen.value = imageFile ?? null;
    }
})

const submit = () => {
    // Validate Form 
    v$.value.$validate()
    // Check for error forms
    if (!v$.value.$error) {
        // Success Form
        emits('submit');
    }
}

onUnmounted(() => {
    // Erase form when the form is destroy
    clientStore.eraseForm();
})
</script>