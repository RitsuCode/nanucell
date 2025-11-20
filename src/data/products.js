// src/data/products.js
export const productPrices = {
  'Ultima Stem Plus': 11940,
  'Ultima Stem Plus Business Package': 11940,
  'Ultima Stem Plus Executive Package': 47760,
  'Ultima Stem Plus Elite Package': 149000,
  'BerryOrac': 1608,
  'Berberine': 5950,
  'Bloom Gluta': 1804,
  'Equi C': 1625,
  'Nucleanse': 2220,
  'Spirulina': 1698,
  'Carvacrol': 1795
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(price)
}

export const getProductPrice = (productName) => {
  return productPrices[productName] || 0
}

export const calculateOrderTotal = (items) => {
  return items.reduce((total, item) => {
    const price = getProductPrice(item.product)
    return total + (price * item.qty)
  }, 0)
}