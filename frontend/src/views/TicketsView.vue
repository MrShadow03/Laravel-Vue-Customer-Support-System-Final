<script setup>
  import { useTicketsStore } from '@/stores/tickets';
  import { useAuthStore } from '@/stores/auth';
  import { storeToRefs } from 'pinia';
  import { onMounted, reactive, ref  } from 'vue';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  const { createTicket, updateTicket } = useTicketsStore();
  const { errors } = storeToRefs(useTicketsStore());

  const formData = reactive({
    subject: '',
    category: '',
    priority: '',
    description: '',
    attachment: null,
  });

  const formEditData = reactive({
    id: '',
    subject: '',
    category: '',
    priority: '',
    status: 'Open',
    description: '',
    attachment: null,
  });

  const placeEditData = (ticket) => {
    formEditData.id = ticket.id;
    formEditData.subject = ticket.subject;
    formEditData.category = ticket.category;
    formEditData.priority = ticket.priority;
    formEditData.description = ticket.description;
    formEditData.status = ticket.status;
  };

  dayjs.extend(relativeTime);
  const formatDate = (date) => dayjs(date).fromNow();

  const ticketsStore = useTicketsStore();

  const { tickets, pagination } = storeToRefs(ticketsStore);

  onMounted(() => {
      ticketsStore.fetchTickets();
  });
  
  const changePage = (page) => {
    if (page && page !== pagination.value.current_page) {
        ticketsStore.fetchTickets(page);
    }
  };

  const triggerSwal = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        ticketsStore.deleteTicket(id);
      }
    });
  };

  const authStore = useAuthStore();
  const role = authStore.user.roles[0].name;

