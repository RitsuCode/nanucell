// src/firebase/index.js
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD0tyorLtUDyvN_BGdnTlInBIR3CmOM0y4",
  authDomain: "nanucell-1113a.firebaseapp.com",
  projectId: "nanucell-1113a",
  storageBucket: "nanucell-1113a.firebasestorage.app",
  messagingSenderId: "18123415584",
  appId: "1:18123415584:web:e21714957bdddea9515c45",
  measurementId: "G-P3QZ21T5DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Auth
export const auth = getAuth(app)

// -------------------------------
// 🔐 AUTH HELPERS
// -------------------------------
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error logging in admin:', error)
    throw error
  }
}

export const logoutAdmin = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

export const watchAuthState = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// -------------------------------
// 📦 FIRESTORE FUNCTIONS
// -------------------------------
export const ordersCollection = collection(db, 'orders')

// Add a new order
export const addOrder = async (order) => {
  try {
    const docRef = await addDoc(ordersCollection, {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding order:', error)
    throw error
  }
}

// Get all orders
export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(ordersCollection)
    const orders = []
    querySnapshot.forEach((d) => {
      orders.push({ id: d.id, ...d.data() })
    })
    return orders
  } catch (error) {
    console.error('Error getting orders:', error)
    throw error
  }
}

// Update an order
export const updateOrder = async (orderId, updates) => {
  try {
    const orderRef = doc(db, 'orders', orderId)
    await updateDoc(orderRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating order:', error)
    throw error
  }
}

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const orderRef = doc(db, 'orders', orderId)
    await deleteDoc(orderRef)
  } catch (error) {
    console.error('Error deleting order:', error)
    throw error
  }
}

// Real-time orders listener
export const subscribeToOrders = (callback) => {
  return onSnapshot(ordersCollection, (snapshot) => {
    const orders = []
    snapshot.forEach((d) => {
      orders.push({ id: d.id, ...d.data() })
    })
    callback(orders)
  }, (err) => {
    console.error('onSnapshot error:', err)
  })
}

export default app
