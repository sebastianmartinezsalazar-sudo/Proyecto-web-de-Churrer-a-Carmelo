import { useState, useEffect } from 'react';
import './RssPage.css';

const RssPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/rss/news.xml')
      .then(response => response.text())
      .then(xmlString => {
        const parser = new DOMParser();
        const data = parser.parseFromString(xmlString, "text/xml");
        
        const parseError = data.querySelector('parsererror');
        if (parseError) {
          console.error('Error al parsear:', parseError.textContent);
          return;
        }
        
        const items = data.querySelectorAll("item");
        console.log('📰 Items encontrados:', items.length);
        
        const parsed = Array.from(items).map(item => ({
          title: item.querySelector("title")?.textContent,
          link: item.querySelector("link")?.textContent,
          description: item.querySelector("description")?.textContent,
          pubDate: item.querySelector("pubDate")?.textContent
        }));
        
        setItems(parsed);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="rss-page">
      <h1>Noticias / News</h1>
       <div style={{textAlign: 'center', marginBottom: '2rem'}}>
      <a 
        href="/rss/news.xml" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 20px',
          background: '#e67e22',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          fill="white" 
          viewBox="0 0 16 16"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-4a5.5 5.5 0 0 0-5.5 5.5H0A7.5 7.5 0 0 1 7.5 5v2zm0-4a9.5 9.5 0 0 0-9.5 9.5H2A11.5 11.5 0 0 1 13.5 3v2z"/>
        </svg>
        Suscribirse al Feed RSS
      </a>
    </div>
      <p className="rss-description">Últimas noticias de Churrería Carmelo</p>
      
      {items.length === 0 ? (
        <p>Cargando noticias...</p>
      ) : (
        items.map((item, index) => (
          <article key={index} className="rss-item">
            <h3><a href={item.link}>{item.title}</a></h3>
            <p>{item.description}</p>
            <time>{new Date(item.pubDate).toLocaleDateString('es-ES')}</time>
          </article>
        ))
      )}
    </div>
  );
};

export default RssPage;