<script setup>
    import { useAuthStore } from '@/stores/auth';
    import { storeToRefs } from 'pinia';
    import { reactive } from 'vue';
    import logo from '@/assets/images/logo.png';
    import { onMounted } from 'vue';

    const { authenticate } = useAuthStore();
    const { errors } = storeToRefs(useAuthStore());

    const form = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    onMounted(() => {
        form.name = '';
        form.email = '';
        form.password = '';
        form.password_confirmation = '';
        errors.value = {};
    });
</script>

<template>
    <!--begin::Form-->
    <form @submit.prevent="authenticate('register', form)" class="form w-100" novalidate="novalidate" action="#">
        <!--begin::Heading-->
        <div class="text-center mb-11">
            <img class=" mb-5" alt="Logo" :src="logo" style="width: 250px; object-fit:contain">
    
            <!--begin::Subtitle-->
            <div class="text-gray-500 fw-semibold fs-6 mt-4">
                Sign Up to Customer Support System
            </div>
            <!--end::Subtitle--->
        </div>
        <!--begin::Heading-->

        <!--begin::Input group--->
        <div class="fv-row mb-8">
            <!--begin::Name-->
            <input v-model="form.name" type="text" placeholder="Name" name="name" autocomplete="off" class="form-control bg-transparent"/>
            <!--end::Name-->
            
            <!--begin::Error-->
            <div v-if="errors.name" class="fv-plugins-message-container">
                <div data-field="name" data-validator="notEmpty" class="fv-help-block">{{ errors.name[0] }}</div>
            </div>
        </div>
        <!--end::Input group--->
            
    
        <!--begin::Input group--->
        <div class="fv-row mb-8">
            <!--begin::Email-->
            <input v-model="form.email" type="text" placeholder="Email" name="email" autocomplete="off" class="form-control bg-transparent"/> 
            <!--end::Email-->

            <!--begin::Error-->
            <div v-if="errors.email" class="fv-plugins-message-container">
                <div data-field="email" data-validator="notEmpty" class="fv-help-block">{{ errors.email[0] }}</div>
            </div>
        </div>
    
        <!--end::Input group--->
        <div class="fv-row mb-8">    
            <!--begin::Password-->
            <input v-model="form.password" type="password" placeholder="Password" name="password" autocomplete="off" class="form-control bg-transparent"/>
            <!--end::Password-->

            <!--begin::Error-->
            <div v-if="errors.password" class="fv-plugins-message-container">
                <div data-field="password" data-validator="notEmpty" class="fv-help-block">{{ errors.password[0] }}</div>
            </div>
        </div>
        <!--end::Input group--->

        <!--begin::Input group--->
        <div class="fv-row mb-3">    
            <!--begin::Password confirmation-->
            <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password" name="password_confirmation" autocomplete="off" class="form-control bg-transparent"/>
            <!--end::Password confirmation-->

            <!--begin::Error-->
            <div v-if="errors.password_confirmation" class="fv-plugins-message-container">
                <div data-field="password_confirmation" data-validator="notEmpty" class="fv-help-block">{{ errors.password_confirmation[0] }}</div>
            </div>
        </div>
        <!--end::Input group--->
    
        <!--begin::Submit button-->
        <div class="d-grid mb-10 mt-10">
            <button type="submit" id="submit-button" class="btn btn-warning">
                
                <!--begin::Indicator label-->
                <span class="indicator-label">
                    Sign Up
                </span>
                <!--end::Indicator label-->
                
                <!--begin::Indicator progress-->
                <span class="indicator-progress">
                    Please wait...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
                <!--end::Indicator progress-->
            </button>
        </div>
        <!--end::Submit button-->
    
        <!--begin::login-->
        <div class="text-gray-500 text-center fw-semibold fs-6">
            Already have an account?
    
            <RouterLink :to="{name: 'login'}" class="link-warning fw-bolder">
                Login
            </RouterLink>
        </div>
        <!--end::login-->
    </form>
    <!--end::Form--> 
</template>