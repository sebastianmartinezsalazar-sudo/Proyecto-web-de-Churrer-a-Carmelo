export const readCSV = (text) => {
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const currentLine = lines[i].split(',');
    const obj = {};
    
    headers.forEach((header, index) => {
      const normalizedHeader = header
        .replace('categoría', 'category')
        .replace('categoria', 'category')
        .replace('descripción', 'descripcion')
        .replace('descripcion', 'descripcion');
      obj[header] = currentLine[index]?.trim() || '';
    });
    
    data.push(obj);
  }
  
  return data;
};

export const readJSON = (text) => {
  return JSON.parse(text);
};

export const readXML = (text) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, 'text/xml');
  const productos = xmlDoc.getElementsByTagName('producto');
  
  const data = [];
  for (let i = 0; i < productos.length; i++) {
    const prod = productos[i];
    const item = {};
    
    for (let j = 0; j < prod.children.length; j++) {
      const child = prod.children[j];
      item[child.tagName] = child.textContent;
    }
    
    data.push(item);
  }
  
  return data;
};

export const handleFileUpload = async (acceptFormat) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptFormat;
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      
      const text = await file.text();
      resolve({ file, text });
    };
    
    input.onerror = reject;
    input.click();
  });
};