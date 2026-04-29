// src/pages/admin/Upload.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

// Centralized Firebase imports from services/
import { 
  uploadProductImage, 
  fetchProductImages, 
  deleteProductImage 
} from '../../services/firebaseProducts';
import { logout } from '../../services/firebaseAuth';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const imageList = await fetchProductImages();
      setImages(imageList);
    } catch (error) {
      console.error('Error fetching images:', error);
      showMessage('error', 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file || !imageName.trim()) {
      showMessage('error', 'Please select an image and enter a name');
      return;
    }

    setUploading(true);
    try {
      await uploadProductImage(file, imageName.trim());
      showMessage('success', 'Image uploaded successfully');
      
      // Reset form
      setFile(null);
      setImageName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Refresh image list
      await loadImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      showMessage('error', 'Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image) => {
    const confirmed = window.confirm('Delete ' + image.name + '?');
    if (!confirmed) return;

    try {
      await deleteProductImage(image);
      showMessage('success', 'Image deleted');
      await loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      showMessage('error', 'Delete failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
      showMessage('error', 'Logout failed');
    }
  };

  return (
    <div className="upload-page">
      <div className="admin-header">
        <h1>Image Management - Churreria Carmelo</h1>
        <button onClick={handleLogout} className="logout-btn">Sign Out</button>
      </div>

      {/* Status message */}
      {message.text && (
        <div className={`status-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Upload form */}
      <div className="upload-section">
        <h2>Upload New Image</h2>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label htmlFor="imageName">Product Name:</label>
            <input
              id="imageName"
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="Example: Classic Churros"
              required
              disabled={uploading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageFile">Select Image:</label>
            <input
              id="imageFile"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              required
              disabled={uploading}
            />
          </div>
          <button type="submit" disabled={uploading || !file || !imageName.trim()}>
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>

      {/* Images gallery */}
      <div className="gallery-section">
        <h2>Image Gallery ({images.length})</h2>
        
        {loading ? (
          <p className="loading">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="empty">No images uploaded yet</p>
        ) : (
          <div className="images-grid">
            {images.map((image) => (
              <div key={image.url || image.fileName} className="image-card">
                <img src={image.url} alt={image.name} loading="lazy" />
                <div className="image-info">
                  <h3>{image.name}</h3>
                  <button 
                    onClick={() => handleDelete(image)}
                    className="delete-btn"
                    disabled={uploading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;