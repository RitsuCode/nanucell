<script setup>
import { ref, reactive, toRaw, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useCartStore } from './../stores/cart.js'
import { addOrder } from './../firebase'
import { calculateOrderTotal, formatPrice, getProductPrice } from './../data/products.js'

const emit = defineEmits(['close', 'submit'])

const nameInput = ref(null)
const cartStore = useCartStore()

const order = reactive({
  name: '',
  email: '',
  contact: '',
  address: { street: '', city: '', province: '', postal: '' },
  delivery_instructions: '',
  items: [],
  preferred_date: '',
  preferred_time: '',
  payment_method: 'gcash',
  accept_terms: false
})

// New reactive variables for the next steps popup
const showNextSteps = ref(false)
const customerName = ref('')

// Compute total price
const orderTotal = computed(() => {
  return calculateOrderTotal(order.items)
})

// Sync modal items with cart store
function syncCartToModal() {
  order.items = cartStore.cartItems.map(item => ({
    product: item.name,
    qty: item.qty,
    price: item.price || getProductPrice(item.name)
  }))
}

// Sync modal changes back to cart store
function syncModalToCart() {
  // Clear the cart first
  cartStore.clearCart()
  
  // Add all items from modal back to cart with their quantities and prices
  order.items.forEach(item => {
    if (item.product && item.qty > 0) {
      cartStore.addToCart({
        name: item.product,
        qty: item.qty,
        price: item.price || getProductPrice(item.product),
        intake: ''
      })
    }
  })
}

const errors = reactive({
  name: '', email: '', contact: '', address: '', items: '', accept_terms: ''
})

const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const contactRE = /^[\d+\s\-()]{7,20}$/

function addItem() {
  order.items.push({ product: '', qty: 1, price: 0 })
  errors.items = ''
}

function removeItem(i) {
  if (order.items.length > 1) {
    order.items.splice(i, 1)
    syncModalToCart()
  }
}

// Update price when product changes
function updateItemPrice(index) {
  const item = order.items[index]
  if (item.product) {
    item.price = getProductPrice(item.product)
  } else {
    item.price = 0
  }
}

// Watch for product changes and update prices
watch(() => order.items.map(item => item.product), () => {
  order.items.forEach((item, index) => {
    updateItemPrice(index)
  })
  setTimeout(() => {
    syncModalToCart()
  }, 100)
}, { deep: true })

// Watch for quantity changes and sync to cart
watch(() => order.items.map(item => item.qty), () => {
  setTimeout(() => {
    syncModalToCart()
  }, 100)
}, { deep: true })

function validate() {
  let valid = true
  Object.keys(errors).forEach(k => (errors[k] = ''))

  if (!order.name.trim()) { errors.name = 'Full name is required'; valid = false }
  if (!order.email.trim() || !emailRE.test(order.email)) { errors.email = 'Valid email is required'; valid = false }
  if (!order.contact.trim() || !contactRE.test(order.contact)) { errors.contact = 'Valid contact number is required'; valid = false }
  if (!order.address.street.trim() || !order.address.city.trim() || !order.address.province.trim()) {
    errors.address = 'Please provide street, city, and province'; valid = false
  }
  const badItem = order.items.find(i => !i.product.trim() || !Number.isFinite(i.qty) || i.qty < 1)
  if (badItem) { errors.items = 'Provide product and quantity (>=1) for each item'; valid = false }
  if (!order.accept_terms) { errors.accept_terms = 'You must agree to be contacted'; valid = false }

  return valid
}

const submitting = ref(false)
const errorMessage = ref('')

async function submitOrder() {
  if (!validate()) return

  submitting.value = true
  errorMessage.value = ''

  const payload = {
    name: order.name.trim(),
    email: order.email.trim(),
    contact: order.contact.trim(),
    address: {
      street: order.address.street.trim(),
      city: order.address.city.trim(),
      province: order.address.province.trim(),
      postal: order.address.postal.trim()
    },
    delivery_instructions: order.delivery_instructions.trim(),
    items: order.items.map(i => ({ 
      product: i.product.trim(), 
      qty: Number(i.qty),
      price: i.price 
    })),
    preferred_date: order.preferred_date || null,
    preferred_time: order.preferred_time || null,
    payment_method: order.payment_method,
    total: orderTotal.value,
    status: 'pending',
    date: new Date().toISOString()
  }

  try {
    const orderId = await addOrder(payload)
    
    const existingOrders = JSON.parse(localStorage.getItem('nanucellOrders') || '[]')
    existingOrders.push({ ...payload, id: orderId })
    localStorage.setItem('nanucellOrders', JSON.stringify(existingOrders))

    emit('submit', toRaw(payload))
    cartStore.clearCart()
    customerName.value = order.name.trim()
    showNextSteps.value = true
    
  } catch (error) {
    console.error('Error submitting order:', error)
    errorMessage.value = 'Failed to submit order. Please try again or contact support.'
    submitting.value = false
    
    setTimeout(() => {
      errorMessage.value = ''
    }, 5000)
  }
}

