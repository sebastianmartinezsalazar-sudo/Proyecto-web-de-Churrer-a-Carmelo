// src/components/import-export/ImportExport.jsx
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
      
      // Save to Firebase
      for (const item of data) {
        await addProduct({
          name: item.name || item.nombre,
          price: parseFloat(item.price || item.precio || 0),
          category: item.category || item.categoria,
          description: item.description || item.descripcion
        });
      }
      
      alert(data.length + ' products imported successfully');
      
    } catch (error) {
      console.error('Error importing:', error);
      alert('Error importing: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      
      if (!products || products.length === 0) {
        alert('No products to export');
        return;
      }
      
      let content = '';
      let fileName = 'products-churreria-' + new Date().toISOString().split('T')[0];
      
      switch (exportFormat) {
        case 'csv':
          content = convertToCSV(products);
          break;
        case 'json':
          
          content = products;
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
      alert('Error exporting: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="import-export-container">
      <h2>Import Data</h2>
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
          {loading ? 'Importing...' : 'Select File'}
        </button>
      </div>

      <h2>Export Data</h2>
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
          {loading ? 'Exporting...' : 'Export (' + (products?.length || 0) + ' products)'}
        </button>
      </div>
    </div>
  );
};

export default ImportExport;