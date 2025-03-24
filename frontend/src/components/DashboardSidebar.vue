<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';
import logo from '@/assets/images/logo.png';

const route = useRoute();

const isActive = (name) => {
    return route.name === name;
};

const authStore = useAuthStore();
</script>

<template>
    <div id="kt_app_sidebar" class="app-sidebar flex-column print-display-none" data-kt-drawer="true" data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="225px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">

        <!--begin::Logo-->
        <div class="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
            <!--begin::Logo image-->
            <a href="#" class="d-flex mt-3">
                <img alt="Logo" :src="logo" class="h-40px app-sidebar-logo-default">
                <img alt="Logo" :src="logo" class="h-40px app-sidebar-logo-minimize">
            </a>
            <!--end::Logo image-->
            <!--begin::Sidebar toggle-->
            <!--begin::Minimized sidebar setup:
        if (isset($_COOKIE["sidebar_minimize_state"]) && $_COOKIE["sidebar_minimize_state"] === "on") {
            1. "src/js/layout/sidebar.js" adds "sidebar_minimize_state" cookie value to save the sidebar minimize state.
            2. Set data-kt-app-sidebar-minimize="on" attribute for body tag.
            3. Set data-kt-toggle-state="active" attribute to the toggle element with "kt_app_sidebar_toggle" id.
            4. Add "active" class to to sidebar toggle element with "kt_app_sidebar_toggle" id.
        }-->
            <div id="kt_app_sidebar_toggle" class="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate " data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body" data-kt-toggle-name="app-sidebar-minimize">

                <i class="fal fa-chevrons-left fs-4 rotate-180"></i>
            </div>
            <!--end::Sidebar toggle-->
        </div>
        <!--end::Logo-->

        <!--begin::sidebar menu-->
        <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
            <!--begin::Menu wrapper-->
            <div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper hover-scroll-overlay-y my-5" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer" data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px" data-kt-scroll-save-state="true">
                <!--begin::Menu-->
                <div class="menu menu-column menu-rounded menu-sub-indention px-3" id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
                    <!--begin:Menu item-->
                    <div class="menu-item">
                        <!--begin:Menu link-->
                        <RouterLink class="menu-link" :to="{ name: 'tickets' }" :class="{ 'active': isActive('tickets') }" v-if="authStore.user.roles[0].name === 'customer'">
                            <span class="menu-icon">
                                <i class="ki-duotone ki-note-2 fs-2">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                    <span class="path3"></span>
                                    <span class="path4"></span>
                                </i>
                            </span>
                            <span class="menu-title">My Tickets</span>
                        </RouterLink>
                        <!--end:Menu link-->
                    </div>
                    <!--end:Menu item-->
                    <!--begin:Menu item-->
                    <div class="menu-item" v-if="authStore.user.roles[0].name === 'admin'">
                        <!--begin:Menu link-->
                        <RouterLink class="menu-link" :to="{ name: 'tickets' }" :class="{ 'active': isActive('tickets') }">
                            <span class="menu-icon">
                                <i class="ki-duotone ki-note-2 fs-2">
                                    <span class="path1"></span>
                                    <span class="path2"></span>
                                    <span class="path3"></span>
                                    <span class="path4"></span>
                                </i>
                            </span>
                            <span class="menu-title">All Tickets</span>
                        </RouterLink>
                        <!--end:Menu link-->
                    </div>
                    <!--end:Menu item-->
                </div>
                <!--end::Menu-->
            </div>
            <!--end::Menu wrapper-->
        </div>
        <!--end::sidebar menu-->

        <!--begin::Footer-->
        <div class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6" id="kt_app_sidebar_footer">
            <form method="POST" 
                data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" 
                @submit.prevent="authStore.logout" title="Logout">
                <button class="btn btn-danger w-100">
                    <span class="text-white fs-6">Logout</span>
                </button>
            </form>
        </div>
        <!--end::Footer-->
        <!--end::Footer-->
    </div>

</template>