// src/services/firebaseProducts.js
import { db } from '../../firebase/config';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase/config';

const PRODUCTS_COLLECTION = 'products';
const IMAGES_COLLECTION = 'menuImages';
const IMAGES_FOLDER = 'images';

/**
 * Add a new product to Firestore
 * @param {Object} productData - Product data object
 * @returns {Promise<Object>} Created product with ID
 */
export const addProduct = async (productData) => {
  try {
    // Support both English and Spanish field names for backward compatibility
    const nameValue = productData.name || productData.nombre || 'Unnamed Product';
    const categoryValue = productData.category || productData.categoria || 'Uncategorized';
    const descriptionValue = productData.description || productData.descripcion || '';
    const priceValue = productData.price || productData.precio || 0;
    
    // Validate required fields
    if (!nameValue || nameValue.trim() === '') {
      throw new Error('Product name is required');
    }
    
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      name: nameValue.trim(),
      price: parseFloat(priceValue) || 0,
      category: categoryValue.trim(),
      description: descriptionValue.trim(),
      image: productData.image || '',
      isAvailable: productData.isAvailable !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return { id: docRef.id, name: nameValue, price: priceValue, category: categoryValue };
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

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
 * Fetch a single product by ID
 * @param {string} productId - Product document ID
 * @returns {Promise<Object>} Product object
 */
export const fetchProductById = async (productId) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    const docSnap = await getDocs(query(collection(db, PRODUCTS_COLLECTION), where('__name__', '==', productId)));
    
    if (!docSnap.empty) {
      return { id: docSnap.docs[0].id, ...docSnap.docs[0].data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

/**
 * Update an existing product
 * @param {string} productId - Product document ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<boolean>} Success status
 */
export const updateProduct = async (productId, productData) => {
  try {
    // Implementation requires updateDoc import
    // This is a placeholder for future implementation
    console.log('Update functionality to be implemented');
    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product from Firestore
 * @param {string} productId - Product document ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * Fetch all available categories
 * @returns {Promise<Array>} Array of unique category names
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
    
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Upload product image to Firebase Storage and save metadata to Firestore
 * @param {File} file - Image file to upload
 * @param {string} productName - Name of the product
 * @returns {Promise<Object>} Image metadata with URL
 */
export const uploadProductImage = async (file, productName) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileName = timestamp + '_' + file.name.replace(/\s+/g, '_').toLowerCase();
    const filePath = IMAGES_FOLDER + '/' + fileName;
    
    // Upload to Firebase Storage
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    // Save metadata to Firestore
    const imageMetadata = {
      name: productName,
      url: downloadURL,
      fileName: fileName,
      filePath: filePath,
      uploadedAt: new Date().toISOString(),
      size: file.size,
      type: file.type
    };
    
    await addDoc(collection(db, IMAGES_COLLECTION), imageMetadata);
    
    return {
      name: productName,
      url: downloadURL,
      fileName: fileName
    };
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
};

/**
 * Fetch all product images from Storage and Firestore
 * @returns {Promise<Array>} Array of image objects with metadata
 */
export const fetchProductImages = async () => {
  try {
    // List all images in Storage folder
    const imagesRef = ref(storage, IMAGES_FOLDER);
    const result = await listAll(imagesRef);
    
    // Get download URLs for each image
    const imagePromises = result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return {
        name: itemRef.name,
        url: url,
        ref: itemRef,
        fullPath: itemRef.fullPath
      };
    });
    
    return await Promise.all(imagePromises);
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error;
  }
};

/**
 * Delete a product image from Storage and Firestore
 * @param {Object} image - Image object with ref property
 * @returns {Promise<boolean>} Success status
 */
export const deleteProductImage = async (image) => {
  try {
    if (!image || !image.ref) {
      throw new Error('Invalid image object');
    }
    
    // Delete from Firebase Storage
    await deleteObject(image.ref);
    
    // Delete metadata from Firestore
    const querySnapshot = await getDocs(collection(db, IMAGES_COLLECTION));
    
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      if (data.url === image.url || data.fileName === image.name) {
        await deleteDoc(docSnap.ref);
        break;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting product image:', error);
    throw error;
  }
};

/**
 * Filter products by availability status
 * @param {boolean} isAvailable - Filter by availability
 * @returns {Promise<Array>} Filtered products
 */
export const fetchProductsByAvailability = async (isAvailable) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('isAvailable', '==', isAvailable)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching products by availability:', error);
    throw error;
  }
};

/**
 * Search products by name or description
 * @param {string} searchTerm - Search query
 * @returns {Promise<Array>} Matching products
 */
export const searchProducts = async (searchTerm) => {
  try {
    // Note: Firestore does not support full-text search natively
    // This fetches all products and filters client-side
    // For production, consider using Algolia or Firebase Extensions
    const allProducts = await fetchProducts();
    const lowerSearch = searchTerm.toLowerCase();
    
    return allProducts.filter(product => 
      (product.name && product.name.toLowerCase().includes(lowerSearch)) ||
      (product.description && product.description.toLowerCase().includes(lowerSearch)) ||
      (product.category && product.category.toLowerCase().includes(lowerSearch))
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};