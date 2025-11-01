<template>
  <section id="contacts">
    <div class="container mx-auto">
      <div
        class="rounded-t-lg overflow-hidden shadow-lg bg-[rgb(105,30,104)] text-white flex flex-col md:flex-row items-center md:items-stretch gap-6 md:p-6"
      >
        <!-- Left: contact details -->
        <div class="w-full md:w-1/3 text-center md:text-left">
          <h3 class="text-xl md:text-2xl font-semibold mb-3">Contact us</h3>
          <div class="h-px bg-white/30 w-3/4 mx-auto md:mx-0 mb-4"></div>

          <ul class="space-y-3 text-base md:text-lg">
            <li class="flex flex-col md:flex-row md:items-start gap-2 md:gap-3">
              <div class="flex items-center justify-center md:justify-start gap-2">
                <MapPin class="w-5 h-5 text-white/90 flex-shrink-0" />
                <span class="font-medium md:hidden">Address:</span>
              </div>
              <span class="text-center md:text-left text-sm md:text-base">
                Building 2, 999 Cabangan Pt. 2209, Subic, Philippines
              </span>
            </li>

            <li class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <div class="flex items-center justify-center md:justify-start gap-2">
                <Mail class="w-5 h-5 text-white/90 flex-shrink-0" />
                <span class="font-medium md:hidden">Email:</span>
              </div>
              <a
                class="underline underline-offset-2 text-white/95 text-sm md:text-base text-center md:text-left break-all"
                href="mailto:nanuhealthshop@gmail.com"
              >
                nanuhealthshop@gmail.com
              </a>
            </li>

            <li class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <div class="flex items-center justify-center md:justify-start gap-2">
                <Phone class="w-5 h-5 text-white/90 flex-shrink-0" />
                <span class="font-medium md:hidden">Phone:</span>
              </div>
              <a
                class="underline underline-offset-2 text-white/95 text-sm md:text-base text-center md:text-left"
                href="tel:+639274179538"
              >
                0927 417 9538
              </a>
            </li>
          </ul>
        </div>

        <!-- Center: logo -->
        <div class="w-full md:w-1/3 flex items-center justify-center my-4 md:my-0">
          <img :src="logo" alt="Nanucell logo" class="max-h-20 md:max-h-28 object-contain" />
        </div>

        <!-- Right: social -->
        <div class="w-full md:w-1/3 text-center md:text-left">
          <h3 class="text-xl md:text-2xl font-semibold mb-3">Check out our page!</h3>
          <div class="h-px bg-white/30 w-3/4 mx-auto md:mx-0 mb-4"></div>

          <div class="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a
              class="flex flex-col sm:flex-row items-center gap-3 text-white hover:scale-105 transition-transform"
              href="https://www.facebook.com/nanucellonlineshop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
              >
                <Facebook class="w-5 h-5 text-white" />
              </div>
              <span class="text-sm md:text-base underline underline-offset-2 text-center sm:text-left break-all">
                www.facebook.com/nanucellonlineshop
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import logo from '../assets/images/LogoWhite.png'
import { MapPin, Mail, Phone, Facebook } from 'lucide-vue-next'
</script>