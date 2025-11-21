<template>
  <section class=" bg-white">
    <div class="container mx-auto px-4  shadow-lg rounded-lg">
      <div class="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
        <!-- Left: Doctors Image - Full width on mobile, 2/3 on desktop -->
        <div class="w-full lg:w-2/3 md:p-6 flex items-center justify-center order-1">
          <img :src="doctorsImg" alt="Doctors" class="w-full max-w-md lg:max-w-full object-contain" />
        </div>

        <!-- Right: Video - Full width on mobile, 1/3 on desktop -->
        <div class="w-full lg:w-1/3 flex items-center justify-center sm:w-3/4 rounded-xl order-2">
          <div class="w-full max-w-sm lg:max-w-full sm:max-w-sm p-10 rounded-lg overflow-hidden">
            <iframe
              class="w-full sm:w-11/12 aspect-[9/16] rounded-lg shadow-lg border-solid border-4 border-[rgb(105,30,104)]"
              :src="docVideo"
              allow="autoplay; encrypted-media"
              allowfullscreen
              style="border:rgb(from color 0 0 0);"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import doctorsImg from '../assets/images/Doctors.png'

// Use the Google Drive link directly
const docVideo = 'https://drive.google.com/file/d/1FkrJpFxGj4CvZfQr8Oh01oq1AcjcdT1g/preview'
</script>

<style scoped>
/* Responsive image sizing */
@media (max-width: 1024px) {
  img.object-contain { 
    max-width: 400px; 
  }
}

@media (max-width: 768px) {
  img.object-contain { 
    max-width: 320px; 
  }
}
</style>