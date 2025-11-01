<template>
  <section id="packages" class="py-8 md:py-16 relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-yellow-50">
    <!-- Animated background dots -->
    <div class="absolute inset-0 w-full h-full z-0">
      <div class="absolute w-12 h-12 md:w-20 md:h-20 bg-purple-200/50 rounded-full animate-float" style="top: 10%; left: 20%"></div>
      <div class="absolute w-16 h-16 md:w-24 md:h-24 bg-yellow-200/50 rounded-full animate-float-delayed" style="top: 60%; left: 80%"></div>
      <div class="absolute w-20 h-20 md:w-28 md:h-28 bg-purple-100/50 rounded-full animate-float" style="top: 80%; left: 10%"></div>
      <div class="absolute w-24 h-24 md:w-32 md:h-32 bg-yellow-100/50 rounded-full animate-float-delayed" style="top: 30%; left: 60%"></div>
      <!-- New larger dots -->
      <div class="absolute w-28 h-28 md:w-36 md:h-36 bg-purple-100/30 rounded-full animate-float-slow" style="top: 40%; left: 30%"></div>
      <div class="absolute w-32 h-32 md:w-40 md:h-40 bg-yellow-100/30 rounded-full animate-float-slower" style="top: 15%; left: 70%"></div>
      <div class="absolute w-36 h-36 md:w-44 md:h-44 bg-purple-200/30 rounded-full animate-float-slowest" style="top: 70%; left: 40%"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <h2 class="text-2xl md:text-4xl font-bold text-[rgb(105,30,104)] text-center mb-8 md:mb-12">
        Choose from our packages that's right for you!
      </h2>

      <!-- Horizontal scroll container for mobile -->
      <div class="flex md:flex-col lg:flex-row gap-4 md:gap-8 justify-start md:justify-center items-stretch overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
        <!-- Business Package -->
        <div class="bg-[rgb(221,223,224)] backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:shadow-xl border-2 border-[rgb(105,30,104)] min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start relative mt-4 md:mt-0">
          <h3 class="text-xl md:text-2xl font-bold text-[rgb(105,30,104)] mb-2">Business Package</h3>
          <div class="flex items-baseline gap-2 mb-4 md:mb-6">
            <span class="text-2xl md:text-4xl font-bold text-[rgb(105,30,104)]">11,940 PHP</span>
            <span class="text-base md:text-lg text-[rgb(105,30,104)]">only!</span>
          </div>
          <ul class="mb-6 md:mb-8 space-y-2 text-[rgb(105,30,104)] text-sm md:text-base">
            <li>• Get 1 Bottle of Ultima Stem Plus</li>
            <li>• Lifetime membership</li>
            <li>• Get 25% discount on all products</li>
          </ul>
          <button class="w-full bg-yellow-400 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:shadow-xl hover:bg-yellow-400 active:scale-95 text-base md:text-lg">
            BUY NOW
          </button>
        </div>

        <!-- Executive Package -->
        <div class="bg-[rgb(221,223,224)] backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:shadow-xl border-2 border-[rgb(105,30,104)] min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start relative mt-4 md:mt-0">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap z-20">
            MOST POPULAR
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-[rgb(105,30,104)] mb-2 mt-2">Executive Package</h3>
          <div class="flex items-baseline gap-2 mb-4 md:mb-6">
            <span class="text-2xl md:text-4xl font-bold text-[rgb(105,30,104)]">47,760 PHP</span>
            <span class="text-base md:text-lg text-[rgb(105,30,104)]">only!</span>
          </div>
          <ul class="mb-6 md:mb-8 space-y-2 text-[rgb(105,30,104)] text-sm md:text-base">
            <li>• Get 4 Bottles of Ultima Stem Plus</li>
            <li>• Lifetime membership</li>
            <li>• Get 25% discount on all products</li>
          </ul>
          <button class="w-full bg-yellow-400 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:shadow-xl hover:bg-yellow-400 active:scale-95 text-base md:text-lg">
            BUY NOW
          </button>
        </div>

        <!-- Elite Package -->
        <div class="bg-[rgb(221,223,224)] backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:shadow-xl border-2 border-[rgb(105,30,104)] min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start relative mt-4 md:mt-0">
          <h3 class="text-xl md:text-2xl font-bold text-[rgb(105,30,104)] mb-2">Elite Package</h3>
          <div class="flex items-baseline gap-2 mb-4 md:mb-6">
            <span class="text-2xl md:text-4xl font-bold text-[rgb(105,30,104)]">149,000 PHP</span>
            <span class="text-base md:text-lg text-[rgb(105,30,104)]">only!</span>
          </div>
          <ul class="mb-6 md:mb-8 space-y-2 text-[rgb(105,30,104)] text-sm md:text-base">
            <li>• Get 12 Bottles of Ultima Stem Plus</li>
            <li>• 1 Berberine</li>
            <li>• 1 BerryOrac</li>
            <li>• Lifetime membership</li>
            <li>• Get 25% discount on all products</li>
          </ul>
          <button class="w-full bg-yellow-400 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:shadow-xl hover:bg-yellow-400 active:scale-95 text-base md:text-lg">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Packages'
}
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(20px) translateX(-10px);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-30px) translateX(15px);
  }
}

@keyframes float-slower {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(25px) translateX(-20px);
  }
}

@keyframes float-slowest {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-35px) translateX(-25px);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 9s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 15s ease-in-out infinite;
}

.animate-float-slowest {
  animation: float-slowest 18s ease-in-out infinite;
}

/* Add subtle pulse to the Most Popular tag */
@keyframes subtle-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.bg-yellow-400 {
  animation: subtle-pulse 2s infinite;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Snap scrolling for better mobile UX */
.snap-x {
  scroll-snap-type: x mandatory;
}

.snap-start {
  scroll-snap-align: start;
}
</style>