</script>
<template>
  <div class="d-flex flex-column flex-column-fluid">

    <!--begin::Toolbar-->
    <div id="kt_app_toolbar" class="app-toolbar  py-3 py-lg-6 ">

      <!--begin::Toolbar container-->
      <div id="kt_app_toolbar_container" class="app-container  container-xxl d-flex flex-stack ">



        <!--begin::Page title-->
        <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3 ">
          <!--begin::Title-->
          <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0" v-if="role == 'customer'">
            My Tickets
          </h1>
          <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0" v-else>
            All Tickets
          </h1>

          <!--end::Title-->


          <!--begin::Breadcrumb-->
          <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <!--begin::Item-->
            <li class="breadcrumb-item text-muted">
              Tickets 
            </li>
            <!--end::Item-->

          </ul>
          <!--end::Breadcrumb-->
        </div>
        <!--end::Page title-->
        <!--begin::Actions-->
        <div class="d-flex align-items-center gap-2 gap-lg-3">
          <!--begin::warning button-->
          <a href="#" data-bs-toggle="modal" data-bs-target="#kt_modal_new_ticket" class="btn btn-warning fw-bold fs-8 fs-lg-base">Create Ticket</a>
          <!--end::warning button-->
        </div>
        <!--end::Actions-->
      </div>
      <!--end::Toolbar container-->
    </div>
    <!--end::Toolbar-->

    <!--begin::Content-->
    <div id="kt_app_content" class="app-content  flex-column-fluid ">


      <!--begin::Content container-->
      <div id="kt_app_content_container" class="app-container  container-xxl ">

        <!--begin::Card-->
        <div class="card">
          <!--begin::Card body-->
          <div class="card-body">
            <!--begin::Layout-->
            <div class="d-flex flex-column flex-xl-row p-7">
              <!--begin::Content-->
              <div class="flex-lg-row-fluid me-xl-15 mb-20 mb-xl-0">



                <!--begin::Tickets-->
                <div class="mb-0">
                  <!--begin::Search form-->
                  <form method="post" class="form mb-15">
                    <!--begin::Input wrapper-->
                    <div class="position-relative">
                      <i class="ki-duotone ki-magnifier fs-1 text-warning position-absolute top-50 translate-middle ms-9"><span class="path1"></span><span class="path2"></span></i>
                      <input type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" value="" placeholder="Search">
                    </div>
                    <!--end::Input wrapper-->
                  </form>
                  <!--end::Search form-->

                  <!--begin::Tickets List-->
                  <div class="mb-10" v-if="tickets.length > 0">
                    <!--begin::Ticket-->
                    <div class="d-flex mb-10" v-for="ticket in tickets" :key="ticket.id">
                      <!--begin::Symbol-->
                      <i class="ki-duotone ki-file-added fs-2x me-5 ms-n1 mt-2"
                        :class="{
                          'text-warning': ticket.status == 'Open',
                          'text-success': ticket.status == 'Resolved',
                          'text-info': ticket.status == 'In Progress',
                          '': ticket.status == 'Closed',
                        }"
                        :title="ticket.status"
                      >
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <!--end::Symbol-->

                      <!--begin::Section-->
                      <div class="d-flex flex-column">
                        <!--begin::Content-->
                        <div class="d-flex align-items-center justify-content-between mb-0">
                          <!--begin::Title-->
                          <RouterLink :to="{ name: 'ticket.show', params: { id: ticket.id } }" class="text-dark text-hover-warning fs-4 me-3 fw-semibold d-block">
                            {{ ticket.subject }}
                          </RouterLink>
                          <!--end::Title-->
                          <!-- small edit and add a delete button -->
                          <div class="ms-auto">
                            <button class="btn btn-sm btn-icon btn-active-light-warning me-1" data-bs-toggle="modal" data-bs-target="#kt_modal_edit_ticket" @click="placeEditData(ticket)">
                              <i class="fal fa-edit fs-3"></i>
                            </button>
                            <button class="btn btn-sm btn-icon btn-active-light-danger" @click="triggerSwal(ticket.id)">
                              <i class="fal fa-trash-alt fs-3"></i>
                            </button>
                          </div>
                        </div>
                        <!--end::Content-->
                        <div class="d-flex align-items-center mb-3">
                          <span class="text-muted fs-7 me-3" v-if="role == 'admin'">
                            {{ ticket.user_name }} &nbsp; |
                          </span>
                          <span class="text-muted fs-7">
                            {{ formatDate(ticket.created_at) }}
                          </span>
                        </div>

                        <div class="d-flex align-items-center mb-3">
                          <span 
                            :class="{
                              'badge': true,
                              'badge-danger': ticket.priority === 'High',
                              'badge-warning': ticket.priority === 'Medium',
                              'badge-success': ticket.priority === 'Low'
                            }" 
                            class="my-1">
                            {{ ticket.priority }}
                          </span>
                          <span class="badge badge-light my-1 ms-5">
                            {{ ticket.category }}
                          </span>
                        </div>
                        <!--begin::Text-->
                        <span class="fs-6">
                          {{ ticket.description }}
                        </span>
                        <!--end::Text-->
                      </div>
                      <!--end::Section-->
                    </div>
                    <!--end::Ticket-->
                  </div>
                  <!--end::Tickets List-->

                  <!--begin::Pagination-->
                  <ul class="pagination" v-if="pagination.last_page > 1">
                      <!-- Previous Button -->
                      <li class="page-item" :class="{ 'disabled': !pagination.prev_page_url }">
                          <a href="#" class="page-link" @click.prevent="changePage(pagination.current_page - 1)">
                            <i class="previous"></i>
                          </a>
                      </li>

                      <!-- Page Numbers -->
                      <li v-for="link in pagination.links" :key="link.label" class="page-item" :class="{ 'active': link.active }">
                          <a v-if="link.url" href="#" class="page-link" @click.prevent="changePage(link.label)" v-html="link.label">
                          </a>
                          <span v-else class="page-link" v-html="link.label"></span>
                      </li>

                      <!-- Next Button -->
                      <li class="page-item" :class="{ 'disabled': !pagination.next_page_url }">
                          <a href="#" class="page-link" @click.prevent="changePage(pagination.current_page + 1)">
                            <i class="next"></i>
                          </a>
                      </li>
                  </ul>
                  <!--end::Pagination-->
                </div>
                <!--end::Tickets-->


              </div>
              <!--end::Content-->

              <!--begin::Sidebar-->
              <div class="flex-column flex-lg-row-auto w-100 mw-lg-300px mw-xxl-350px">




                <!--begin::More channels-->
                <div class="card-rounded bg-warning bg-opacity-5 p-10 mb-15">
                  <!--begin::Title-->
                  <h2 class="text-dark fw-bold mb-11">Our Communities</h2>
                  <!--end::Title-->

                  <!--begin::Item-->
                  <div class="d-flex align-items-center mb-10">
                    <!--begin::Icon-->
                    <i class="ki-duotone ki-calendar fs-1 text-warning me-5"><span class="path1"></span><span class="path2"></span></i>
                    <!--end::Icon-->

                    <!--begin::Info-->
                    <div class="d-flex flex-column">
                      <h5 class="text-gray-800 fw-bold">Steps HRMS</h5>

                      <!--begin::Section-->
                      <div class="fw-semibold">
                        <!--begin::Desc-->
                        <span class="text-muted">Automates HR tasks </span>
                        <!--end::Desc-->
                      </div>
                      <!--end::Section-->
                    </div>
                    <!--end::Info-->
                  </div>
                  <!--end::Item-->
                  <!--begin::Item-->
                  <div class="d-flex align-items-center mb-10">
                    <!--begin::Icon-->
                    <i class="ki-duotone ki-notification-status fs-1 text-warning me-5"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></i>
                    <!--end::Icon-->

                    <!--begin::Info-->
                    <div class="d-flex flex-column">
                      <h5 class="text-gray-800 fw-bold">Steps AFS</h5>

                      <!--begin::Section-->
                      <div class="fw-semibold">
                        <!--begin::Desc-->
                        <span class="text-muted">An accounting system</span>
                      </div>
                      <!--end::Section-->
                    </div>
                    <!--end::Info-->
                  </div>
                  <!--end::Item-->
                  <!--begin::Item-->
                  <div class="d-flex align-items-center mb-10">
                    <!--begin::Icon-->
                    <i class="ki-duotone ki-twitter fs-1 text-warning me-5"><span class="path1"></span><span class="path2"></span></i>
                    <!--end::Icon-->

                    <!--begin::Info-->
                    <div class="d-flex flex-column">
                      <h5 class="text-gray-800 fw-bold">Steps SCM</h5>

                      <!--begin::Section-->
                      <div class="fw-semibold">
                        <!--begin::Desc-->
                        <span class="text-muted">Supply chain management</span>
                      </div>
                      <!--end::Section-->
                    </div>
                    <!--end::Info-->
                  </div>
                  <!--end::Item-->
                  <!--begin::Item-->
                  <div class="d-flex align-items-center ">
                    <!--begin::Icon-->
                    <i class="ki-duotone ki-github fs-1 text-warning me-5"><span class="path1"></span><span class="path2"></span></i>
                    <!--end::Icon-->

                    <!--begin::Info-->
                    <div class="d-flex flex-column">
                      <h5 class="text-gray-800 fw-bold">Steps IMS</h5>

                      <!--begin::Section-->
                      <div class="fw-semibold">
                        <!--begin::Desc-->
                        <span class="text-muted">Inventory Management System</span>
                      </div>
                      <!--end::Section-->
                    </div>
                    <!--end::Info-->
                  </div>
                  <!--end::Item-->

                </div>
                <!--end::More channels-->
              </div>
              <!--end::Sidebar-->
            </div>
            <!--end::Layout-->
          </div>
          <!--end::Card body-->
        </div>
        <!--end::Card-->


        <!--begin::Modal - Support Center - Create Ticket-->
        <div class="modal fade" id="kt_modal_new_ticket" tabindex="-1" aria-hidden="true">
          <!--begin::Modal dialog-->
          <div class="modal-dialog modal-dialog-centered mw-750px">
            <!--begin::Modal content-->
            <div class="modal-content rounded">
              <!--begin::Modal header-->
              <div class="modal-header pb-0 border-0 justify-content-end">
                <!--begin::Close-->
                <div class="btn btn-sm btn-icon btn-active-color-warning" data-bs-dismiss="modal">
                  <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
                </div>
                <!--end::Close-->
              </div>
              <!--begin::Modal header-->

              <!--begin::Modal body-->
              <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
                <!--begin:Form-->
                <form id="kt_modal_new_ticket_form" class="form" @submit.prevent="createTicket(formData)">
                  <!--begin::Heading-->
                  <div class="mb-13 text-center">
                    <!--begin::Title-->
                    <h1 class="mb-3">Create Ticket</h1>
                    <!--end::Title-->

                    <!--begin::Description-->
                    <div class="text-gray-400 fw-semibold fs-5">
                      If you need more info, please check <a href="#" class="fw-bold link-warning">Support Guidelines</a>.
                    </div>
                    <!--end::Description-->
                  </div>
                  <!--end::Heading-->

                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <!--begin::Label-->
                    <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                      <span class="required">Subject</span>

                      <span class="ms-2" data-bs-toggle="tooltip" title="Specify a subject for your issue">
                        <i class="ki-duotone ki-information fs-7"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i> </span>
                    </label>
                    <!--end::Label-->

                    <input type="text" class="form-control form-control-solid" placeholder="Enter your ticket subject" name="subject" v-model="formData.subject"/>
                    <div v-if="errors.subject" class="fv-plugins-message-container">
                      <div data-field="subject" data-validator="notEmpty" class="fv-help-block">{{ errors.subject[0] }}</div>
                  </div>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="row g-9 mb-8">
                    <!--begin::Col-->
                    <div class="col-md-6 fv-row">
                      <label class="required fs-6 fw-semibold mb-2">Category</label>

                      <select v-model="formData.category" class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Select a category" name="category">
                        <option value="">Select a category...</option>
                        <option value="Technical">Technical</option>
                        <option value="Billing">Billing</option>
                        <option value="General">General</option>
                      </select>
                      <div v-if="errors.category" class="fv-plugins-message-container">
                        <div data-field="category" data-validator="notEmpty" class="fv-help-block">{{ errors.category[0] }}</div>
                    </div>
                    </div>
                    <!--end::Col-->

                    <!--begin::Col-->
                    <div class="col-md-6 fv-row">
                      <label class="required fs-6 fw-semibold mb-2">Priority</label>

                      <select v-model="formData.priority" class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Is it urgent?" name="priority">
                        <option value="">Select priority...</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                      <div v-if="errors.priority" class="fv-plugins-message-container">
                        <div data-field="priority" data-validator="notEmpty" class="fv-help-block">{{ errors.priority[0] }}</div>
                    </div>
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <label class="fs-6 fw-semibold mb-2">Description</label>

                    <textarea v-model="formData.description" class="form-control form-control-solid" rows="4" name="description" placeholder="Please tell us about your issue"></textarea>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <!--begin::Label-->
                    <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                      <span>Attachment</span>

                      <span class="ms-2" data-bs-toggle="tooltip" title="Specify a subject for your issue"></span>
                    </label>
                    <!--end::Label-->

                    <input type="file" class="form-control form-control-solid" placeholder="Enter your ticket subject" name="attachment" />
                    <div v-if="errors.attachment" class="fv-plugins-message-container">
                        <div data-field="attachment" data-validator="notEmpty" class="fv-help-block">{{ errors.attachment[0] }}</div>
                    </div>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Actions-->
                  <div class="text-center">
                    <button type="reset" id="kt_modal_new_ticket_cancel" class="btn btn-light me-3">
                      Cancel
                    </button>

                    <button type="submit" id="kt_modal_new_ticket_submit" class="btn btn-warning">
                      <span class="indicator-label">
                        Submit
                      </span>
                      <span class="indicator-progress">
                        Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>
                  <!--end::Actions-->
                </form>
                <!--end:Form-->
              </div>
              <!--end::Modal body-->
            </div>
            <!--end::Modal content-->
          </div>
          <!--end::Modal dialog-->
        </div>
        <!--end::Modal - Support Center - Create Ticket-->
        
        <!--begin::Modal - Support Center - edit Ticket-->
        <div class="modal fade" id="kt_modal_edit_ticket" tabindex="-1" aria-hidden="true">
          <!--begin::Modal dialog-->
          <div class="modal-dialog modal-dialog-centered mw-750px">
            <!--begin::Modal content-->
            <div class="modal-content rounded">
              <!--begin::Modal header-->
              <div class="modal-header pb-0 border-0 justify-content-end">
                <!--begin::Close-->
                <div class="btn btn-sm btn-icon btn-active-color-warning" data-bs-dismiss="modal">
                  <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
                </div>
                <!--end::Close-->
              </div>
              <!--begin::Modal header-->

              <!--begin::Modal body-->
              <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
                <!--begin:Form-->
                <form id="kt_modal_new_ticket_form" class="form" @submit.prevent="updateTicket(formEditData)">
                  <!--begin::Heading-->
                  <div class="mb-13 text-center">
                    <!--begin::Title-->
                    <h1 class="mb-3">Edit Ticket</h1>
                    <!--end::Title-->

                    <!--begin::Description-->
                    <div class="text-gray-400 fw-semibold fs-5">
                      If you need more info, please check <a href="#" class="fw-bold link-warning">Support Guidelines</a>.
                    </div>
                    <!--end::Description-->
                  </div>
                  <!--end::Heading-->
                  <input type="text" v-model="formEditData.id" hidden/>
                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <!--begin::Label-->
                    <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                      <span class="required">Subject</span>

                      <span class="ms-2" data-bs-toggle="tooltip" title="Specify a subject for your issue">
                        <i class="ki-duotone ki-information fs-7"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i> </span>
                    </label>
                    <!--end::Label-->

                    <input type="text" class="form-control form-control-solid" placeholder="Enter your ticket subject" name="subject" v-model="formEditData.subject" id="edit_subject"/>
                    <div v-if="errors.subject" class="fv-plugins-message-container">
                      <div data-field="subject" data-validator="notEmpty" class="fv-help-block">{{ errors.subject[0] }}</div>
                  </div>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="row g-9 mb-8">
                    <!--begin::Col-->
                    <div class="col-md-6 fv-row">
                      <label class="required fs-6 fw-semibold mb-2">Category</label>

                      <select v-model="formEditData.category" class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Select a category" name="category" id="edit_category">
                        <option value="">Select a category...</option>
                        <option value="Technical">Technical</option>
                        <option value="Billing">Billing</option>
                        <option value="General">General</option>
                      </select>
                      <div v-if="errors.category" class="fv-plugins-message-container">
                        <div data-field="category" data-validator="notEmpty" class="fv-help-block">{{ errors.category[0] }}</div>
                    </div>
                    </div>
                    <!--end::Col-->

                    <!--begin::Col-->
                    <div class="col-md-6 fv-row">
                      <label class="required fs-6 fw-semibold mb-2">Priority</label>

                      <select v-model="formEditData.priority" class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Is it urgent?" name="priority" id="edit_priority">
                        <option value="">Select priority...</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                      <div v-if="errors.priority" class="fv-plugins-message-container">
                        <div data-field="priority" data-validator="notEmpty" class="fv-help-block">{{ errors.priority[0] }}</div>
                    </div>
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <label class="fs-6 fw-semibold mb-2">Description</label>

                    <textarea v-model="formEditData.description" class="form-control form-control-solid" rows="4" name="description" placeholder="Please tell us about your issue" id="edit_description"></textarea>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row" v-if="role == 'admin'">
                      <label class="required fs-6 fw-semibold">status</label>
                      <select v-model="formEditData.status" class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Select a status" name="status" id="edit_status">
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <div v-if="errors.status" class="fv-plugins-message-container">
                        <div data-field="status" data-validator="notEmpty" class="fv-help-block">{{ errors.status[0] }}</div>
                    </div>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row" v-else>
                    <!--begin::Label-->
                    <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                      <span>Attachment</span>

                      <span class="ms-2" data-bs-toggle="tooltip" title="Specify a subject for your issue"></span>
                    </label>
                    <!--end::Label-->

                    <input type="file" class="form-control form-control-solid" placeholder="Enter your ticket subject" name="attachment" />
                    <div v-if="errors.attachment" class="fv-plugins-message-container">
                        <div data-field="attachment" data-validator="notEmpty" class="fv-help-block">{{ errors.attachment[0] }}</div>
                    </div>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Actions-->
                  <div class="text-center">
                    <button type="reset" id="kt_modal_new_ticket_cancel" class="btn btn-light me-3">
                      Cancel
                    </button>

                    <button type="submit" id="kt_modal_new_ticket_submit" class="btn btn-warning">
                      <span class="indicator-label">
                        Submit
                      </span>
                      <span class="indicator-progress">
                        Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>
                  <!--end::Actions-->
                </form>
                <!--end:Form-->
              </div>
              <!--end::Modal body-->
            </div>
            <!--end::Modal content-->
          </div>
          <!--end::Modal dialog-->
        </div>
        <!--end::Modal - Support Center - edit Ticket-->
      </div>
      <!--end::Content container-->
    </div>
    <!--end::Content-->
  </div>
</template>