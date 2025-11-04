<template>
  <section id="products" class="py-8 md:py-12 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-purple-800 mb-6 text-center md:text-left">Shop More Nanucell Products!</h2>

      <div v-if="loading" class="text-gray-500 text-center py-8">Loading products...</div>
      <div v-else-if="products.length === 0" class="text-gray-500 text-center py-8">No product images found in src/assets/images/products</div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
            <h3 class="text-sm md:text-lg font-semibold text-purple-800 break-words line-clamp-2">{{ product.name }}</h3>
            <p class="text-xs text-gray-500 mt-1">{{ product.intake }}</p>

            <!-- Price and Button -->
            <div class="mt-2 md:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <div class="text-sm md:text-lg font-bold text-gray-800">{{ product.price }}</div>
              <button
                @click="addToCart(product)"
                class="bg-purple-800 text-white text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 rounded transition hover:bg-purple-700 active:scale-95 whitespace-nowrap flex-shrink-0 w-full sm:w-auto mt-1 sm:mt-0"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from './../stores/cart.js'

const editableProducts = [
  { file: 'BerryOrac', name: 'BerryOrac', intake: '3.1g / 12 Sachets', price: '1,608 PHP' },
  { file: 'Berberine', name: 'Berberine', intake: '500mg / capsule', price: '5,950 PHP' },
  { file: 'Bloom Gluta', name: 'Bloom Gluta', intake: '500mg / capsule', price: '1,804 PHP' },
  { file: 'Carvacrol', name: 'Carvacrol', intake: '500mg / softgel', price: '1,795 PHP' },
  { file: 'Equi C', name: 'Equi C', intake: '250mg / tablet', price: '1,625 PHP' },
  { file: 'Nucleanse', name: 'Nucleanse', intake: '3.1g / sachet', price: '2,220 PHP' },
  { file: 'Spirulina', name: 'Spirulina', intake: '250mg / tablet', price: '1,698 PHP' },
]

const cartStore = useCartStore()
const loading = ref(true)
const products = ref([])

// Add to cart function
const addToCart = (product) => {
  cartStore.addToCart(product)
  console.log(`Added ${product.name} to cart`)
}

try {
  const modules = import.meta.glob('../assets/images/products/*.{png,jpg,jpeg}', { eager: true })
  const imagesMap = Object.entries(modules).reduce((acc, [path, mod]) => {
    const fname = path.split('/').pop().replace(/\.[^/.]+$/, '')
    const src = mod && mod.default ? mod.default : (typeof mod === 'string' ? mod : null)
    if (src) acc[fname] = src
    return acc
  }, {})

  const seen = new Set()
  const list = []

  for (const e of editableProducts) {
    const src = imagesMap[e.file]
    if (!src) {
      if (e.name && e.file) {
        list.push({
          src: '',
          name: e.name,
          intake: e.intake || '500mg / capsule',
          price: e.price || '5,950 PHP'
        })
      }
      continue
    }
    seen.add(e.file)
    list.push({
      src,
      name: e.name || e.file,
      intake: e.intake || '500mg / capsule',
      price: e.price || '5,950 PHP'
    })
  }

  for (const [fname, src] of Object.entries(imagesMap)) {
    if (seen.has(fname)) continue
    list.push({
      src,
      name: fname.replace(/[-_]/g, ' '),
      intake: '500mg / capsule',
      price: '5,950 PHP'
    })
  }

  products.value = list
} catch (err) {
  console.error('Error loading product images:', err)
} finally {
  loading.value = false
}
</script>

<style scoped>
h3 { 
  word-wrap: break-word; 
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>