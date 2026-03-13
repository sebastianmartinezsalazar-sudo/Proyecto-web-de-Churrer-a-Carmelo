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
          console.error('❌ Error al parsear:', parseError.textContent);
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
      .catch(error => console.error('❌ Error:', error));
  }, []);

  return (
    <div className="rss-page">
      <h1>Noticias / News</h1>
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