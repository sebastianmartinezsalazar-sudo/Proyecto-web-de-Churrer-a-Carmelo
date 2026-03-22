import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { storage, db } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imagesRef = ref(storage, 'images');
      const result = await listAll(imagesRef);
      
      const imagePromises = result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const name = itemRef.name;
        return { name, url, ref: itemRef };
      });
      
      const imageList = await Promise.all(imagePromises);
      setImages(imageList);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !imageName) {
      alert('Por favor selecciona una imagen y un nombre');
      return;
    }

    setUploading(true);
    try {
      // Subir imagen a Firebase Storage
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      
      // Obtener URL de descarga
      const downloadURL = await getDownloadURL(storageRef);
      
      // Guardar metadata en Firestore
      await addDoc(collection(db, 'menuImages'), {
        name: imageName,
        url: downloadURL,
        uploadedAt: new Date().toISOString()
      });

      alert('¡Imagen subida exitosamente!');
      setFile(null);
      setImageName('');
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image) => {
    if (!confirm(`¿Eliminar ${image.name}?`)) return;

    try {
      // Eliminar de Storage
      await deleteObject(image.ref);
      
      // Eliminar de Firestore
      const querySnapshot = await getDocs(collection(db, 'menuImages'));
      querySnapshot.forEach(async (doc) => {
        if (doc.data().url === image.url) {
          await deleteDoc(doc.ref);
        }
      });

      alert('Imagen eliminada');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error al eliminar: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  return (
    <div className="upload-page">
      <div className="admin-header">
        <h1>📸 CRUD de Imágenes - Churrería Carmelo</h1>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </div>

      {/* Formulario de subida */}
      <div className="upload-section">
        <h2>Subir Nueva Imagen</h2>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label>Nombre del producto:</label>
            <input
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="Ej: Churros Clásicos"
              required
            />
          </div>
          <div className="form-group">
            <label>Seleccionar imagen:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" disabled={uploading}>
            {uploading ? 'Subiendo...' : '📤 Subir Imagen'}
          </button>
        </form>
      </div>

      {/* Galería de imágenes */}
      <div className="gallery-section">
        <h2>Galería de Imágenes ({images.length})</h2>
        {loading ? (
          <p>Cargando imágenes...</p>
        ) : images.length === 0 ? (
          <p>No hay imágenes subidas aún</p>
        ) : (
          <div className="images-grid">
            {images.map((image, index) => (
              <div key={index} className="image-card">
                <img src={image.url} alt={image.name} />
                <div className="image-info">
                  <h3>{image.name}</h3>
                  <button 
                    onClick={() => handleDelete(image)}
                    className="delete-btn"
                  >
                    🗑️ Eliminar
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