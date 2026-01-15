<template>
  <section id="products" class="py-8 md:py-12 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-purple-800 mb-6 text-center md:text-left">
        Shop More Nanucell Products!
      </h2>

      <div v-if="loading" class="text-gray-500 text-center py-8">
        Loading products...
      </div>

      <div v-else-if="products.length === 0" class="text-gray-500 text-center py-8">
        No product images found in src/assets/images/products
      </div>

      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
      >
        <article
          v-for="(product, idx) in products"
          :key="idx"
          class="bg-white rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
        >
          <!-- Product Image -->
          <div class="w-full h-32 sm:h-40 md:h-48 flex items-center justify-center bg-gray-50 rounded-lg shadow-sm overflow-hidden p-2">
            <img
              :src="product.src"
              :alt="product.name"
              class="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <!-- Product Info -->
          <div class="mt-2 md:mt-3 flex-1 flex flex-col">
            <h3 class="text-sm md:text-lg font-semibold text-purple-800 line-clamp-2">
              {{ product.name }}
            </h3>
            <p class="text-xs text-gray-500 mt-1">{{ product.intake }}</p>

            <!-- Price + Button -->
            <div class="mt-2 md:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <div class="text-sm md:text-lg font-bold text-gray-800">
                {{ formatPrice(product.price) }}
              </div>
              <button
                @click="addToCart(product)"
                class="bg-purple-800 text-white text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 rounded transition hover:bg-purple-700 active:scale-95 w-full sm:w-auto"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-purple-900 text-white px-6 py-4 rounded-lg shadow-xl z-50"
      >
        <p class="font-semibold">Added to cart 🛒</p>
        <p class="text-sm">
          <span class="text-yellow-400 font-semibold">{{ addedProduct }} has been added.</span>
          
        </p>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from './../stores/cart.js'
import { productPrices, formatPrice } from './../data/products.js'

const cartStore = useCartStore()

const loading = ref(true)
const products = ref([])

const showToast = ref(false)
const addedProduct = ref('')

// Add to cart
const addToCart = (product) => {
  cartStore.addToCart(product)

  addedProduct.value = product.name
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Product definitions
const editableProducts = [
  { file: 'BerryOrac', name: 'BerryOrac', intake: '3.1g / 12 Sachets', price: productPrices['BerryOrac'] },
  { file: 'Berberine', name: 'Berberine', intake: '500mg / capsule', price: productPrices['Berberine'] },
  { file: 'Bloom Gluta', name: 'Bloom Gluta', intake: '500mg / capsule', price: productPrices['Bloom Gluta'] },
  { file: 'Carvacrol', name: 'Carvacrol', intake: '500mg / softgel', price: productPrices['Carvacrol'] },
  { file: 'Equi C', name: 'Equi C', intake: '250mg / tablet', price: productPrices['Equi C'] },
  { file: 'Nucleanse', name: 'Nucleanse', intake: '3.1g / sachet', price: productPrices['Nucleanse'] },
  { file: 'Spirulina', name: 'Spirulina', intake: '250mg / tablet', price: productPrices['Spirulina'] },
]

try {
  const modules = import.meta.glob('../assets/images/products/*.{png,jpg,jpeg}', { eager: true })

  const imagesMap = Object.entries(modules).reduce((acc, [path, mod]) => {
    const fname = path.split('/').pop().replace(/\.[^/.]+$/, '')
    const src = mod?.default || mod
    if (src) acc[fname] = src
    return acc
  }, {})

  const seen = new Set()
  const list = []

  const ultimaProducts = [
    { file: 'ultima-stem-plus', name: 'Ultima Stem Plus', intake: 'Premium stem cell supplement', price: productPrices['Ultima Stem Plus'] },
    { file: 'ultima-business', name: 'Ultima Stem Plus Business Package', intake: 'Business package', price: productPrices['Ultima Stem Plus Business Package'] },
    { file: 'ultima-executive', name: 'Ultima Stem Plus Executive Package', intake: 'Executive package', price: productPrices['Ultima Stem Plus Executive Package'] },
    { file: 'ultima-elite', name: 'Ultima Stem Plus Elite Package', intake: 'Elite package', price: productPrices['Ultima Stem Plus Elite Package'] },
  ]

  for (const e of ultimaProducts) {
    if (imagesMap[e.file]) {
      seen.add(e.file)
      list.push({ src: imagesMap[e.file], ...e })
    }
  }

  for (const e of editableProducts) {
    if (imagesMap[e.file]) {
      seen.add(e.file)
      list.push({ src: imagesMap[e.file], ...e })
    }
  }

  products.value = list
} catch (err) {
  console.error('Error loading product images:', err)
} finally {
  loading.value = false
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