function completeOrderProcess() {
  resetForm()
  showNextSteps.value = false
  submitting.value = false
  emit('close')
}

function resetForm() {
  order.name = ''; order.email = ''; order.contact = ''
  order.address = { street: '', city: '', province: '', postal: '' }
  order.delivery_instructions = ''; order.items = []
  order.preferred_date = ''; order.preferred_time = ''; order.payment_method = 'cash'
  order.accept_terms = false
  Object.keys(errors).forEach(k => (errors[k] = ''))
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    if (showNextSteps.value) {
      completeOrderProcess()
    } else {
      emit('close')
    }
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeyDown)
  
  syncCartToModal()
  
  setTimeout(() => {
    if (nameInput.value && typeof nameInput.value.focus === 'function') nameInput.value.focus()
  }, 50)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div
    class="fixed inset-0 z-[1000] flex items-center justify-center p-4"
    aria-modal="true"
    role="dialog"
    @click.self="showNextSteps ? completeOrderProcess() : emit('close')"
  >
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- Next Steps Popup -->
    <div
      v-if="showNextSteps"
      class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in z-20"
      role="dialog"
      aria-labelledby="next-steps-title"
    >
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h2 id="next-steps-title" class="text-2xl font-bold text-[rgb(105,30,104)] mb-2">Order Submitted Successfully!</h2>
        
        <!-- Order Total in Next Steps -->
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <p class="text-lg font-bold text-purple-800">Order Total: {{ formatPrice(orderTotal) }}</p>
        </div>

        <p class="text-gray-600 mb-6">Thank you for your order. Here are the next steps:</p>

        <div class="space-y-4 text-left mb-6">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-6 h-6 bg-[rgb(105,30,104)] text-white rounded-full text-sm flex items-center justify-center mt-0.5">1</div>
            <div>
              <h3 class="font-semibold text-gray-900" v-if="order.payment_method === 'gcash'">Send GCash Payment</h3>
              <h3 class="font-semibold text-gray-900" v-if="order.payment_method === 'card'">Send Card Payment</h3>
              <p class="text-sm text-gray-600 mt-1" v-if="order.payment_method === 'gcash'">
                Send your payment of <strong class="text-[rgb(105,30,104)]">{{ formatPrice(orderTotal) }}</strong> to:<br>
                <strong class="text-[rgb(105,30,104)]">0927 822 1746</strong><br>
                Account Name: <strong>Ma**A El***A G.</strong>
              </p>
              <p class="text-sm text-gray-600 mt-1" v-if="order.payment_method === 'card'">
                We'll contact you for the bank details.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-6 h-6 bg-[rgb(105,30,104)] text-white rounded-full text-sm flex items-center justify-center mt-0.5">2</div>
            <div>
              <h3 class="font-semibold text-gray-900">Email Your Receipt</h3>
              <p class="text-sm text-gray-600 mt-1">
                Send the payment receipt to:<br>
                <strong class="text-[rgb(105,30,104)]">nanucellhealthshop@gmail.com</strong><br>
                Subject: <strong>"{{ customerName }} Payment - {{ formatPrice(orderTotal) }}"</strong>
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-6 h-6 bg-[rgb(105,30,104)] text-white rounded-full text-sm flex items-center justify-center mt-0.5">3</div>
            <div>
              <h3 class="font-semibold text-gray-900">Wait for Verification</h3>
              <p class="text-sm text-gray-600 mt-1">
                We will contact you within 24 hours to verify your order and payment.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <p class="text-sm text-yellow-800 text-left">
            <strong>Important:</strong> Your order will only be processed after we verify your payment.
          </p>
        </div>

        <button
          @click="completeOrderProcess"
          class="w-full px-4 py-3 bg-[rgb(105,30,104)] text-white rounded-lg font-semibold hover:bg-[rgb(125,40,124)] transition-colors duration-200"
        >
          Got it! I'll complete these steps
        </button>
      </div>
    </div>

    <!-- Main Order Form -->
    <div
      v-else
      class="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 animate-fade-in max-h-[90vh] overflow-y-auto z-10 modal-scroll"
      role="document"
      aria-labelledby="order-title"
    >
      <button
        @click="emit('close')"
        type="button"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        ✕
      </button>

      <h2 id="order-title" class="text-2xl font-bold text-[rgb(105,30,104)] mb-1 text-center">Place Your Order</h2>
      <p class="text-sm text-gray-500 text-center mb-4">We'll contact you to confirm details</p>

      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-700 text-sm font-medium">{{ errorMessage }}</p>
      </div>

      <!-- Cart Summary with Total -->
      <div v-if="order.items.length > 0" class="mb-4 p-3 bg-gray-50 rounded-lg">
        <h3 class="font-semibold text-gray-700 mb-2">Your Cart ({{ cartStore.getTotalItems() }} item{{ cartStore.getTotalItems() !== 1 ? 's' : '' }})</h3>
        <div v-for="(item, index) in order.items" :key="index" class="flex justify-between text-sm py-1">
          <span>{{ item.product }} × {{ item.qty }}</span>
          <span class="font-medium">{{ formatPrice(getProductPrice(item.product) * item.qty) }}</span>
        </div>
        <div class="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
          <span>Total:</span>
          <span class="text-[rgb(105,30,104)]">{{ formatPrice(orderTotal) }}</span>
        </div>
      </div>

      <form @submit.prevent="submitOrder" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-gray-700">Full name</label>
            <input ref="nameInput" v-model="order.name" type="text" required
              class="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none" />
            <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="order.email" type="email" required
              class="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none" />
            <p v-if="errors.email" class="text-xs text-red-600 mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Contact number</label>
            <input v-model="order.contact" type="tel" required placeholder="+63 9xx xxx xxxx"
              class="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none" />
            <p v-if="errors.contact" class="text-xs text-red-600 mt-1">{{ errors.contact }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Payment method</label>
            <select v-model="order.payment_method" class="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none">
              <option value="gcash">GCash / e-wallet</option>
              <option value="card">Card (online)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Address</label>
          <input v-model="order.address.street" type="text" placeholder="Street, house/unit no." required
            class="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none" />
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
            <input v-model="order.address.city" type="text" placeholder="City" required class="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none" />
            <input v-model="order.address.province" type="text" placeholder="Province" required class="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none" />
            <input v-model="order.address.postal" type="text" placeholder="Postal (optional)" class="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none" />
          </div>
          <p v-if="errors.address" class="text-xs text-red-600 mt-1">{{ errors.address }}</p>
        </div>

        <!-- Order items with dropdown -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-gray-700">Order items</label>
            <button type="button" @click="addItem" class="text-sm text-[rgb(105,30,104)] hover:underline">+ Add line</button>
          </div>

          <div class="space-y-2">
            <div v-for="(item, idx) in order.items" :key="idx" class="flex gap-2 items-start">
              <select 
                v-model="item.product" 
                @change="updateItemPrice(idx)"
                class="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none"
              >
                <option disabled value="">Select a product</option>
                <option class="font-semibold">Ultima Stem Plus</option>
                <option class="font-semibold">Ultima Stem Plus Business Package</option>
                <option class="font-semibold">Ultima Stem Plus Executive Package</option>
                <option class="font-semibold">Ultima Stem Plus Elite Package</option>
                <option>BerryOrac</option>
                <option>Berberine</option>
                <option>Bloom Gluta</option>
                <option>Equi C</option>
                <option>Nucleanse</option>
                <option>Spirulina</option>
                <option>Carvacrol</option>
              </select>
              <input v-model.number="item.qty" type="number" min="1" class="w-20 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none" />
              <div class="w-24 text-sm font-medium text-gray-700 text-center py-2">
                {{ formatPrice(getProductPrice(item.product) * item.qty) }}
              </div>
              <button v-if="order.items.length > 1" type="button" @click="removeItem(idx)" class="text-red-600 px-2 rounded hover:bg-red-50 transition-colors duration-200">Remove</button>
            </div>
          </div>
          <p v-if="errors.items" class="text-xs text-red-600 mt-1">{{ errors.items }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Delivery instructions (optional)</label>
          <textarea v-model="order.delivery_instructions" rows="2" class="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[rgb(105,30,104)] outline-none"></textarea>
        </div>

        <!-- Order Total Display -->
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold text-purple-800">Order Total:</span>
            <span class="text-2xl font-bold text-[rgb(105,30,104)]">{{ formatPrice(orderTotal) }}</span>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <input id="accept" v-model="order.accept_terms" type="checkbox" class="mt-1 focus:ring-2 focus:ring-[rgb(105,30,104)] rounded" />
          <label for="accept" class="text-sm text-gray-700">I agree to be contacted regarding this order.</label>
        </div>
        <p v-if="errors.accept_terms" class="text-xs text-red-600 mt-1">{{ errors.accept_terms }}</p>

        <div class="flex items-center gap-3 flex-wrap">
          <button type="button" @click="emit('close')" class="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">Cancel</button>

          <button type="submit" :disabled="submitting" class="px-4 py-2 bg-[rgb(105,30,104)] text-white rounded-lg font-semibold hover:bg-[rgb(125,40,124)] disabled:opacity-60 transition-colors duration-200 flex items-center gap-2">
            <span v-if="!submitting">Submit Order</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting…
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.98) translateY(6px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-fade-in { animation: fade-in 180ms ease-out; }

.modal-scroll { -webkit-overflow-scrolling: touch; }
</style>