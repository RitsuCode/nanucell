<template>
  <section class="bg-gray-100 py-8">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row items-center justify-between bg-[rgb(221,223,224)] rounded-lg shadow-lg overflow-hidden">
        <!-- Left side with image - Full width on mobile -->
        <div class="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col items-center">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)] mb-6 text-center">
            Best Seller!
          </h2>
          <div class="w-full max-w-xs md:max-w-sm lg:max-w-md flex items-center justify-center">
            <img 
              src="../assets/images/UltimaStemPack.png" 
              alt="Ultima Stem Pack" 
              class="w-full object-contain"
            />
          </div>
        </div>

        <!-- Right side with content - Full width on mobile -->
        <div class="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 animate-gradient bg-gradient-to-r from-yellow-400 via-purple-800 to-yellow-600 bg-[length:200%_auto] text-transparent bg-clip-text drop-shadow-xl">
            Buy 2 Bottles now and get 25% off on your next purchase!
          </h3>
          
          <div class="flex flex-col sm:flex-row items-center gap-3 mb-8">
            <span class="text-3xl md:text-4xl lg:text-5xl font-bold animate-gradient bg-gradient-to-r from-yellow-400 via-purple-800 to-yellow-600 bg-[length:200%_auto] text-transparent bg-clip-text drop-shadow-xl">
              23,800 PHP
            </span>
            <span class="text-xl md:text-2xl bg-gradient-to-r from-yellow-400 via-purple-800 to-yellow-600 bg-[length:200%_auto] text-transparent bg-clip-text drop-shadow-xl">
              only!
            </span>
          </div>

          <button @click="addToCart" 
                  class="bg-yellow-400 text-white px-8 py-4 rounded-lg text-2xl md:text-3xl font-bold 
                       transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-500 active:scale-95 shadow-lg w-full max-w-xs lg:w-auto">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from './../stores/cart.js'

const cartStore = useCartStore()

const addToCart = () => {
  const product = {
    name: 'Ultima Stem Plus',
    price: '₱11,940.00',
    qty: 2
  }
  
  cartStore.addToCart(product)
  console.log(`Added ${product.name} to cart`)
}
</script>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  animation: gradient 3s linear infinite alternate;
}
</style>