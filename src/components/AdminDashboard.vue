<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p class="text-sm text-gray-500">Order Management System</p>
          </div>
          <div class="flex items-center space-x-4">
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
          <h2 class="text-lg font-medium text-gray-900">Recent Orders</h2>
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
                @click="refreshOrders"
                class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
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
                  #{{ order.id }}
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
                  {{ formatDateTime(order.date) }}
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
        <div v-if="filteredOrders.length === 0" class="text-center py-12">
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
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['logout'])

const orders = ref([])
const lastLoginTime = ref('')
const statusFilter = ref('all')

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
  return [...filteredOrders.value].sort((a, b) => new Date(b.date) - new Date(a.date))
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
  localStorage.removeItem('adminAuthenticated')
  localStorage.removeItem('adminLoginTime')
  emit('logout')
}

const refreshOrders = () => {
  loadOrdersFromStorage()
}

const updateOrderStatus = (order) => {
  // Save updated status to localStorage
  const storedOrders = JSON.parse(localStorage.getItem('nanucellOrders') || '[]')
  const updatedOrders = storedOrders.map(storedOrder => 
    storedOrder.id === order.id ? { ...storedOrder, status: order.status } : storedOrder
  )
  localStorage.setItem('nanucellOrders', JSON.stringify(updatedOrders))
}

const confirmDeleteOrder = (order) => {
  if (confirm(`Are you sure you want to delete order #${order.id}? This action cannot be undone.`)) {
    deleteOrder(order)
  }
}

const deleteOrder = (order) => {
  // Remove order from localStorage
  const storedOrders = JSON.parse(localStorage.getItem('nanucellOrders') || '[]')
  const updatedOrders = storedOrders.filter(storedOrder => storedOrder.id !== order.id)
  localStorage.setItem('nanucellOrders', JSON.stringify(updatedOrders))
  
  // Update local orders array
  orders.value = orders.value.filter(o => o.id !== order.id)
}

const loadOrdersFromStorage = () => {
  const storedOrders = JSON.parse(localStorage.getItem('nanucellOrders') || '[]')
  
  // Transform stored orders to match our format
  orders.value = storedOrders.map(order => ({
    id: order.id,
    name: order.name,
    email: order.email,
    contact: order.contact,
    address: order.address,
    items: order.items,
    payment_method: order.payment_method,
    preferred_date: order.preferred_date,
    preferred_time: order.preferred_time,
    delivery_instructions: order.delivery_instructions,
    status: order.status || 'pending',
    date: order.date || new Date().toISOString()
  }))
}

// Check authentication and load orders on component mount
onMounted(() => {
  const loginTime = localStorage.getItem('adminLoginTime')
  lastLoginTime.value = loginTime
  loadOrdersFromStorage()
  
  // Set up interval to refresh orders every 30 seconds
  setInterval(loadOrdersFromStorage, 30000)
})
</script>