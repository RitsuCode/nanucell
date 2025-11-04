<template>
  <nav
    class="sticky top-0 flex justify-between items-center bg-white/60 backdrop-blur-md text-purple-900 px-4 md:px-8 py-3 md:py-4 shadow-lg z-50"
  >
    <!-- Logo -->
    <div class="text-2xl font-bold bg-logo bg-no-repeat bg-contain w-32 md:w-48 h-10 md:h-14"></div>

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex space-x-6 items-center text-lg">
      <li>
        <a href="#packages" :class="linkClass('packages')" @click.prevent="scrollToSection('packages')">Packages</a>
      </li>
      <li>
        <a href="#products" :class="linkClass('products')" @click.prevent="scrollToSection('products')">More Products</a>
      </li>
      <li>
        <a href="#reviews" :class="linkClass('reviews')" @click.prevent="scrollToSection('reviews')">Reviews</a>
      </li>
      <li>
        <a href="#contacts" :class="linkClass('contacts')" @click.prevent="scrollToSection('contacts')">Contacts</a>
      </li>
      <li>
        <button 
          @click="$emit('show-admin')" 
          class="hover:text-yellow-400 font-medium text-lg flex items-center gap-1"
        >
          Admin
        </button>
      </li>

      <!-- Shop Now Button with Cart Count -->
      <div class="relative">
        <div class="bg-purple-900 p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-purple-800 active:scale-95">
          <li>
            <button @click="showShopModal = true" class="text-yellow-300 font-semibold hover:animate-none flex items-center gap-2">
              Shop Now!
              <!-- Cart Item Count Badge -->
              <span v-if="cartStore.getTotalItems() > 0" class="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {{ cartStore.getTotalItems() }}
              </span>
            </button>
          </li>
        </div>
      </div>
    </ul>

    <!-- Mobile Menu Button -->
    <div class="md:hidden flex items-center space-x-4">
      <!-- Mobile Shop Now Button with Cart Count -->
      <div class="relative">
        <button 
          @click="showShopModal = true" 
          class="bg-purple-900 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-purple-800 active:scale-95 relative"
        >
          <span class="text-yellow-300 font-semibold text-sm">Shop</span>
          <!-- Cart Item Count Badge -->
          <span v-if="cartStore.getTotalItems() > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {{ cartStore.getTotalItems() }}
          </span>
        </button>
      </div>
      
      <!-- Hamburger Menu -->
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="p-2 rounded-lg transition-colors duration-300 hover:bg-purple-100"
        :class="{ 'bg-purple-100': isMobileMenuOpen }"
      >
        <svg 
          class="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            v-if="!isMobileMenuOpen"
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path 
            v-else
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-white/60 backdrop-blur-md z-40 md:hidden mt-16"
      @click="isMobileMenuOpen = false"
    >
      <div 
        class="container bg-white/90 backdrop-blur-md mx-auto px-4 py-8"
        @click.stop
      >
        <!-- Mobile Navigation Links -->
        <ul class="flex flex-col space-y-6 text-xl">
          <li>
            <a 
              href="#packages" 
              :class="[...linkClass('packages'), 'block py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-purple-50']" 
              @click.prevent="handleMobileNavClick('packages')"
            >
              Packages
            </a>
          </li>
          <li>
            <a 
              href="#products" 
              :class="[...linkClass('products'), 'block py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-purple-50']" 
              @click.prevent="handleMobileNavClick('products')"
            >
              More Products
            </a>
          </li>
          <li>
            <a 
              href="#reviews" 
              :class="[...linkClass('reviews'), 'block py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-purple-50']" 
              @click.prevent="handleMobileNavClick('reviews')"
            >
              Reviews
            </a>
          </li>
          <li>
            <a 
              href="#contacts" 
              :class="[...linkClass('contacts'), 'block py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-purple-50']" 
              @click.prevent="handleMobileNavClick('contacts')"
            >
              Contacts
            </a>
          </li>
          
        </ul>

        <!-- Mobile Shop Now Button with Cart Count -->
        <div class="mt-8 relative">
          <button 
            @click="handleMobileShopClick"
            class="w-full bg-purple-900 text-yellow-300 font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-purple-800 active:scale-95 text-lg shadow-lg flex items-center justify-center gap-2"
          >
            Shop Now!
            <!-- Cart Item Count Badge -->
            <span v-if="cartStore.getTotalItems() > 0" class="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {{ cartStore.getTotalItems() }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Teleport modal to body so it's not constrained by the sticky nav -->
  <teleport to="body">
    <ShopNowModal
      v-if="showShopModal"
      @close="showShopModal = false"
      @submit="handleShopSubmit"
    />
  </teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ShopNowModal from './ShopNowModal.vue'
import { useCartStore } from './../stores/cart.js'

const active = ref('')
const showShopModal = ref(false)
const isMobileMenuOpen = ref(false)

// Initialize cart store
const cartStore = useCartStore()

function handleShopSubmit(payload) {
  // Example: you can POST to your Django endpoint here.
  // For now we just log; replace with fetch/axios as needed.
  console.log('Order submitted payload:', payload)

  // Example (commented):
  // fetch('/api/orders/', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload)
  // }).then(r => r.json()).then(res => { ... }).catch(err => { ... })
}

// Handle mobile navigation clicks
function handleMobileNavClick(id) {
  scrollToSection(id)
  isMobileMenuOpen.value = false
}

// Handle mobile shop button click
function handleMobileShopClick() {
  showShopModal.value = true
  isMobileMenuOpen.value = false
}

// Smooth scroll to section id
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    active.value = id
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    active.value = ''
  }
}

function linkClass(id) {
  const baseClasses = [
    'hover:text-yellow-400',
    'font-medium',
    active.value === id ? 'text-[rgb(105,30,104)] font-semibold' : ''
  ]
  return baseClasses
}

let observer = null
onMounted(() => {
  const sections = ['packages', 'products', 'reviews', 'contacts']
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = e.target.id
      })
    },
    { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
  )
  sections.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>