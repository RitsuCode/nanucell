<template>
  <div class="bg-gradient-to-r from-purple-100 to-white">
    <div class="container mx-auto px-4 py-8 md:py-0">
      <div class="flex flex-col lg:flex-row items-center">
        <!-- Image Section - Hidden on mobile, visible on desktop (left side) -->
        <div class="w-full lg:w-1/2 p-4 md:p-6 lg:p-10 lg:px-16 hidden lg:block order-1">
          <img src="../assets/images/UltimaStem.png" alt="Product" class="w-full drop-shadow-lg">
        </div>
        
        <!-- Content Section - Full width on mobile -->
        <div class="w-full lg:w-1/2 order-2 lg:order-2">
          <!-- Subtitle appears first -->
          <p class="text-lg md:text-xl font-bold text-yellow-500 drop-shadow-lg mb-3 md:mb-4 text-center lg:text-left">
            The 1st in the Philippines combining cutting-edge NMN!
          </p>
          
          <!-- Image appears second on mobile -->
          <div class="w-full lg:hidden p-4 mb-4 md:mb-6">
            <img src="../assets/images/UltimaStem.png" alt="Product" class="w-full max-w-md mx-auto drop-shadow-lg">
          </div>
          
          <!-- Headline appears third -->
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-900 mb-4 md:mb-6 text-center lg:text-left">
            The Secret to Your Daily Health.
          </h1>
          
          <!-- Description -->
          <p class="text-base md:text-lg lg:text-xl font-thin text-gray-900 drop-shadow-lg mb-6 md:mb-8 text-center lg:text-left leading-relaxed">
            Nanucell Ultima Stem Plus is a revolutionary supplement that harnesses 
            the power of Beta-Nicotinamide Mononucleotide (NMN), Resveratrol, Curcumin,
            and advanced bioactives to rejuvenate your cells by repairing DNA, stimulating
            stem cell renewal, and regenerating healthy, youthful cells.
          </p>
          
          <!-- Action Section - Split layout on mobile -->
          <div class="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-4">
            <!-- Left Side: Button only on mobile -->
            <div class="w-full sm:w-auto order-1">
              <button class="bg-yellow-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-400 active:scale-95 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-lg md:text-xl w-full sm:w-auto">
                BUY NOW
              </button>
            </div>
            
            <!-- Right Side: Price and Rating on mobile -->
            <div class="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4 md:gap-6 order-2 sm:ml-auto">
              <!-- Price Section -->
              <div class="flex flex-col items-center sm:items-start">
                <span class="text-2xl md:text-3xl lg:text-4xl font-bold">₱11,940.00</span>
                <span class="text-xl md:text-2xl lg:text-4xl font-light">only!</span>
              </div>
              
              <!-- Ratings Section -->
              <div class="flex flex-col items-center sm:items-start">
                <span class="text-2xl md:text-3xl lg:text-4xl text-yellow-400">★★★★★</span>
                <p class="text-sm md:text-base lg:text-lg text-gray-400 text-center sm:text-left">
                  4.8 Average Ratings <br class="hidden sm:block"> by 1000+ users
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero'
}
</script>