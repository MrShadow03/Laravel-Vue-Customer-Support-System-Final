<template>
    <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
      <!--begin::Page-->
      <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
  
        <!-- Head Component -->
        <DashboardNavbar />
  
        <!--begin::Wrapper-->
        <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
  
          <!--begin::Sidebar-->
          <DashboardSidebar />
          <!--end::Sidebar-->
  
          <!--begin::Main-->
          <div class="app-main flex-column flex-row-fluid custom_height" id="kt_app_main">
            <!--begin::Content wrapper-->
            <div class="d-flex flex-column flex-column-fluid">
                <slot />
            </div>
            <!--end::Content wrapper-->
  
            <!--begin::Footer-->
            <DashboardFooter />
            <!--end::Footer-->
  
          </div>
          <!--end::Main-->
  
        </div>
        <!--end::Wrapper-->
  
      </div>
      <!--end::Page-->
    </div>
</template>
  
  <script setup>
  import DashboardNavbar from "@/components/DashboardNavbar.vue";
  import DashboardSidebar from "@/components/DashboardSidebar.vue";
  import DashboardFooter from "@/components/DashboardFooter.vue";
  </script>
  
  <style scoped>
    .custom_height {
      height: calc(100vh - 70px);
    }
  </style>
  