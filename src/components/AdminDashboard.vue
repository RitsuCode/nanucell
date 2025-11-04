<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p class="text-sm text-gray-500">Multi-Device Order Management</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div :class="[
                'w-3 h-3 rounded-full',
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              ]"></div>
              <span class="text-sm text-gray-600">
                {{ isConnected ? 'Live Connected' : 'Offline' }}
              </span>
            </div>
            <span class="text-sm text-gray-600">
              Last login: {{ formatTime(lastLoginTime) }}
            </span>
            <button
              @click="handleLogout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Orders</p>
              <p class="text-2xl font-semibold text-gray-900">{{ orders.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-2xl font-semibold text-gray-900">{{ completedOrders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-semibold text-gray-900">{{ pendingOrders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Customers</p>
              <p class="text-2xl font-semibold text-gray-900">{{ uniqueCustomers }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 class="text-lg font-medium text-gray-900">All Orders (Live)</h2>
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <!-- Status Filter -->
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by status:</label>
              <select 
                v-model="statusFilter"
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div class="flex gap-2">
              <button 
                @click="exportOrders"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p class="mt-4 text-sm text-gray-600">Loading orders from cloud database...</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact & Address
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment & Delivery
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in sortedOrders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{{ order.id.slice(-6) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div class="font-medium">{{ order.name }}</div>
                    <div class="text-gray-500">{{ order.email }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="max-w-xs">
                    <div class="font-medium">{{ order.contact }}</div>
                    <div class="text-gray-500 text-xs mt-1">
                      {{ order.address.street }}, {{ order.address.city }}, {{ order.address.province }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="max-w-xs">
                    <div v-for="(item, index) in order.items" :key="index" class="truncate">
                      {{ item.product }} × {{ item.qty }}
                    </div>
                    <div class="text-gray-500 text-xs mt-1">
                      Total: {{ getTotalItems(order.items) }} items
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="max-w-xs">
                    <div>
                      <span class="font-medium">Payment:</span> 
                      <span class="capitalize">{{ order.payment_method }}</span>
                    </div>
                    <div v-if="order.preferred_date" class="text-gray-500 text-xs mt-1">
                      Preferred: {{ formatDate(order.preferred_date) }}
                      <span v-if="order.preferred_time"> at {{ order.preferred_time }}</span>
                    </div>
                    <div v-if="order.delivery_instructions" class="text-gray-500 text-xs mt-1 truncate" :title="order.delivery_instructions">
                      Instructions: {{ order.delivery_instructions }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <select 
                    v-model="order.status" 
                    @change="updateOrderStatus(order)"
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-purple-500 outline-none',
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    ]"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDateTime(order.date || order.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="confirmDeleteOrder(order)"
                    class="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 rounded hover:bg-red-50"
                    title="Delete Order"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Empty State -->
        <div v-if="!loading && filteredOrders.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ statusFilter === 'all' ? 'No orders have been placed yet.' : `No ${statusFilter} orders found.` }}
          </p>
          <button
            v-if="statusFilter !== 'all'"
            @click="statusFilter = 'all'"
            class="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            View all orders
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  getOrders, 
  updateOrder, 
  deleteOrder, 
  subscribeToOrders 
} from '../firebase'

const emit = defineEmits(['logout'])

const orders = ref([])
const lastLoginTime = ref('')
const statusFilter = ref('all')
const loading = ref(true)
const isConnected = ref(true)
const unsubscribe = ref(null)

// Computed properties
const filteredOrders = computed(() => {
  if (statusFilter.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === statusFilter.value)
})

const completedOrders = computed(() => {
  return orders.value.filter(order => order.status === 'completed').length
})

const pendingOrders = computed(() => {
  return orders.value.filter(order => order.status === 'pending').length
})

const uniqueCustomers = computed(() => {
  const emails = new Set(orders.value.map(order => order.email))
  return emails.size
})

const sortedOrders = computed(() => {
  return [...filteredOrders.value].sort((a, b) => {
    const dateA = new Date(a.date || a.createdAt)
    const dateB = new Date(b.date || b.createdAt)
    return dateB - dateA
  })
})

// Methods
const getTotalItems = (items) => {
  return items.reduce((total, item) => total + item.qty, 0)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLogout = () => {
  // Clean up Firebase listener
  if (unsubscribe.value) {
    unsubscribe.value()
  }
  
  localStorage.removeItem('adminAuthenticated')
  localStorage.removeItem('adminLoginTime')
  emit('logout')
}

const updateOrderStatus = async (order) => {
  try {
    await updateOrder(order.id, { status: order.status })
  } catch (error) {
    console.error('Error updating order status:', error)
    alert('Failed to update order status. Please try again.')
  }
}

const confirmDeleteOrder = (order) => {
  if (confirm(`Are you sure you want to delete order #${order.id.slice(-6)}? This action cannot be undone.`)) {
    deleteOrderFromFirebase(order)
  }
}

const deleteOrderFromFirebase = async (order) => {
  try {
    await deleteOrder(order.id)
  } catch (error) {
    console.error('Error deleting order:', error)
    alert('Failed to delete order. Please try again.')
  }
}

const exportOrders = () => {
  const csvContent = convertToCSV(orders.value)
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

const convertToCSV = (orders) => {
  const headers = ['Order ID', 'Customer Name', 'Email', 'Contact', 'Address', 'Items', 'Total Items', 'Payment Method', 'Status', 'Date']
  const rows = orders.map(order => [
    order.id.slice(-6),
    `"${order.name}"`,
    order.email,
    order.contact,
    `"${order.address.street}, ${order.address.city}, ${order.address.province}"`,
    `"${order.items.map(item => `${item.product} × ${item.qty}`).join(', ')}"`,
    getTotalItems(order.items),
    order.payment_method,
    order.status,
    formatDateTime(order.date || order.createdAt)
  ])
  
  return [headers, ...rows].map(row => row.join(',')).join('\n')
}

const initializeFirebaseListener = () => {
  unsubscribe.value = subscribeToOrders((firebaseOrders) => {
    orders.value = firebaseOrders
    loading.value = false
    isConnected.value = true
  })
}

// Check authentication and load orders on component mount
onMounted(() => {
  const loginTime = localStorage.getItem('adminLoginTime')
  lastLoginTime.value = loginTime
  
  // Initialize Firebase real-time listener
  initializeFirebaseListener()
})

onUnmounted(() => {
  // Clean up Firebase listener when component is destroyed
  if (unsubscribe.value) {
    unsubscribe.value()
  }
})
</script>