// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'  // Add this import
import App from './App.vue'
import './assets/main.css'

// Create Pinia instance
const pinia = createPinia()

// Create app and use Pinia
const app = createApp(App)
app.use(pinia)  // Add this line
app.mount('#app')

createApp(App).mount('#app')

