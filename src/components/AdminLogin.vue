<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <!-- Back Button -->
      <button 
        @click="$emit('back')"
        class="flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors duration-200"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Site
      </button>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-purple-900 mb-2">Admin Portal</h1>
        <p class="text-gray-600">Sign in with your admin account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Admin Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 border-gray-300"
            placeholder=""
            autocomplete="email"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            :class="[ 'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200',
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            ]"
            placeholder="Enter your admin password"
            autocomplete="current-password"
          />
          <p v-if="error" class="text-red-500 text-sm mt-2 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            {{ error }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          :class="[ 'w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center',
            loading 
              ? 'bg-purple-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
          ]"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Signing in...' : 'Enter Admin Portal' }}
        </button>
      </form>

      <!-- Security Notice -->
      <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <div class="text-sm text-yellow-700">
            <strong>Security Notice:</strong> Only authorized admin accounts can modify data.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginAdmin } from '../firebase/index.js'

const emit = defineEmits(['login', 'back'])

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    error.value = 'Please enter both email and password'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await loginAdmin(email.value, password.value)
    // mark admin authenticated
    localStorage.setItem('adminAuthenticated', 'true')
    // store login time in ISO format so AdminDashboard can parse/display it reliably
    localStorage.setItem('adminLoginTime', new Date().toISOString())
    emit('login')
  } catch (err) {
    console.error(err)
    error.value = 'Invalid email or password.'
  } finally {
    loading.value = false
  }
}
</script>
