import { reactive } from 'vue'

export const cartStore = reactive({
  items: [],

  addItem(product) {
    // If product already exists, optionally increase quantity
    const existing = this.items.find((p) => p.name === product.name)
    if (existing) {
      existing.quantity++
    } else {
      this.items.push({ ...product, quantity: 1 })
    }
  },

  removeItem(name) {
    this.items = this.items.filter((p) => p.name !== name)
  },

  clearCart() {
    this.items = []
  },
})
