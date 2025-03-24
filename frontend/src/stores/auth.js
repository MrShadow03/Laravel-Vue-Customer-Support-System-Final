import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
            token: null,
            errors: {}
        }
    },
    actions: {
        async getUser () {
            if (localStorage.getItem('token')) {
                const res = await fetch('/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    this.user = data;
                }
            }
        },
        async authenticate(route, formData) {
            const submitButton = document.getElementById('submit-button');
            submitButton.setAttribute('data-kt-indicator', 'on');
            submitButton.disabled = true;

            const res = await fetch(`/api/${route}`, {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            console.log(data);
            
            if (data.errors) {
                submitButton.removeAttribute('data-kt-indicator');
                submitButton.disabled = false;
                this.errors = data.errors;
                console.log(this.errors);
            } else {
                this.user = data.user;
                this.token = data.token;
                this.errors = {};
                localStorage.setItem('token', data.token);
                this.router.push({ name: 'tickets' });
            }
            
        },
        async logout() {
            const res = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await res.json();
            if (res.ok) {
                this.user = null;
                this.token = null;
                this.errors = {};
                localStorage.removeItem('token');
                this.router.push({ name: 'login' });
            }

            console.log(data);
        }
    }
}) 