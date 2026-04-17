import { useState, useEffect } from 'react';
import ImportExport from './components/import-export/ImportExport';
import { fetchProducts, addProduct } from './services/firebaseProducts';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Función para importar productos a Firebase
  const handleImport = async (data) => {
    for (const product of data) {
      await addProduct({
        nombre: product.nombre || product.name,
        precio: parseFloat(product.precio || product.price || 0),
        categoria: product.categoria || product.category,
        descripcion: product.descripcion || product.description
      });
    }
    // Recargar productos después de importar
    const updatedProducts = await fetchProducts();
    setProducts(updatedProducts);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="dashboard">
      <h1> Dashboard de Administración</h1>
      
      {/* Componente Import/Export */}
      <ImportExport 
        products={products} 
        onImport={handleImport}
      />
      
      {/* Lista de productos */}
      <div className="products-section">
        <h2>Productos ({products.length})</h2>
        {/* Tu código actual de productos */}
      </div>
    </div>
  );
};

export default Dashboard;