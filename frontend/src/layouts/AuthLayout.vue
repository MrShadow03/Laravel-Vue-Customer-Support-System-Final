<template>
    <div class="auth-container">
        <div class="d-flex flex-column flex-root" id="kt_app_root" data-bs-theme="light">
            <div class="d-flex flex-column justify-content-center flex-column-fluid flex-lg-row">
                <div class="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-0 p-lg-20">
                    <div class="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-sm-600px w-100 p-10">
                        <div class="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
                            <slot />
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>