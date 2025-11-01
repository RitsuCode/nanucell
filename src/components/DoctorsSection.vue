<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4 py-4 shadow-lg">
      <div class="flex flex-col lg:flex-row items-start gap-8">
        <!-- Left: single Doctors PNG (takes 2/3 on large screens) -->
        <div class="w-full lg:w-2/3 h-96 p-10 mt-10 flex items-center justify-center">
          <img :src="doctorsImg" alt="Doctors" class="w-full  object-contain" />
        </div>

        <!-- Right: Video (takes 1/3 on large screens) -->
        <div class="w-full lg:w-1/3 flex items-start">
          <iframe
              class="w-full aspect-[4/5] rounded-lg"
              :src="docVideo"
              allow="autoplay; encrypted-media"
              allowfullscreen
              style="max-height: calc(100vh - 120px); border: none;"
            ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import doctorsImg from '../assets/images/Doctors.png'

// Use the Google Drive link directly
const docVideo = 'https://drive.google.com/file/d/1ZpxrrVY3D_FmgksI4fmDCsYaGSun8sPk/preview'
</script>

<style scoped>
/* keep image aspect and responsive spacing */
@media (max-width: 1024px) {
  img.object-contain { max-width: 520px; }
}
</style>