<template>
  <section
    id="packages"
    class="py-8 md:py-16 relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-yellow-50"
  >
    <!-- Animated background dots -->
    <div class="absolute inset-0 w-full h-full z-0">
      <div class="absolute w-12 h-12 md:w-20 md:h-20 bg-purple-200/50 rounded-full animate-float" style="top: 10%; left: 20%"></div>
      <div class="absolute w-16 h-16 md:w-24 md:h-24 bg-yellow-200/50 rounded-full animate-float-delayed" style="top: 60%; left: 80%"></div>
      <div class="absolute w-20 h-20 md:w-28 md:h-28 bg-purple-100/50 rounded-full animate-float" style="top: 80%; left: 10%"></div>
      <div class="absolute w-24 h-24 md:w-32 md:h-32 bg-yellow-100/50 rounded-full animate-float-delayed" style="top: 30%; left: 60%"></div>
      <div class="absolute w-28 h-28 md:w-36 md:h-36 bg-purple-100/30 rounded-full animate-float-slow" style="top: 40%; left: 30%"></div>
      <div class="absolute w-32 h-32 md:w-40 md:h-40 bg-yellow-100/30 rounded-full animate-float-slower" style="top: 15%; left: 70%"></div>
      <div class="absolute w-36 h-36 md:w-44 md:h-44 bg-purple-200/30 rounded-full animate-float-slowest" style="top: 70%; left: 40%"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <h2 class="text-2xl md:text-4xl font-bold text-[rgb(105,30,104)] text-center mb-8 md:mb-12">
        Choose from our packages that's right for you!
      </h2>

      <div class="flex md:flex-col lg:flex-row gap-4 md:gap-8 justify-start md:justify-center items-stretch overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">

        <!-- Business Package -->
        <div class="bg-[rgb(221,223,224)] rounded-xl p-6 md:p-8 shadow-lg transition-all hover:scale-105 md:hover:scale-110 border-2 border-[rgb(105,30,104)] min-w-[280px] snap-start">
          <h3 class="text-xl md:text-2xl font-bold text-[rgb(105,30,104)] mb-2">
            Business Package
          </h3>
          <div class="flex items-baseline gap-2 mb-6">
            <span class="text-2xl md:text-4xl font-bold text-[rgb(105,30,104)]">11,940 PHP</span>
            <span class="text-base md:text-lg text-[rgb(105,30,104)]">only!</span>
          </div>
          <ul class="mb-6 space-y-2 text-[rgb(105,30,104)] text-sm md:text-base">
            <li>• Get 1 Bottle of Ultima Stem Plus</li>
            <li>• Lifetime membership</li>
            <li>• Get 25% discount on all products</li>
          </ul>
          <button
            @click="addPackage('Ultima Stem Plus Business Package', '11,940 PHP')"
            class="w-full bg-yellow-400 text-white py-3 rounded-lg font-bold hover:scale-105 active:scale-95"
          >
            BUY NOW
          </button>
        </div>

        <!-- Executive Package -->
        <div class="bg-[rgb(221,223,224)] rounded-xl p-6 md:p-8 shadow-lg transition-all hover:scale-105 md:hover:scale-110 border-2 border-[rgb(105,30,104)] min-w-[280px] snap-start relative">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            MOST POPULAR
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-[rgb(105,30,104)] mb-2 mt-4">
            Executive Package
          </h3>
          <div class="flex items-baseline gap-2 mb-6">
            <span class="text-2xl md:text-4xl font-bold text-[rgb(105,30,104)]">47,760 PHP</span>
            <span class="text-base md:text-lg text-[rgb(105,30,104)]">only!</span>
          </div>
          <ul class="mb-6 space-y-2 text-[rgb(105,30,104)] text-sm md:text-base">
            <li>• Get 4 Bottles of Ultima Stem Plus</li>
            <li>• Lifetime membership</li>
            <li>• Get 25% discount on all products</li>
          </ul>
          <button
            @click="addPackage('Ultima Stem Plus Executive Package', '47,760 PHP')"
            class="w-full bg-yellow-400 text-white py-3 rounded-lg font-bold hover:scale-105 active:scale-95"
          >
            BUY NOW
          </button>
        </div>

        <!-- Elite Package -->
        <div class="bg-[rgb(221,223,224)] rounded-xl p-6 md:p-8 shadow-lg transition-all hover:scale-105 md:hover:scale-110 border-2 border-[rgb(105,30,104)] min-w-[280px] snap-start">
          <h3 class="text-xl md:text-2xl font-bold text-[rgb(105,30,104)] mb-2">
            Elite Package
          </h3>
          <div class="flex items-baseline gap-2 mb-6">
            <span class="text-2xl md:text-4xl font-bold text-[rgb(105,30,104)]">149,000 PHP</span>
            <span class="text-base md:text-lg text-[rgb(105,30,104)]">only!</span>
          </div>
          <ul class="mb-6 space-y-2 text-[rgb(105,30,104)] text-sm md:text-base">
            <li>• Get 12 Bottles of Ultima Stem Plus</li>
            <li>• 1 Berberine</li>
            <li>• 1 BerryOrac</li>
            <li>• Lifetime membership</li>
            <li>• Get 25% discount on all products</li>
          </ul>
          <button
            @click="addPackage('Ultima Stem Plus Elite Package', '149,000 PHP')"
            class="w-full bg-yellow-400 text-white py-3 rounded-lg font-bold hover:scale-105 active:scale-95"
          >
            BUY NOW
          </button>
        </div>
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
          <span class="text-yellow-400 font-semibold">{{ addedProduct }}</span>
          has been added.
        </p>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from './../stores/cart.js'

const cartStore = useCartStore()
const showToast = ref(false)
const addedProduct = ref('')

const addPackage = (name, price) => {
  cartStore.addToCart({
    name,
    price,
    qty: 1
  })

  addedProduct.value = name
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
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
