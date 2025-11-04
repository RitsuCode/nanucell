// src/stores/cart.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  
  function addToCart(product) {
    const existingItem = cartItems.value.find(item => item.name === product.name)
    if (existingItem) {
      existingItem.qty += product.qty || 1
    } else {
      cartItems.value.push({
        name: product.name,
        qty: product.qty || 1,
        price: product.price,
        intake: product.intake
      })
    }
  }
  
  function removeFromCart(productName) {
    const index = cartItems.value.findIndex(item => item.name === productName)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }
  
  function updateQuantity(productName, newQty) {
    const item = cartItems.value.find(item => item.name === productName)
    if (item) {
      if (newQty < 1) {
        removeFromCart(productName)
      } else {
        item.qty = newQty
      }
    }
  }
  
  function clearCart() {
    cartItems.value = []
  }
  
  // FIXED: This now sums all quantities instead of counting line items
  function getTotalItems() {
    return cartItems.value.reduce((total, item) => total + item.qty, 0)
  }
  
  // NEW: Get total number of unique products (line items)
  function getUniqueItemsCount() {
    return cartItems.value.length
  }
  
  return { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getTotalItems,
    getUniqueItemsCount
  }
})