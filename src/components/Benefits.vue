<template>
  <div class="bg-[rgb(105,30,104)] text-white py-8">
    <div class="container mx-auto px-4">
      <!-- Certifications - Horizontal on all screens -->
      <div class="flex flex-row flex-wrap justify-center gap-4 md:gap-6 mb-8">
        <div class="flex flex-col items-center text-center w-20 md:w-24 lg:w-32">
          <img src="../assets/images/FDA.png" alt="FDA" class="h-10 md:h-12 lg:h-16 mb-1 md:mb-2" />
          <span class="text-xs md:text-sm">FDA Approved</span>
        </div>
        <div class="flex flex-col items-center text-center w-20 md:w-24 lg:w-32">
          <img src="../assets/images/Organic.png" alt="Organic" class="h-10 md:h-12 lg:h-16 mb-1 md:mb-2" />
          <span class="text-xs md:text-sm">100% Organic</span>
        </div>
        <div class="flex flex-col items-center text-center w-20 md:w-24 lg:w-32">
          <img src="../assets/images/GMP.png" alt="GMP" class="h-10 md:h-12 lg:h-16 mb-1 md:mb-2" />
          <span class="text-xs md:text-sm">GMP</span>
        </div>
        <div class="flex flex-col items-center text-center w-20 md:w-24 lg:w-32">
          <img src="../assets/images/Halal.png" alt="Halal" class="h-10 md:h-12 lg:h-16 mb-1 md:mb-2" />
          <span class="text-xs md:text-sm">HALAL Approved</span>
        </div>
      </div>

      <!-- Benefits Section with Video -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Video Section - Full width on mobile -->
        <div class="w-full lg:w-1/3">
          <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <iframe
              class="w-full aspect-video lg:aspect-[9/16] rounded-lg"
              :src="embedUrl"
              allow="autoplay; encrypted-media"
              allowfullscreen
              style="border: none;"
            ></iframe>
          </div>
        </div>

        <!-- Benefits Content -->
        <div class="w-full lg:w-2/3">
          <h2 class="text-3xl md:text-4xl font-bold text-yellow-500 mb-8 text-center lg:text-left">
            Ultima Stem Cell Plus Benefits
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="text-center lg:text-left p-4">
              <h3 class="text-xl md:text-2xl font-normal mb-3">Cellular Regeneration</h3>
              <p class="text-gray-200 text-base md:text-lg font-thin">
                Activates stem cell renewal, helping your body replace old and damaged cells with new, healthy ones.
              </p>
            </div>

            <div class="text-center lg:text-left p-4">
              <h3 class="text-xl md:text-2xl font-normal mb-3">Anti-Aging & Longevity Support</h3>
              <p class="text-gray-200 text-base md:text-lg font-thin">
                Promotes youthful function at the cellular level for healthier tissues, skin, and overall vitality.
              </p>
            </div>

            <div class="text-center lg:text-left p-4">
              <h3 class="text-xl md:text-2xl font-normal mb-3">DNA Repair & Protection</h3>
              <p class="text-gray-200 text-base md:text-lg font-thin">
                Supports natural DNA repair mechanisms, slowing cellular aging at the source.
              </p>
            </div>

            <div class="text-center lg:text-left p-4">
              <h3 class="text-xl md:text-2xl font-normal mb-3">Mitochondrial Energy Boost</h3>
              <p class="text-gray-200 text-base md:text-lg font-thin">
                Enhances cellular energy production, giving you stamina and vitality throughout the day.
              </p>
            </div>

            <div class="text-center lg:text-left p-4">
              <h3 class="text-xl md:text-2xl font-normal mb-3">Brain & Cognitive Health</h3>
              <p class="text-gray-200 text-base md:text-lg font-thin">
                Protects neurons, supports sharper memory, and enhances focus.
              </p>
            </div>

            <div class="text-center lg:text-left p-4">
              <h3 class="text-xl md:text-2xl font-normal mb-3">Antioxidant Defense</h3>
              <p class="text-gray-200 text-base md:text-lg font-thin">
                Neutralizes oxidative stress to protect your body from premature aging and chronic damage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Benefits',
  data() {
    return {
      embedUrl: 'https://drive.google.com/file/d/1FkrJpFxGj4CvZfQr8Oh01oq1AcjcdT1g/preview'
    }
  }
}
</script>