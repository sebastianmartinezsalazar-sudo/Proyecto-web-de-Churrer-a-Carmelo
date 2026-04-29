// src/services/firebaseStorage.js
import { storage } from '../../firebase/config';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  listAll, 
  deleteObject,
  uploadBytesResumable
} from 'firebase/storage';

const DEFAULT_FOLDER = 'uploads';

/**
 * Upload a file to Firebase Storage
 * @param {File} file - File to upload
 * @param {string} folder - Destination folder (optional)
 * @param {string} customName - Custom filename (optional)
 * @returns {Promise<Object>} File metadata with download URL
 */
export const uploadFile = async (file, folder = DEFAULT_FOLDER, customName = null) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    
    // Generate filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '_');
    const fileName = customName || (timestamp + '_' + originalName);
    const filePath = folder + '/' + fileName;
    
    // Upload file
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return {
      name: fileName,
      url: downloadURL,
      path: filePath,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Upload file with progress tracking
 * @param {File} file - File to upload
 * @param {string} folder - Destination folder
 * @param {Function} onProgress - Progress callback (0-100)
 * @returns {Promise<Object>} File metadata with download URL
 */
export const uploadFileWithProgress = async (file, folder = DEFAULT_FOLDER, onProgress = null) => {
  try {
    const timestamp = Date.now();
    const fileName = timestamp + '_' + file.name.replace(/\s+/g, '_');
    const filePath = folder + '/' + fileName;
    
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(Math.round(progress));
          }
        },
        (error) => {
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            name: fileName,
            url: downloadURL,
            path: filePath,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString()
          });
        }
      );
    });
  } catch (error) {
    console.error('Error in uploadFileWithProgress:', error);
    throw error;
  }
};

/**
 * List all files in a folder
 * @param {string} folderPath - Path to list
 * @returns {Promise<Array>} Array of file references
 */
export const listFiles = async (folderPath = DEFAULT_FOLDER) => {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    return result.items;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

/**
 * Get download URL for a file
 * @param {string} filePath - Path to file in Storage
 * @returns {Promise<string>} Download URL
 */
export const getFileURL = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
};

/**
 * Delete a file from Storage
 * @param {string} filePath - Path to file in Storage
 * @returns {Promise<boolean>} Success status
 */
export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Delete file by reference object
 * @param {Object} fileRef - Firebase Storage reference object
 * @returns {Promise<boolean>} Success status
 */
export const deleteFileByRef = async (fileRef) => {
  try {
    if (!fileRef) {
      throw new Error('Invalid file reference');
    }
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error('Error deleting file by ref:', error);
    throw error;
  }
};