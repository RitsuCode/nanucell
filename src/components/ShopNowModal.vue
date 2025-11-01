<script setup>
import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from 'vue'

/**
 * Emits:
 *  - close: closes the modal
 *  - submit: (payload) - plain JS object with the order details
 */
const emit = defineEmits(['close', 'submit'])

const nameInput = ref(null)

const order = reactive({
  name: '',
  email: '',
  contact: '',
  address: { street: '', city: '', province: '', postal: '' },
  delivery_instructions: '',
  items: [{ product: '', qty: 1 }],
  preferred_date: '',
  preferred_time: '',
  payment_method: 'cash',
  accept_terms: false
})

const errors = reactive({
  name: '', email: '', contact: '', address: '', items: '', accept_terms: ''
})

const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const contactRE = /^[\d+\s\-()]{7,20}$/

function addItem() {
  order.items.push({ product: '', qty: 1 })
  errors.items = ''
}
function removeItem(i) {
  if (order.items.length > 1) order.items.splice(i, 1)
}

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
  if (badItem) { errors.items = 'Provide product name and quantity (>=1) for each item'; valid = false }
  if (!order.accept_terms) { errors.accept_terms = 'You must agree to be contacted'; valid = false }

  return valid
}

const submitting = ref(false)
const successMessage = ref('')

async function submitOrder() {
  if (!validate()) return

  submitting.value = true

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
    items: order.items.map(i => ({ product: i.product.trim(), qty: Number(i.qty) })),
    preferred_date: order.preferred_date || null,
    preferred_time: order.preferred_time || null,
    payment_method: order.payment_method
  }

  // Send the payload to parent to handle (server-side POST, storage, etc.)
  emit('submit', toRaw(payload))

  // UX: quick success feedback then close
  successMessage.value = 'Order submitted — thank you!'
  setTimeout(() => {
    successMessage.value = ''
    submitting.value = false
    emit('close')
    resetForm()
  }, 900)
}

function resetForm() {
  order.name = ''; order.email = ''; order.contact = ''
  order.address = { street: '', city: '', province: '', postal: '' }
  order.delivery_instructions = ''; order.items = [{ product: '', qty: 1 }]
  order.preferred_date = ''; order.preferred_time = ''; order.payment_method = 'cash'
  order.accept_terms = false
  Object.keys(errors).forEach(k => (errors[k] = ''))
}

/* Accessibility & UX: lock body scroll, focus first input, escape key */
function onKeyDown(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  // lock background scroll while modal open
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeyDown)
  // focus first input
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
    @click.self="emit('close')"
  >
    <!-- overlay -->
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- card -->
    <div
      class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fade-in max-h-[90vh] overflow-y-auto z-10 modal-scroll"
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
      <p class="text-sm text-gray-500 text-center mb-4">We’ll contact you to confirm details</p>

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
              <option value="cash">Cash on delivery</option>
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
            <input v-model="order.address.city" type="text" placeholder="City" class="border border-gray-200 rounded-lg px-3 py-2" />
            <input v-model="order.address.province" type="text" placeholder="Province" class="border border-gray-200 rounded-lg px-3 py-2" />
            <input v-model="order.address.postal" type="text" placeholder="Postal (optional)" class="border border-gray-200 rounded-lg px-3 py-2" />
          </div>
          <p v-if="errors.address" class="text-xs text-red-600 mt-1">{{ errors.address }}</p>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-gray-700">Order items</label>
            <button type="button" @click="addItem" class="text-sm text-[rgb(105,30,104)] hover:underline">+ Add line</button>
          </div>

          <div class="space-y-2">
            <div v-for="(item, idx) in order.items" :key="idx" class="flex gap-2">
              <input v-model="item.product" type="text" placeholder="Product name" class="flex-1 border border-gray-200 rounded-lg px-3 py-2" />
              <input v-model.number="item.qty" type="number" min="1" class="w-24 border border-gray-200 rounded-lg px-3 py-2" />
              <button v-if="order.items.length > 1" type="button" @click="removeItem(idx)" class="text-red-600 px-2 rounded hover:bg-red-50">Remove</button>
            </div>
          </div>
          <p v-if="errors.items" class="text-xs text-red-600 mt-1">{{ errors.items }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Delivery instructions (optional)</label>
          <textarea v-model="order.delivery_instructions" rows="2" class="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2"></textarea>
        </div>

        <div class="flex items-start gap-3">
          <input id="accept" v-model="order.accept_terms" type="checkbox" class="mt-1" />
          <label for="accept" class="text-sm text-gray-700">I agree to be contacted regarding this order.</label>
        </div>
        <p v-if="errors.accept_terms" class="text-xs text-red-600 mt-1">{{ errors.accept_terms }}</p>

        <div class="flex items-center gap-3">
          <button type="button" @click="emit('close')" class="px-4 py-2 border border-gray-200 rounded-lg">Cancel</button>

          <button type="submit" :disabled="submitting" class="px-4 py-2 bg-[rgb(105,30,104)] text-white rounded-lg font-semibold hover:bg-[rgb(125,40,124)] disabled:opacity-60">
            <span v-if="!submitting">Submit Order</span>
            <span v-else>Submitting…</span>
          </button>

          <div class="ml-auto text-sm text-green-600" v-if="successMessage">{{ successMessage }}</div>
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

/* smooth momentum when scrolling inside modal on mobile */
.modal-scroll { -webkit-overflow-scrolling: touch; }
</style>
