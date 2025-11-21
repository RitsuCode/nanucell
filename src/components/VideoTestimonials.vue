<template>
  <section class="py-3 bg-white">
    <div class="container mx-auto px-4">
      <!-- Two columns with equal height and centered alignment -->
      <div class="flex flex-col lg:flex-row gap-8 items-center justify-center">
        <!-- Video Section - Same height as carousel -->
        <div class="w-full flex justify-center">
          <div class="w-full sm:w-1/2 shadow-lg rounded-lg">
            <iframe
              class="w-full aspect-[9/16] bg-black"
              :src="video"
              allow="autoplay; encrypted-media"
              allowfullscreen
              style="border: none;"
            ></iframe>
          </div>
        </div>

        <!-- Carousel Section - Same height as video -->
        <div class="w-full lg:w-3/5 flex items-center justify-center lg:mr-48">
          <div class="w-full max-w-4xl border-2 rounded-lg border-gray-200 overflow-hidden bg-white shadow-lg">
            <div
              class="relative bg-white rounded-lg overflow-hidden w-full"
              @mouseenter="pauseAuto"
              @mouseleave="startAuto"
            >
              <!-- Main Image Display - Same height as video -->
              <div class="relative h-80 sm:h-96 flex items-center justify-center bg-[rgb(221,223,224)]">
                <template v-if="images.length">
                  <img
                    :src="images[current]"
                    :alt="imageAlts[current] || `slide-${current}`"
                    class="max-h-full max-w-full object-contain transition-opacity duration-700"
                  />
                </template>
                <template v-else>
                  <div class="text-gray-400">No images found</div>
                </template>

                <!-- Navigation Buttons -->
                <button
                  v-if="images.length"
                  @click="prev"
                  class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:scale-105"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  v-if="images.length"
                  @click="next"
                  class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:scale-105"
                  aria-label="Next"
                >
                  ›
                </button>
              </div>

              <!-- Thumbnails -->
              <div
                class="px-4 py-3 bg-white flex items-center gap-3 overflow-x-auto justify-center shadow-md border-t-2 border-gray-200"
              >
                <template v-for="(img, i) in images" :key="i">
                  <button
                    @click="goTo(i)"
                    class="flex-none rounded-md overflow-hidden border-2 transition-transform"
                    :class="i === current ? 'border-[rgb(105,30,104)] scale-105' : 'border-transparent'"
                  >
                    <img
                      :src="img"
                      :alt="imageAlts[i] || `thumb-${i}`"
                      class="w-20 h-20 object-cover"
                      loading="lazy"
                    />
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Use the Google Drive preview link (make sure file is "Anyone with the link: Viewer")
const video = 'https://drive.google.com/file/d/1UvUzJcXoAFDXdM5xOeuTDFo3gzbkW0vs/preview'

// import images dynamically
const modules = import.meta.glob('../assets/images/reviews/*.{png,jpg,jpeg,webp}', { eager: true })
const images = []
const imageAlts = []

for (const path of Object.keys(modules)) {
  const mod = modules[path]
  const src = mod?.default ?? (typeof mod === 'string' ? mod : null)
  if (!src) continue
  images.push(src)
  const fname = path.split('/').pop().replace(/\.[^/.]+$/, '')
  imageAlts.push(decodeURIComponent(fname).replace(/[-_]/g, ' '))
}

// carousel state
const current = ref(0)
const intervalMs = 4000
let timer = null

function next() { if (!images.length) return; current.value = (current.value + 1) % images.length }
function prev() { if (!images.length) return; current.value = (current.value - 1 + images.length) % images.length }
function goTo(i) { if (!images.length) return; current.value = i }
function startAuto() { if (timer || images.length <= 1) return; timer = setInterval(next, intervalMs) }
function pauseAuto() { if (!timer) return; clearInterval(timer); timer = null }

onMounted(() => startAuto())
onUnmounted(() => pauseAuto())
</script>

<style scoped>
/* small niceties */
::-webkit-scrollbar { height: 8px; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 999px; }
</style>