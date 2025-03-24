<script setup>
import { useTicketsStore } from '@/stores/tickets';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import echo from '@/echo';


const scrollToBottom = () => {
  setTimeout(() => {
    const messagesContainer = document.querySelector('[data-kt-element="messages"]');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, 100);
};

const route = useRoute();
const ticketsStore = useTicketsStore();
const { ticket, user, comments, chatMessages } = storeToRefs(ticketsStore);

onMounted(() => {
  ticketsStore.getTicket(route.params.id);
  ticketsStore.getComments(route.params.id);
  ticketsStore.getChats(route.params.id);
});

dayjs.extend(relativeTime);
const formatDate = (date) => dayjs(date).format('MMMM D, YYYY | h:mm A');

const commentData = reactive({
  comment: '',
});

const chatMessagesData = reactive({
  message: ''
});

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
          <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
            View Ticket
          </h1>
          <!--end::Title-->


          <!--begin::Breadcrumb-->
          <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <!--begin::Item-->
            <li class="breadcrumb-item text-muted">
              <RouterLink :to="{ name: 'tickets' }" class="text-muted text-hover-primary">Tickets</RouterLink>
            </li>
            <!--end::Item-->
          </ul>
          <!--end::Breadcrumb-->
        </div>
        <!--end::Page title-->
      </div>
      <!--end::Toolbar container-->
    </div>
    <!--end::Toolbar-->

    <!--begin::Content-->
    <div id="kt_app_content" class="app-content  flex-column-fluid">


      <!--begin::Content container-->
      <div id="kt_app_content_container" class="app-container  container-xxl ">
        <div class="card">
          <!--begin::Card body-->
          <div class="card-body">
            <!--begin::Layout-->
            <div class="d-flex flex-column flex-xl-row p-7">
              <!--begin::Content-->
              <div class="flex-lg-row-fluid pe-xl-15 mb-20 mb-xl-0 border-end border-1">
                <!--begin::Ticket view-->
                <div class="mb-0">
                  <!--begin::Heading-->
                  <div class="d-flex align-items-center mb-12">
                    <!--begin::Icon-->
                    <i class="ki-duotone ki-file-added fs-4qx text-success ms-n2 me-3"><span class="path1"></span><span class="path2"></span></i>
                    <!--end::Icon-->

                    <!--begin::Content-->
                    <div class="d-flex flex-column">
                      <!--begin::Title-->
                      <h1 class="text-gray-800 fw-semibold">{{ ticket.subject }}</h1>
                      <!--end::Title-->

                      <!--begin::Info-->
                      <div class="">
                        <!--begin::Label-->
                        <span class="fw-semibold text-muted me-6">Status:
                          <span :class="`badge badge-light-${ticket.status === 'open' ? 'success' : 'danger'}`">{{ ticket.status }}</span>
                        </span>
                        <!--end::Label-->

                        <!--begin::Label-->
                        <span class="fw-semibold text-muted me-6">By: <a href="#" class="text-muted text-hover-primary">{{ user.name }}</a></span>
                        <!--end::Label-->

                        <!--begin::Label-->
                        <span class="fw-semibold text-muted">Created: <span class="fw-bold text-gray-600 me-1">
                            {{ formatDate(ticket.created_at) }}
                          </span>
                        </span>
                        <!--end::Label-->
                      </div>
                      <!--end::Info-->
                    </div>
                    <!--end::Content-->
                  </div>
                  <!--end::Heading-->

                  <!--begin::Details-->
                  <div class="mb-15">
                    <!--begin::Description-->
                    <div class="mb-15 fs-5 fw-normal text-gray-800">
                      <!--begin::Text-->
                      <div class="mb-10">
                        {{ ticket.description }}
                      </div>
                      <!--end::Text-->
                    </div>
                    <!--end::Description-->

                    <!--begin::Input group-->
                    <form class="mb-0" @submit.prevent="ticketsStore.addComment(commentData, route.params.id)">
                      <textarea v-model="commentData.comment" class="form-control form-control-solid placeholder-gray-600 fs-5 ps-9 pt-7" rows="6" name="comment" placeholder="Write a comment"></textarea>

                      <!--begin::Submit-->
                      <button type="submit" class="btn btn-primary mt-n20 mb-20 position-relative float-end me-7">Send</button>
                      <!--end::Submit-->
                    </form>
                    <!--end::Input group-->
                  </div>
                  <!--end::Details-->

                  <!--begin::Comments-->
                  <div class="mb-15" v-if="comments.length">
                    <!--begin::Comment-->
                    <div class="mb-5" v-for="comment in comments" :key="comment.id">
                      <!--begin::Card-->
                      <div class="card card-bordered w-100">
                        <!--begin::Body-->
                        <div class="card-body">
                          <!--begin::Wrapper-->
                          <div class="w-100 d-flex flex-stack mb-2">
                            <!--begin::Container-->
                            <div class="d-flex align-items-center f">
                              <!--begin::Author-->
                              <div class="symbol symbol-40px me-5">
                                <div class="symbol-label fs-1 fw-bold bg-light-success text-success">{{ comment.user_name[0] }}</div>
                              </div>
                              <!--end::Author-->

                              <!--begin::Info-->
                              <div class="d-flex flex-column fw-semibold fs-5 text-gray-600 text-dark">
                                <!--begin::Text-->
                                <div class="d-flex align-items-center">
                                  <!--begin::Username-->
                                  <div class="text-gray-800 fw-bold text-hover-primary fs-5 me-3">{{ comment.user_name }}</div>
                                  <!--end::Username-->

                                  <span class="m-0 badge badge-danger" v-if="comment.role == 'admin'">Admin</span>
                                </div>
                                <!--end::Text-->

                                <!--begin::Date-->
                                <span class="text-muted fw-semibold fs-6">{{ comment.created_at }}</span>
                                <!--end::Date-->
                              </div>
                              <!--end::Info-->
                            </div>
                            <!--end::Container-->
                          </div>
                          <!--end::Wrapper-->

                          <!--begin::Desc-->
                          <p class="fw-normal fs-5 text-gray-700 m-0">
                            {{ comment.comment }}
                          </p>
                          <!--end::Desc-->
                        </div>
                        <!--end::Body-->
                      </div>
                      <!--end::Card-->



                    </div>
                    <!--end::Comment-->
                  </div>
                  <!--end::Comments-->

                </div>
                <!--end::Ticket view-->

              </div>
              <!--end::Content-->

              <!--begin::Sidebar-->
              <div class="flex-column flex-lg-row-auto w-100 mw-lg-300px mw-xxl-350px">
                <div class="card w-100 border-0 rounded-0" id="kt_drawer_chat_messenger">
                  <!--begin::Card header-->
                  <div class="card-header" id="kt_drawer_chat_messenger_header">
                    <!--begin::Title-->
                    <div class="card-title">
                      <!--begin::User-->
                      <div class="d-flex justify-content-center flex-column me-3">
                        <a href="#" class="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1">Live Chat</a>

                        <!--begin::Info-->
                        <div class="mb-0 lh-1">
                          <span class="badge badge-success badge-circle w-10px h-10px me-1"></span>
                          <span class="fs-7 fw-semibold text-muted">Active</span>
                        </div>
                        <!--end::Info-->
                      </div>
                      <!--end::User-->
                    </div>
                    <!--end::Title-->

                    <!--begin::Card toolbar-->
                    <div class="card-toolbar">
                    </div>
                    <!--end::Card toolbar-->
                  </div>
                  <!--end::Card header-->

                  <!--begin::Card body-->
                  <div class="card-body" id="kt_drawer_chat_messenger_body">
                    <!--begin::Messages-->
                    <div class="scroll-y me-n5 pe-5" data-kt-element="messages" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer" data-kt-scroll-wrappers="#kt_drawer_chat_messenger_body" data-kt-scroll-offset="0px" style="height: 731px;">
                      <div class="chat_wrapper" v-if="chatMessages.length">
                        <template v-for="(message, index) in chatMessages" :key="message.id">
                          <!-- Define previous message -->
                          <div class="d-flex justify-content-end mb-3" v-if="message.userId == authStore.user.id" >
                            <!--begin::Wrapper-->
                            <div class="d-flex flex-column align-items-end">
                              <!--begin::User (only show if different from previous message)-->
                              <div class="d-flex align-items-center mb-2" v-if="index === 0 || chatMessages[index - 1].userId !== message.userId"  :class="{ 'mt-5': index !== 0 }">
                                <div class="me-3 text-end">
                                  <a href="#" class="fs-6 fw-bold text-gray-900 text-hover-primary ms-1 d-block">You</a>
                                  <span class="text-muted fs-7 mb-1">5 mins</span>
                                </div>
                                <div class="symbol symbol-35px symbol-circle">
                                  <img alt="Pic" src="https://picsum.photos/41">
                                </div>
                              </div>
                              <!--end::User-->

                              <!--begin::Text-->
                              <div class="p-2 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end" data-kt-element="message-text">
                                {{ message.message }}
                              </div>
                              <!--end::Text-->
                            </div>
                            <!--end::Wrapper-->
                          </div>
                          <!--end::Message(out)-->

                          <!--begin::Message(in)-->
                          <div v-else class="d-flex justify-content-start mb-3">
                            <!--begin::Wrapper-->
                            <div class="d-flex flex-column align-items-start">
                              <!--begin::User (only show if different from previous message)-->
                              <div class="d-flex align-items-center mb-2" v-if="index === 0 || chatMessages[index - 1].userId !== message.userId" :class="{ 'mt-5': index !== 0 }">
                                <div class="symbol symbol-35px symbol-circle">
                                  <img alt="Pic" src="https://picsum.photos/40">
                                </div>
                                <div class="ms-3">
                                  <a href="#" class="fs-6 fw-bold text-gray-900 text-hover-primary me-1 d-block">
                                    {{ message.userName }}
                                  </a>
                                  <span class="text-muted fs-7 mb-1">2 mins</span>
                                </div>
                              </div>
                              <!--end::User-->

                              <!--begin::Text-->
                              <div class="p-2 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start" data-kt-element="message-text">
                                {{ message.message }}
                              </div>
                              <!--end::Text-->
                            </div>
                            <!--end::Wrapper-->
                          </div>
                          <!--end::Message(in)-->
                        </template>
                      </div>

                    </div>
                    <!--end::Messages-->
                  </div>
                  <!--end::Card body-->

                  <!--begin::Card footer-->
                  <div class="card-footer pt-4" id="kt_drawer_chat_messenger_footer">
                    <form @submit.prevent="ticketsStore.sendMessage(chatMessagesData, route.params.id)">
                      <!--begin::Input-->
                      <textarea v-model="chatMessagesData.message" class="form-control form-control-flush mb-3" rows="1" data-kt-element="input" placeholder="Type a message"></textarea>
                      <!--end::Input-->

                      <!--begin:Toolbar-->
                      <div class="d-flex flex-stack">
                        <!--begin::Send-->
                        <button class="btn btn-primary" type="submit" data-kt-element="send" @click="scrollToBottom">Send</button>
                        <!--end::Send-->
                      </div>
                      <!--end::Toolbar-->
                    </form>
                  </div>
                  <!--end::Card footer-->
                </div>
              </div>
              <!--end::Sidebar-->
            </div>
            <!--end::Layout-->
          </div>
          <!--end::Card body-->
        </div>
      </div>
      <!--end::Content container-->
    </div>
    <!--end::Content-->
  </div>
</template>