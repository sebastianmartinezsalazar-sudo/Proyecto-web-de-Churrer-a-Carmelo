export const downloadFile = (content, fileName, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const saveFileInFormat = async (format, data, fileName = "datos") => {
  let description = "";
  let mimeType = "";
  let content = "";
  let extension = format;

  switch (format) {
    case "json":
      description = "JSON";
      mimeType = "application/json";
      content = JSON.stringify(data, null, 2);
      break;
    case "xml":
      description = "XML";
      mimeType = "text/xml";
      content = data; // XML debe ser pasado como string
      break;
    case "csv":
      description = "CSV";
      mimeType = "text/csv";
      content = data; // CSV debe ser pasado como string
      break;
    default:
      throw new Error(`Formato no soportado: ${format}`);
  }

  // Si el navegador soporta File System Access API
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `${fileName}.${extension}`,
        types: [{
          description: `${description} File`,
          accept: { [mimeType]: [`.${extension}`] }
        }]
      });
      
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
    } catch (err) {
      console.error('Error al guardar:', err);
      // Fallback: download normal
      downloadFile(content, `${fileName}.${extension}`, mimeType);
    }
  } else {
    // Fallback para navegadores que no soportan File System Access API
    downloadFile(content, `${fileName}.${extension}`, mimeType);
  }
};

// Funciones helper para convertir datos
export const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(fieldName => 
        JSON.stringify(row[fieldName], (key, value) => value === null ? '' : value)
      ).join(',')
    )
  ];
  
  return csvRows.join('\n');
};

export const convertToXML = (data) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<productos>\n';
  
  data.forEach(item => {
    xml += '  <producto>\n';
    Object.keys(item).forEach(key => {
      xml += `    <${key}>${item[key]}</${key}>\n`;
    });
    xml += '  </producto>\n';
  });
  
  xml += '</productos>';
  return xml;
};