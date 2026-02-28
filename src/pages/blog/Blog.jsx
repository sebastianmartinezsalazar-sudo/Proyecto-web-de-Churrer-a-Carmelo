import { useState, useEffect } from 'react';
import './Blog.css';

const RSS_FEED = 'https://rss.app/feeds/test.xml';

const mockRSSItems = [
    {
        title: "El arte de hacer churros tradicionales",
        description: "Descubre los secretos de la masa perfecta y el aceite ideal para freír.",
        link: "#",
        pubDate: "2025-02-25",
        source: "Gastronomía Española"
    },
    {
        title: "Chocolate español: historia y tradición",
        description: "Desde los aztecas hasta las churrerías modernas, el chocolate tiene una larga historia.",
        link: "#",
        pubDate: "2025-02-20",
        source: "Historia Gastronómica"
    },
    {
        title: "Los mejores desayunos de España",
        description: "Churros con chocolate encabezan la lista de desayunos favoritos de los españoles.",
        link: "#",
        pubDate: "2025-02-15",
        source: "Turismo Gastronómico"
    },
    {
        title: "Cómo mantener el aceite limpio en tu freidora",
        description: "Consejos profesionales para alargar la vida del aceite y mantener el sabor.",
        link: "#",
        pubDate: "2025-02-10",
        source: "Tips de Cocina"
    },
    {
        title: "Eventos y catering: lleva los churros a tu fiesta",
        description: "Servicio de churrería móvil para bodas, cumpleaños y eventos corporativos.",
        link: "#",
        pubDate: "2025-02-05",
        source: "Eventos Canarias"
    }
];
const Blog = () => {
  // State management
  const [rssItems, setRssItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fetch RSS data on component mount
  useEffect(() => {
    const fetchRSS = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data (in production, you would fetch from RSS API)
        setRssItems(mockRSSItems);
        setHasError(false);
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRSS();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="blog-page">
        <div className="blog-loading">Loading news...</div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="blog-page">
        <div className="blog-error">Error loading news. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Blog & Noticias</h1>
        <p>Últimas novedades sobre churrería y gastronomía</p>
      </div>

      <div className="blog-container">
        {rssItems.map((item, index) => (
          <article key={index} className="blog-card">
            <div className="blog-card-header">
              <span className="blog-source">{item.source}</span>
              <span className="blog-date">{item.pubDate}</span>
            </div>
            <h2 className="blog-title">{item.title}</h2>
            <p className="blog-description">{item.description}</p>
            <a href={item.link} className="blog-link" target="_blank" rel="noopener noreferrer">
              Leer más →
            </a>
          </article>
        ))}
      </div>

      <div className="blog-footer">
        <p>Feed RSS actualizado diariamente | Powered by RSS.app</p>
      </div>
    </div>
  );
};

export default Blog;
