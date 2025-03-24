import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: false,
  encrypted: false, // Disable for local development
  wsHost: window.location.hostname,
  wsPort: 6001,
  disableStats: true,
  authEndpoint: `${import.meta.env.VITE_API_URL}/broadcast`,
  auth: {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
})

console.log(localStorage.getItem('token'))

export default echo