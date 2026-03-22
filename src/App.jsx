import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Carta from './pages/carta/Carta';
import Contacto from './pages/contacto/Contacto';
import Blog from './pages/blog/Blog';
import Layout from './components/layout/Layout';
import Historia from './pages/historia/Historia';
import Trabajanos from './pages/trabajanos/Trabajanos';
import RssPage from './pages/rss/RssPage';
import Pedido from './pages/pedido/Pedido';
import Login from './pages/admin/Login';
import Upload from './pages/admin/Upload';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/trabajanos" element={<Trabajanos />} />
          <Route path="/rss" element={<RssPage />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/admin" element={<Login />} />
        <Route path="/admin/upload" element={<Upload />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;