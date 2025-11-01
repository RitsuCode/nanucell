<template>
  <div class="bg-[rgb(105,30,104)] text-white">
    <div class="container mx-auto p-4">
      <!-- Certifications -->
      <div class="flex justify-between items-center mb-5 px-10 py-3">
        <div class="flex items-center gap-4">
          <img src="../assets/images/FDA.png" alt="FDA" class="h-20" />
          <span>FDA Approved</span>
        </div>
        <div class="flex items-center gap-4">
          <img src="../assets/images/Organic.png" alt="Organic" class="h-20" />
          <span>100% Organic</span>
        </div>
        <div class="flex items-center gap-4">
          <img src="../assets/images/GMP.png" alt="GMP" class="h-20" />
          <span>GMP</span>
        </div>
        <div class="flex items-center gap-4">
          <img src="../assets/images/Halal.png" alt="Halal" class="h-20" />
          <span>HALAL Approved</span>
        </div>
      </div>

      <!-- Benefits Section with Video -->
      <div class="flex gap-8">
        <!-- Video Section -->
        <div class="w-1/3">
          <div class="sticky top-24 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <iframe
              class="w-full aspect-[9/16] rounded-lg"
              :src="embedUrl"
              allow="autoplay; encrypted-media"
              allowfullscreen
              style="max-height: calc(100vh - 120px); border: none;"
            ></iframe>
          </div>
        </div>

        <!-- Benefits Content -->
        <div class="w-2/3">
          <h2 class="text-4xl font-bold text-yellow-500 mb-12">
            Ultima Stem Cell Plus Benefits
          </h2>
          <div class="grid grid-cols-2 gap-8">
            <div class="text-center">
              <h3 class="text-3xl font-normal mb-4">Cellular Regeneration</h3>
              <p class="text-gray-200 text-xl font-thin">
                Activates stem cell renewal, helping your body replace old and damaged cells with new, healthy ones.
              </p>
            </div>

            <div class="text-center">
              <h3 class="text-3xl font-normal mb-4">Anti-Aging & Longevity Support</h3>
              <p class="text-gray-200 text-xl font-thin">
                Promotes youthful function at the cellular level for healthier tissues, skin, and overall vitality.
              </p>
            </div>

            <div class="text-center">
              <h3 class="text-3xl font-normal mb-4">DNA Repair & Protection</h3>
              <p class="text-gray-200 text-xl font-thin">
                Supports natural DNA repair mechanisms, slowing cellular aging at the source.
              </p>
            </div>

            <div class="text-center">
              <h3 class="text-3xl font-normal mb-4">Mitochondrial Energy Boost</h3>
              <p class="text-gray-200 text-xl font-thin">
                Enhances cellular energy production, giving you stamina and vitality throughout the day.
              </p>
            </div>

            <div class="text-center">
              <h3 class="text-3xl font-normal mb-4">Brain & Cognitive Health</h3>
              <p class="text-gray-200 text-xl font-thin">
                Protects neurons, supports sharper memory, and enhances focus.
              </p>
            </div>

            <div class="text-center">
              <h3 class="text-3xl font-normal mb-4">Antioxidant Defense</h3>
              <p class="text-gray-200 text-xl font-thin">
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
