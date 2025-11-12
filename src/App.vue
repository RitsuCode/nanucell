<template>
  <div>
    <!-- Show main app or admin based on current view -->
    <div v-if="currentView === 'main'">
      <Navbar @show-admin="currentView = 'admin-login'" />
      <Hero />
      <Benefits />
      <DoctorsSection />
      <ProductsGrid />
      <BestSeller />
      <Packages />
      <CustomerReviews />
      <VideoTestimonials />
      <Contacts />
    </div>

    <!-- Admin Login -->
    <AdminLogin 
      v-else-if="currentView === 'admin-login'" 
      @login="handleAdminLogin"
      @back="currentView = 'main'"
    />

    <!-- Admin Dashboard -->
    <AdminDashboard 
      v-else-if="currentView === 'admin-dashboard'" 
      @logout="handleAdminLogout"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Benefits from './components/Benefits.vue'
import DoctorsSection from './components/DoctorsSection.vue';
import ProductsGrid from './components/ProductsGrid.vue';
import BestSeller from './components/BestSeller.vue';
import Packages from './components/Packages.vue';
import CustomerReviews from './components/CustomerReviews.vue';
import VideoTestimonials from './components/VideoTestimonials.vue';
import Contacts from './components/Contacts.vue';
import AdminLogin from './components/AdminLogin.vue';
import AdminDashboard from './components/AdminDashboard.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Hero,
    Benefits,
    DoctorsSection,
    ProductsGrid,
    Packages,
    CustomerReviews,
    VideoTestimonials,
    Contacts,
    AdminLogin,
    AdminDashboard
  },
  setup() {
    const currentView = ref('main')

    // Check if user was already logged in
    onMounted(() => {
      const isAuthenticated = localStorage.getItem('adminAuthenticated')
      if (isAuthenticated) {
        currentView.value = 'admin-dashboard'
      }
    })

    const handleAdminLogin = () => {
      currentView.value = 'admin-dashboard'
    }

    const handleAdminLogout = () => {
      currentView.value = 'main'
    }

    return {
      currentView,
      handleAdminLogin,
      handleAdminLogout
    }
  }
}
</script>