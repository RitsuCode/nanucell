<template>
  <section id="reviews" class="py-8 bg-[rgb(105,30,104)]">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Customer Reviews</h2>

      <!-- Horizontal scroll container for mobile -->
      <div class="flex md:grid md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
        <!-- Review Card 1 -->
        <div class="bg-white p-4 md:p-6 w-80 md:w-full h-72 md:h-80 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex flex-col flex-shrink-0 md:flex-shrink snap-start">
          <div class="flex text-yellow-400 text-2xl md:text-4xl mb-2">
            ★★★★<span class="text-gray-300">★</span>
          </div>
          <div class="text-gray-600 text-sm md:text-base mb-2">4 out of 5</div>
          <div class="flex-grow overflow-y-auto">
            <p class="text-gray-800 text-sm md:text-base mb-4">
              "Wala na yung mass sa left breast ko... Totally nawala na.. Yan ang result ng MRI ko khpon lang. Laking tulong ng Ultima Stem Plus..."
            </p>
          </div>
          <p class="text-purple-800 italic text-xs md:text-sm mt-auto">- Anonymous, Philippines</p>
        </div>

        <!-- Review Card 2 -->
        <div class="bg-white p-4 md:p-6 w-80 md:w-full h-72 md:h-80 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex flex-col flex-shrink-0 md:flex-shrink snap-start">
          <div class="flex text-yellow-400 text-2xl md:text-4xl mb-2">
            ★★★★★
          </div>
          <div class="text-gray-600 text-sm md:text-base mb-2">5 out of 5</div>
          <div class="flex-grow overflow-y-auto">
            <p class="text-gray-800 text-sm md:text-base mb-4">
              "After two weeks of taking Ultima Stem Plus with Berberine, mas malakas at mas bata ang pakiramdam ko—hindi na kailangan ng hospitalization."
            </p>
          </div>
          <p class="text-purple-800 italic text-xs md:text-sm mt-auto">- Willie Del Rosario, Seattle, USA</p>
        </div>

        <!-- Review Card 3 -->
        <div class="bg-white p-4 md:p-6 w-80 md:w-full h-72 md:h-80 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex flex-col flex-shrink-0 md:flex-shrink snap-start">
          <div class="flex text-yellow-400 text-2xl md:text-4xl mb-2">
            ★★★★★
          </div>
          <div class="text-gray-600 text-sm md:text-base mb-2">5 out of 5</div>
          <div class="flex-grow overflow-y-auto">
            <p class="text-gray-800 text-sm md:text-base mb-4">
              "Nag take din po ako 2 tabs each... 3 times a day... napansin ko po na sumasabay na sa ihi ko yong stones na durog. Nag undergo po kasi ako ng procedure break kidney stones last 3 months ago."
            </p>
          </div>
          <p class="text-purple-800 italic text-xs md:text-sm mt-auto">- Anonymous, Philippines</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CustomerReviews'
}
</script>

<style scoped>
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