// src/services/firebaseProducts.js
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const PRODUCTS_COLLECTION = 'products';

/**
 * Fetch all products from Firestore
 * @returns {Promise<Array>} Array of product objects
 */
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch products filtered by category
 * @param {string} category - Category to filter by
 * @returns {Promise<Array>} Filtered array of products
 */
export const fetchProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

/**
 * Fetch all available categories
 * @returns {Promise<Array>} Array of unique categories
 */
export const fetchCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const categories = new Set();
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.category && data.isAvailable) {
        categories.add(data.category);
      }
    });
    return Array.from(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};