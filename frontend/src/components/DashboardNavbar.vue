<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>
<template>
    <div id="kt_app_header" class="app-header print-display-none">
        <!--begin::Header container-->
        <div class="app-container  container-fluid d-flex align-items-stretch justify-content-between " id="kt_app_header_container">

            <!--begin::Sidebar mobile toggle-->
            <div class="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" title="Show sidebar menu">
                <div class="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
                    <i class="fa-light fa-bars fs-3"></i>
                </div>
            </div>
            <!--end::Sidebar mobile toggle-->


            <!--begin::Mobile logo-->
            <div class="d-flex align-items-center flex-lg-grow-0">
                <a href="" class="d-lg-none">
                    <img alt="Logo" src="" class="theme-light-show h-30px">
                    <img alt="Logo" src="" class="theme-dark-show h-30px">
                </a>
            </div>
            <!--end::Mobile logo-->

            <!--begin::Header wrapper-->
            <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
                <div class="app-header-menu app-header-mobile-drawer align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="app-header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="250px" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_app_header_menu_toggle" data-kt-swapper="true" data-kt-swapper-mode="{default: 'append', lg: 'prepend'}" data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}">
                    <!--begin::Menu-->
                    <div class="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0" id="kt_app_header_menu" data-kt-menu="true">

                    </div>
                </div>
                <!--begin::Navbar-->
                <div class="app-navbar flex-shrink-0">
                    <div class="d-flex justify-content-center align-items-center app-navbar-item ms-1 ms-md-3" >
                        <p class="text-muted fs-6 me-4 mb-0 mt-0">{{ authStore.user.name }}</p>
                        <!--begin::Menu wrapper-->
                        <div class="cursor-pointer symbol symbol-circle symbol-30px symbol-md-40px" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                            <div class="symbol-label fs-2 fw-semibold bg-primary text-inverse-primary">{{ authStore.user.name[0] }}</div>
                        </div>
                        <!--end::Menu wrapper-->
                    </div>
                </div>
                <!--end::Navbar-->
            </div>
            <!--end::Header wrapper-->
        </div>
        <!--end::Header container-->
    </div>
</template>

<style scoped>
.navbar {
    height: 60px;
}
</style>