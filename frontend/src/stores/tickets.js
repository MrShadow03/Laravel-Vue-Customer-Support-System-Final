import { defineStore } from "pinia";

export const useTicketsStore = defineStore('ticketsStore', {
    state: () => {
        return {
            tickets: [],
            comments: [],
            ticket: {},
            user: {},
            chatMessages: {},
            errors: {},
            pagination: {}
        }
    },
    actions: {
        async fetchTickets(page = 1) {
            const response = await fetch(`/api/tickets?page=${page}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            const data = await response.json();
            this.tickets = data.data;
            this.pagination = data;

            console.log(data)
        },
        async getTicket(id) {
            const response = await fetch(`/api/tickets/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            const data = await response.json();
            console.log(data);
            
            if(data.ticket){
                this.ticket = data.ticket;
                this.user = data.user;
                this.chatMessages = data.chatMessages;
                console.log(data.ticket);
                return data.ticket;
            }

            console.log(data);
            return null;
        },
        async sendMessage(formData, ticketId){
            const response = await fetch(`/api/chats/${ticketId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);

            this.getChats(ticketId);
        },
        async addComment(formData, ticketId) {
            const response = await fetch(`/api/comments/${ticketId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);

            this.getComments(ticketId);
        },
        async getComments(ticketId) {
            const response = await fetch(`/api/comments/${ticketId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            const data = await response.json();
            this.comments = data.data;
        },
        async getChats(ticketId) {
            const response = await fetch(`/api/chats/${ticketId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            const data = await response.json();
            this.chatMessages = data.data;

            setTimeout(() => {
                const messagesContainer = document.querySelector('[data-kt-element="messages"]');
                if (messagesContainer) {
                  messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
              }, 100);

            
            console.log(data);
        },
        async getAllTickets() {
            const response = await fetch('/api/tickets', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();

            if(data.errors){
                this.errors = data.errors;
                return;
            }
            return data;
        },
        async createTicket(formData) {
            const response = await fetch('/api/tickets', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();

            if(data.errors){
                this.errors = data.errors;
                return;
            }

            // Close the modal
            let modal = document.getElementById("kt_modal_new_ticket");
            let modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
              
            toastr.success("Ticket created successfully");

            this.fetchTickets();

            Object.assign(formData, {
                subject: '',
                category: '',
                priority: '',
                description: '',
                attachment: null,
            });

            console.log(data);
        },
        async updateTicket(formData) {
            const response = await fetch(`/api/tickets/${formData.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            console.log(data);

            if(data.errors){
                this.errors = data.errors;
                return;
            }

            this.errors = {};

            // Close the modal
            let modal = document.getElementById("kt_modal_edit_ticket");
            let modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }

            toastr.success("Ticket updated successfully");

            this.fetchTickets();

            Object.assign(formData, {
                subject: '',
                category: '',
                priority: '',
                description: '',
                attachment: null,
            });
        },
        async deleteTicket(id) {
            const response = await fetch(`/api/tickets/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();

            if(data.errors){
                this.errors = data.errors;
                return;
            }

            toastr.error("The ticket has been deleted!");

            this.fetchTickets();
        },
    },
});