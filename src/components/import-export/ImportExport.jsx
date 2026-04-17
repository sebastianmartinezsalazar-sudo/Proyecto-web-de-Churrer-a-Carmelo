import { useState } from 'react';
import { 
  saveFileInFormat, 
  convertToCSV, 
  convertToXML 
} from '../../utils/file-export';
import { 
  readCSV, 
  readJSON, 
  readXML, 
  handleFileUpload 
} from '../../utils/file-import';
import { addProduct } from '../../services/firebaseProducts';
import './ImportExport.css';

const ImportExport = ({ products }) => {
  const [importFormat, setImportFormat] = useState('csv');
  const [exportFormat, setExportFormat] = useState('csv');
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    try {
      setLoading(true);
      const acceptMap = {
        'csv': '.csv,text/csv',
        'json': '.json,application/json',
        'xml': '.xml,text/xml'
      };
      
      const { text } = await handleFileUpload(acceptMap[importFormat]);
      
      let data = [];
      switch (importFormat) {
        case 'csv':
          data = readCSV(text);
          break;
        case 'json':
          data = readJSON(text);
          break;
        case 'xml':
          data = readXML(text);
          break;
        default:
          break;
      }
      
      // Guardar en Firebase
      for (const item of data) {
        await addProduct({
          nombre: item.nombre || item.name,
          precio: parseFloat(item.precio || item.price || 0),
          categoria: item.categoria || item.category,
          descripcion: item.descripcion || item.description
        });
      }
      
      alert(` ${data.length} productos importados correctamente`);
      
    } catch (error) {
      console.error('Error importing:', error);
      alert('Error al importar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      
      if (!products || products.length === 0) {
        alert(' No hay productos para exportar');
        return;
      }
      
      let content = '';
      let fileName = `productos-churreria-${new Date().toISOString().split('T')[0]}`;
      
      switch (exportFormat) {
        case 'csv':
          content = convertToCSV(products);
          break;
        case 'json':
          content = JSON.stringify(products, null, 2);
          break;
        case 'xml':
          content = convertToXML(products);
          break;
        default:
          break;
      }
      
      await saveFileInFormat(exportFormat, content, fileName);
      
    } catch (error) {
      console.error('Error exporting:', error);
      alert(' Error al exportar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="import-export-container">
      <h2> Importar Datos</h2>
      <div className="import-section">
        <select 
          value={importFormat} 
          onChange={(e) => setImportFormat(e.target.value)}
          className="format-select"
        >
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select>
        <button 
          onClick={handleImport} 
          className="btn-import"
          disabled={loading}
        >
          {loading ? 'Importando...' : ' Seleccionar Archivo'}
        </button>
      </div>

      <h2> Exportar Datos</h2>
      <div className="export-section">
        <select 
          value={exportFormat} 
          onChange={(e) => setExportFormat(e.target.value)}
          className="format-select"
        >
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select>
        <button 
          onClick={handleExport} 
          className="btn-export"
          disabled={loading}
        >
          {loading ? 'Exportando...' : ` Exportar (${products?.length || 0} productos)`}
        </button>
      </div>
    </div>
  );
};

export default ImportExport;