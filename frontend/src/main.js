// Import Vue core libraries
import { createApp } from 'vue'
import { createPinia } from 'pinia' // State management
import Toast from "vue-toastification"; // Toast notification library
import "vue-toastification/dist/index.css";

// Import main components and styles
import App from './App.vue'
import router from './router'
import './styles/main.css'

// Create the Vue application instance
const app = createApp(App)

// Register plugins
app.use(createPinia()) // Enable Pinia store
app.use(router) // Enable Vue Router
app.use(Toast, {
    // Configure toast notification settings
    position: "bottom-right",
    timeout: 3000, // Auto-close after 3 seconds
    closeOnClick: true,
    pauseOnHover: true,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
})

// Mount the app to the DOM element with id="app"
app.mount('#app')
