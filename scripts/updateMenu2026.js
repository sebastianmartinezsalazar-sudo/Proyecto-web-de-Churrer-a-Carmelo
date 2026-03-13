// scripts/updateMenu2026.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCIedhNq8QW3lhRkUeLYl1W7sYEFQmvZY0",
  authDomain: "churreria-carmelo.firebaseapp.com",
  databaseURL: "https://churreria-carmelo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "churreria-carmelo",
  storageBucket: "churreria-carmelo.firebasestorage.app",
  messagingSenderId: "912269341547",
  appId: "1:912269341547:web:865e3a74d733f6ab9d522e",
  measurementId: "G-4F1DEDGG8M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// TODOS los productos del menú Febrero 2026
const products = [
  // BEBIDAS CALIENTES
  { id: 'cafe-solo', name: 'Café Solo', category: 'bebidas-calientes', price: 1.30, descripcion: 'Café espresso solo', imageUrl: '/cafe-solo.jpg' },
  { id: 'cafe-americano', name: 'Café Americano', category: 'bebidas-calientes', price: 1.40, descripcion: 'Café americano largo', imageUrl: '/cafe-americano.jpg' },
  { id: 'cafe-cortado-pequeno', name: 'Café Cortado Pequeño', category: 'bebidas-calientes', price: 1.40, descripcion: 'Café cortado con leche', imageUrl: '/cafe-cortado.jpg' },
  { id: 'cafe-cortado-grande', name: 'Café Cortado Grande', category: 'bebidas-calientes', price: 1.50, descripcion: 'Café cortado grande', imageUrl: '/cafe-cortado.jpg' },
  { id: 'leche-y-leche-pequeno', name: 'Leche y Leche Pequeño', category: 'bebidas-calientes', price: 1.50, descripcion: 'Café con leche condensada y normal', imageUrl: '/leche-y-leche.jpg' },
  { id: 'leche-y-leche-grande', name: 'Leche y Leche Grande', category: 'bebidas-calientes', price: 1.60, descripcion: 'Café con leche condensada y normal grande', imageUrl: '/leche-y-leche.jpg' },
  { id: 'cafe-con-leche', name: 'Café con Leche', category: 'bebidas-calientes', price: 1.70, descripcion: 'Café con leche', imageUrl: '/cafe-con-leche.jpg' },
  { id: 'colacao', name: 'Cola Cao', category: 'bebidas-calientes', price: 1.80, descripcion: 'Chocolate Cola Cao', imageUrl: '/colacao.jpg' },
  { id: 'chocolate-pequeno', name: 'Chocolate Pequeño', category: 'bebidas-calientes', price: 1.70, descripcion: 'Chocolate a la taza pequeño', imageUrl: '/chocolate.jpg' },
  { id: 'chocolate-grande', name: 'Chocolate Grande', category: 'bebidas-calientes', price: 1.90, descripcion: 'Chocolate a la taza grande', imageUrl: '/chocolate.jpg' },
  { id: 'chocolate-obrero', name: 'Chocolate Vaso Obrero', category: 'bebidas-calientes', price: 2.70, descripcion: 'Chocolate a la taza vaso grande obrero', imageUrl: '/chocolate.jpg' },
  { id: 'infusion', name: 'Infusión', category: 'bebidas-calientes', price: 1.40, descripcion: 'Infusión variadas', imageUrl: '/infusion.jpg' },
  
  // BEBIDAS FRÍAS
  { id: 'agua', name: 'Agua Sin Gas / Con Gas', category: 'bebidas-frias', price: 1.50, descripcion: 'Agua mineral', imageUrl: '/agua.jpg' },
  { id: 'refresco-cristal', name: 'Refresco Cristal', category: 'bebidas-frias', price: 2.40, descripcion: 'Coca-Cola, Fanta, Clipper, Sprite', imageUrl: '/refresco.jpg' },
  { id: 'appletiser', name: 'Appletiser', category: 'bebidas-frias', price: 2.50, descripcion: 'Refresco de manzana con gas (botella)', imageUrl: '/appletiser.jpg' },
  { id: 'aquarius-limon', name: 'Aquarius Limón', category: 'bebidas-frias', price: 2.50, descripcion: 'Refresco de limón (botella)', imageUrl: '/aquarius.jpg' },
  { id: 'nestea-fuzetea', name: 'Nestea/Fuzetea Mango Piña', category: 'bebidas-frias', price: 2.50, descripcion: 'Té helado mango o piña (botella)', imageUrl: '/nestea.jpg' },
  
  // ZUMOS
  { id: 'bifrutas-tropical', name: 'Bifrutas Tropical', category: 'zumos', price: 1.90, descripcion: 'Zumo de frutas tropical', imageUrl: '/bifrutas.jpg' },
  { id: 'zumo-melocoton', name: 'Zumo Melocotón/Pera/Piña/Mango', category: 'zumos', price: 1.90, descripcion: 'Zumo de frutas', imageUrl: '/zumo.jpg' },
  { id: 'zumo-naranja-pequeno', name: 'Zumo Naranja Natural Pequeño', category: 'zumos', price: 2.60, descripcion: 'Zumo de naranja natural exprimido', imageUrl: '/zumo-naranja.jpg' },
  { id: 'zumo-naranja-grande', name: 'Zumo Naranja Natural Grande', category: 'zumos', price: 3.60, descripcion: 'Zumo de naranja natural grande', imageUrl: '/zumo-naranja.jpg' },
  
  // CERVEZAS Y VINO
  { id: 'tropical', name: 'Tropical/Limón/0.0', category: 'cervezas', price: 2.00, descripcion: 'Cerveza Tropical normal, limón o sin alcohol', imageUrl: '/tropical.jpg' },
  { id: 'dorada', name: 'Dorada Especial', category: 'cervezas', price: 2.50, descripcion: 'Cerveza Dorada Especial', imageUrl: '/dorada.jpg' },
  { id: 'cerveza-1906', name: 'Cerveza 1906', category: 'cervezas', price: 2.90, descripcion: 'Cerveza 1906 Reserva Especial', imageUrl: '/1906.jpg' },
  { id: 'vino-coto', name: 'Copa Vino Coto', category: 'cervezas', price: 3.40, descripcion: 'Copa de vino tinto Coto', imageUrl: '/vino.jpg' },
  
  // BOCADILLOS CALIENTES
  { id: 'bocadillo-mixto', name: 'Mixto (Jamón y Queso)', category: 'bocadillos-calientes', price: 3.40, descripcion: 'Bocadillo de jamón y queso', imageUrl: '/mixto.jpg' },
  { id: 'bocadillo-mixto-ingles', name: 'Mixto Inglés', category: 'bocadillos-calientes', price: 4.70, descripcion: 'Jamón, queso, huevo y bacon', imageUrl: '/mixto-ingles.jpg' },
  { id: 'bocadillo-pata-cerdo', name: 'Pata de Cerdo', category: 'bocadillos-calientes', price: 3.70, descripcion: 'Bocadillo de pata de cerdo', imageUrl: '/pata-cerdo.jpg' },
  { id: 'bocadillo-pata-pimientos', name: 'Pata de Cerdo con Pimientos', category: 'bocadillos-calientes', price: 4.20, descripcion: 'Pata de cerdo con pimientos', imageUrl: '/pata-pimientos.jpg' },
  { id: 'bocadillo-pata-tierno', name: 'Pata Tierno', category: 'bocadillos-calientes', price: 4.50, descripcion: 'Bocadillo de pata tierno', imageUrl: '/pata-tierno.jpg' },
  { id: 'bocadillo-pata-especial', name: 'Pata de Cerdo Especial', category: 'bocadillos-calientes', price: 5.90, descripcion: 'Lechuga, jamón, queso, huevo frito, cebolla y pata', imageUrl: '/pata-especial.jpg' },
  { id: 'bocadillo-pollo-plancha', name: 'Pollo Plancha', category: 'bocadillos-calientes', price: 3.70, descripcion: 'Pechuga de pollo a la plancha', imageUrl: '/pollo-plancha.jpg' },
  { id: 'bocadillo-pollo-queso-alioli', name: 'Pollo Plancha Queso Alioli', category: 'bocadillos-calientes', price: 4.60, descripcion: 'Pollo plancha con queso y alioli', imageUrl: '/pollo-queso.jpg' },
  { id: 'bocadillo-pollo-especial', name: 'Pollo Plancha Especial', category: 'bocadillos-calientes', price: 5.90, descripcion: 'Lechuga, tomate, jamón, queso y huevo', imageUrl: '/pollo-especial.jpg' },
  { id: 'bocadillo-pollo-vegetal', name: 'Pollo Vegetal', category: 'bocadillos-calientes', price: 4.90, descripcion: 'Pollo con vegetales', imageUrl: '/pollo-vegetal.jpg' },
  { id: 'bocadillo-pollo-empanado', name: 'Pollo Empanado', category: 'bocadillos-calientes', price: 3.90, descripcion: 'Pollo empanado crujiente', imageUrl: '/pollo-empanado.jpg' },
  { id: 'bocadillo-pollo-empanado-queso', name: 'Pollo Empanado Queso Alioli', category: 'bocadillos-calientes', price: 4.70, descripcion: 'Pollo empanado con queso y alioli', imageUrl: '/pollo-empanado-queso.jpg' },
  { id: 'bocadillo-pollo-empanado-especial', name: 'Pollo Empanado Especial', category: 'bocadillos-calientes', price: 6.10, descripcion: 'Especial con todos los complementos', imageUrl: '/pollo-empanado-especial.jpg' },
  { id: 'bocadillo-cochinillo', name: 'Cochinillo', category: 'bocadillos-calientes', price: 3.90, descripcion: 'Bocadillo de cochinillo', imageUrl: '/cochinillo.jpg' },
  { id: 'bocadillo-cochinillo-queso-alioli', name: 'Cochinillo Queso Alioli', category: 'bocadillos-calientes', price: 4.70, descripcion: 'Cochinillo con queso y alioli', imageUrl: '/cochinillo-queso.jpg' },
  { id: 'bocadillo-cochinillo-especial', name: 'Cochinillo Especial', category: 'bocadillos-calientes', price: 6.20, descripcion: 'Cochinillo especial con complementos', imageUrl: '/cochinillo-especial.jpg' },
  { id: 'bocadillo-bacon', name: 'Bacon', category: 'bocadillos-calientes', price: 3.90, descripcion: 'Bocadillo de bacon', imageUrl: '/bacon.jpg' },
  { id: 'bocadillo-bacon-queso-alioli', name: 'Bacon Queso Alioli', category: 'bocadillos-calientes', price: 4.70, descripcion: 'Bacon con queso y alioli', imageUrl: '/bacon-queso.jpg' },
  { id: 'bocadillo-bacon-especial', name: 'Bacon Especial', category: 'bocadillos-calientes', price: 6.20, descripcion: 'Bacon especial con complementos', imageUrl: '/bacon-especial.jpg' },
  { id: 'bocadillo-lomo', name: 'Lomo', category: 'bocadillos-calientes', price: 3.90, descripcion: 'Bocadillo de lomo', imageUrl: '/lomo.jpg' },
  { id: 'bocadillo-lomo-queso-alioli', name: 'Lomo Queso y Alioli', category: 'bocadillos-calientes', price: 4.70, descripcion: 'Lomo con queso y alioli', imageUrl: '/lomo-queso.jpg' },
  { id: 'bocadillo-lomo-especial', name: 'Lomo Especial', category: 'bocadillos-calientes', price: 6.20, descripcion: 'Lomo especial con complementos', imageUrl: '/lomo-especial.jpg' },
  { id: 'bocadillo-pescado-plancha', name: 'Pescado Plancha', category: 'bocadillos-calientes', price: 3.90, descripcion: 'Pescado a la plancha', imageUrl: '/pescado-plancha.jpg' },
  { id: 'bocadillo-pescado-plancha-queso', name: 'Pescado Plancha Queso Alioli', category: 'bocadillos-calientes', price: 4.70, descripcion: 'Pescado plancha con queso y alioli', imageUrl: '/pescado-plancha-queso.jpg' },
  { id: 'bocadillo-pescado-plancha-especial', name: 'Pescado Plancha Especial', category: 'bocadillos-calientes', price: 6.10, descripcion: 'Pescado plancha especial', imageUrl: '/pescado-plancha-especial.jpg' },
  { id: 'bocadillo-pescado-empanado', name: 'Pescado Empanado', category: 'bocadillos-calientes', price: 4.20, descripcion: 'Pescado empanado', imageUrl: '/pescado-empanado.jpg' },
  { id: 'bocadillo-pescado-empanado-queso', name: 'Pescado Empanado Queso Alioli', category: 'bocadillos-calientes', price: 4.90, descripcion: 'Pescado empanado con queso y alioli', imageUrl: '/pescado-empanado-queso.jpg' },
  { id: 'bocadillo-pescado-empanado-especial', name: 'Pescado Empanado Especial', category: 'bocadillos-calientes', price: 6.30, descripcion: 'Pescado empanado especial', imageUrl: '/pescado-empanado-especial.jpg' },
  { id: 'bocadillo-vuelta-ternera', name: 'Vuelta de Ternera', category: 'bocadillos-calientes', price: 4.90, descripcion: 'Vueltas de ternera', imageUrl: '/vuelta-ternera.jpg' },
  { id: 'bocadillo-vuelta-ternera-queso', name: 'Vuelta de Ternera Queso Alioli', category: 'bocadillos-calientes', price: 5.70, descripcion: 'Vuelta de ternera con queso y alioli', imageUrl: '/vuelta-ternera-queso.jpg' },
  { id: 'bocadillo-vuelta-ternera-especial', name: 'Vuelta de Ternera Especial', category: 'bocadillos-calientes', price: 6.90, descripcion: 'Vuelta de ternera especial', imageUrl: '/vuelta-ternera-especial.jpg' },
  { id: 'bocadillo-pepito-canario', name: 'Pepito Canario', category: 'bocadillos-calientes', price: 5.70, descripcion: 'Lechuga, tomate, cebolla y ternera', imageUrl: '/pepito-canario.jpg' },
  { id: 'bocadillo-pepito-especial', name: 'Pepito Especial', category: 'bocadillos-calientes', price: 6.90, descripcion: 'Pepito especial con todos los complementos', imageUrl: '/pepito-especial.jpg' },
  { id: 'bocadillo-filete-atun-plancha', name: 'Filete Atún Plancha', category: 'bocadillos-calientes', price: 4.20, descripcion: 'Filete de atún a la plancha', imageUrl: '/atun-plancha.jpg' },
  { id: 'bocadillo-filete-atun-queso', name: 'Filete Atún Plancha Queso Alioli', category: 'bocadillos-calientes', price: 4.90, descripcion: 'Atún plancha con queso y alioli', imageUrl: '/atun-plancha-queso.jpg' },
  { id: 'bocadillo-filete-atun-especial', name: 'Filete Atún Plancha Especial', category: 'bocadillos-calientes', price: 6.30, descripcion: 'Atún plancha especial', imageUrl: '/atun-plancha-especial.jpg' },
  { id: 'bocadillo-filete-atun-vegetal', name: 'Filete Atún Vegetal', category: 'bocadillos-calientes', price: 4.90, descripcion: 'Atún con vegetales', imageUrl: '/atun-vegetal.jpg' },
  { id: 'bocadillo-tortilla-espanola', name: 'Tortilla Española', category: 'bocadillos-calientes', price: 3.50, descripcion: 'Tortilla española de patatas', imageUrl: '/tortilla-espanola.jpg' },
  { id: 'bocadillo-tortilla-espanola-especial', name: 'Tortilla Española Especial', category: 'bocadillos-calientes', price: 4.70, descripcion: 'Tortilla especial con complementos', imageUrl: '/tortilla-espanola-especial.jpg' },
  { id: 'bocadillo-tortilla-francesa', name: 'Tortilla Francesa', category: 'bocadillos-calientes', price: 3.10, descripcion: 'Tortilla francesa de huevos', imageUrl: '/tortilla-francesa.jpg' },
  { id: 'bocadillo-tortilla-francesa-queso', name: 'Tortilla Francesa Calabacín/Queso', category: 'bocadillos-calientes', price: 3.80, descripcion: 'Tortilla con calabacín, queso tierno o manchego', imageUrl: '/tortilla-francesa-queso.jpg' },
  { id: 'bocadillo-tortilla-jamon-queso', name: 'Tortilla Francesa con Jamón y Queso', category: 'bocadillos-calientes', price: 3.90, descripcion: 'Tortilla francesa con jamón y queso', imageUrl: '/tortilla-jamon-queso.jpg' },
  { id: 'bocadillo-tortilla-gambas', name: 'Tortilla Francesa con Gambas', category: 'bocadillos-calientes', price: 3.80, descripcion: 'Tortilla francesa con gambas', imageUrl: '/tortilla-gambas.jpg' },
  
  // BOCADILLOS FRÍOS
  { id: 'bocadillo-jamon-iberico', name: 'Jamón Ibérico', category: 'bocadillos-frios', price: 4.30, descripcion: 'Bocadillo de jamón ibérico', imageUrl: '/jamon-iberico.jpg' },
  { id: 'bocadillo-jamon-catalana', name: 'Jamón a la Catalana', category: 'bocadillos-frios', price: 4.70, descripcion: 'Jamón con tomate y alioli', imageUrl: '/jamon-catalana.jpg' },
  { id: 'bocadillo-jamon-queso-manchego', name: 'Jamón Ibérico y Queso Manchego', category: 'bocadillos-frios', price: 5.90, descripcion: 'Jamón ibérico con queso manchego', imageUrl: '/jamon-queso-manchego.jpg' },
  { id: 'bocadillo-queso-tierno', name: 'Queso Tierno', category: 'bocadillos-frios', price: 3.30, descripcion: 'Bocadillo de queso tierno', imageUrl: '/queso-tierno.jpg' },
  { id: 'bocadillo-queso-manchego', name: 'Queso Manchego', category: 'bocadillos-frios', price: 3.60, descripcion: 'Bocadillo de queso manchego', imageUrl: '/queso-manchego.jpg' },
  { id: 'bocadillo-vegetal-atun', name: 'Vegetal con Atún', category: 'bocadillos-frios', price: 3.50, descripcion: 'Bocadillo vegetal con atún', imageUrl: '/vegetal-atun.jpg' },
  { id: 'bocadillo-atun-millo', name: 'Atún y Millo', category: 'bocadillos-frios', price: 3.30, descripcion: 'Atún con millo canario', imageUrl: '/atun-millo.jpg' },
  { id: 'bocadillo-atun-pimientos', name: 'Atún con Pimientos', category: 'bocadillos-frios', price: 3.40, descripcion: 'Atún con pimientos', imageUrl: '/atun-pimientos.jpg' },
  
  // BURGERS
  { id: 'burger-normal', name: 'Hamburguesa Normal', category: 'burgers', price: 3.70, descripcion: 'Ketchup, alioli, mostaza y cebolla', imageUrl: '/burger-normal.jpg' },
  { id: 'burger-normal-papas', name: 'Hamburguesa Normal con Papas', category: 'burgers', price: 4.50, descripcion: 'Hamburguesa normal con papas fritas', imageUrl: '/burger-papas.jpg' },
  { id: 'burger-especial', name: 'Hamburguesa Especial', category: 'burgers', price: 5.50, descripcion: 'Ketchup, alioli, mostaza, cebolla, lechuga, tomate, jamón, queso y huevo', imageUrl: '/burger-especial.jpg' },
  { id: 'burger-especial-papas', name: 'Hamburguesa Especial con Papas', category: 'burgers', price: 6.50, descripcion: 'Hamburguesa especial con papas fritas', imageUrl: '/burger-especial-papas.jpg' },
  
  // PARA PICAR
  { id: 'papas-arrugadas-media', name: 'Papas Arrugadas con Mojo (Media)', category: 'para-picar', price: 4.60, descripcion: 'Papas canarias con mojo', imageUrl: '/papas-arrugadas.jpg' },
  { id: 'papas-arrugadas-racion', name: 'Papas Arrugadas con Mojo (Ración)', category: 'para-picar', price: 6.30, descripcion: 'Ración de papas canarias con mojo', imageUrl: '/papas-arrugadas.jpg' },
  { id: 'queso-frito', name: 'Queso Frito', category: 'para-picar', price: 6.70, descripcion: 'Queso canario frito', imageUrl: '/queso-frito.jpg' },
  { id: 'queso-semicurado-media', name: 'Queso Semicurado (Media)', category: 'para-picar', price: 5.70, descripcion: 'Queso semicurado canario', imageUrl: '/queso-semicurado.jpg' },
  { id: 'queso-semicurado-racion', name: 'Queso Semicurado (Ración)', category: 'para-picar', price: 6.90, descripcion: 'Ración de queso semicurado', imageUrl: '/queso-semicurado.jpg' },
  { id: 'queso-tierno-media', name: 'Queso Tierno (Media)', category: 'para-picar', price: 5.40, descripcion: 'Queso tierno canario', imageUrl: '/queso-tierno-racion.jpg' },
  { id: 'queso-tierno-racion', name: 'Queso Tierno (Ración)', category: 'para-picar', price: 6.50, descripcion: 'Ración de queso tierno', imageUrl: '/queso-tierno-racion.jpg' },
  { id: 'pata-asada-media', name: 'Pata Asada (Media)', category: 'para-picar', price: 6.70, descripcion: 'Pata de cerdo asada', imageUrl: '/pata-asada.jpg' },
  { id: 'pata-asada-racion', name: 'Pata Asada (Ración)', category: 'para-picar', price: 8.70, descripcion: 'Ración de pata asada', imageUrl: '/pata-asada.jpg' },
  { id: 'jamon-iberico-media', name: 'Jamón Ibérico (Media)', category: 'para-picar', price: 7.70, descripcion: 'Jamón ibérico', imageUrl: '/jamon-iberico-racion.jpg' },
  { id: 'jamon-iberico-racion', name: 'Jamón Ibérico (Ración)', category: 'para-picar', price: 10.90, descripcion: 'Ración de jamón ibérico', imageUrl: '/jamon-iberico-racion.jpg' },
  { id: 'tortilla-pincho', name: 'Tortilla (Pincho)', category: 'para-picar', price: 3.10, descripcion: 'Pincho de tortilla española', imageUrl: '/tortilla-pincho.jpg' },
  { id: 'tortilla-racion', name: 'Tortilla (Ración)', category: 'para-picar', price: 5.90, descripcion: 'Ración de tortilla española', imageUrl: '/tortilla-racion.jpg' },
  { id: 'tortilla-francesa-2huevos', name: 'Tortilla Francesa (2 huevos)', category: 'para-picar', price: 3.90, descripcion: 'Tortilla francesa de 2 huevos', imageUrl: '/tortilla-francesa-plato.jpg' },
  { id: 'aceitunas', name: 'Aceitunas', category: 'para-picar', price: 1.60, descripcion: 'Aceitunas aliñadas', imageUrl: '/aceitunas.jpg' },
  { id: 'pan', name: 'Pan', category: 'para-picar', price: 0.70, descripcion: 'Pan de barra', imageUrl: '/pan.jpg' },
  { id: 'alioli', name: 'Alioli', category: 'para-picar', price: 1.50, descripcion: 'Salsa alioli casera', imageUrl: '/alioli.jpg' },
  
  // PLATOS COMBINADOS
  { id: 'ensalada', name: 'Ensalada', category: 'platos-combinados', price: 4.80, descripcion: 'Ensalada mixta', imageUrl: '/ensalada.jpg' },
  { id: 'huevos-estrellados', name: 'Huevos Estrellados', category: 'platos-combinados', price: 6.90, descripcion: 'Huevos estrellados con papas', imageUrl: '/huevos-estrellados.jpg' },
  { id: 'carne-cochino', name: 'Carne Cochino con Papas Arrugadas', category: 'platos-combinados', price: 9.50, descripcion: 'Carne de cochino con papas arrugadas', imageUrl: '/carne-cochino.jpg' },
  { id: 'rejos-calamar', name: 'Rejos de Calamar', category: 'platos-combinados', price: 12.50, descripcion: 'Rejos de calamar a la plancha', imageUrl: '/rejos.jpg' },
  { id: 'calamares-saharianos', name: 'Calamares Saharianos con Papas Fritas', category: 'platos-combinados', price: 18.50, descripcion: 'Calamares con papas fritas', imageUrl: '/calamares.jpg' },
  { id: 'escalope-ternera', name: 'Escalope Ternera con Papas Fritas', category: 'platos-combinados', price: 10.50, descripcion: 'Escalope de ternera con papas', imageUrl: '/escalope-ternera.jpg' },
  { id: 'escalope-cerdo', name: 'Escalope de Cerdo con Papas Fritas', category: 'platos-combinados', price: 9.30, descripcion: 'Escalope de cerdo con papas', imageUrl: '/escalope-cerdo.jpg' },
  { id: 'vueltas-ternera', name: 'Vueltas de Ternera con Papas Fritas', category: 'platos-combinados', price: 10.30, descripcion: 'Vueltas de ternera con papas', imageUrl: '/vueltas-ternera.jpg' },
  { id: 'lomo-papas', name: 'Lomo con Papas Fritas', category: 'platos-combinados', price: 8.50, descripcion: 'Lomo de cerdo con papas', imageUrl: '/lomo-papas.jpg' },
  { id: 'pechuga-plancha-papas', name: 'Pechuga Plancha con Papas Fritas', category: 'platos-combinados', price: 8.50, descripcion: 'Pechuga de pollo a la plancha', imageUrl: '/pechuga-plancha-plato.jpg' },
  { id: 'pechuga-empanada-papas', name: 'Pechuga Empanada con Papas Fritas', category: 'platos-combinados', price: 8.90, descripcion: 'Pechuga empanada con papas', imageUrl: '/pechuga-empanada-plato.jpg' },
  { id: 'pescado-plancha-papas', name: 'Pescado Plancha con Papas Arrugadas', category: 'platos-combinados', price: 11.50, descripcion: 'Pescado a la plancha con papas arrugadas', imageUrl: '/pescado-plancha-plato.jpg' },
  { id: 'pescado-empanado-papas', name: 'Pescado Empanado con Papas Arrugadas', category: 'platos-combinados', price: 11.90, descripcion: 'Pescado empanado con papas arrugadas', imageUrl: '/pescado-empanado-plato.jpg' },
  { id: 'filete-atun-papas', name: 'Filete de Atún con Papas Arrugadas', category: 'platos-combinados', price: 11.60, descripcion: 'Filete de atún con papas arrugadas', imageUrl: '/atun-papas.jpg' },
  { id: 'hamburguesa-huevo-papas', name: 'Hamburguesa Huevo y Papas Fritas', category: 'platos-combinados', price: 7.20, descripcion: 'Hamburguesa con huevo y papas', imageUrl: '/hamburguesa-huevo.jpg' },
  { id: 'croquetas-papas', name: 'Croquetas de Pescado/Pollo con Papas', category: 'platos-combinados', price: 7.20, descripcion: 'Croquetas con papas fritas', imageUrl: '/croquetas-plato.jpg' },
  { id: 'papas-fritas-media', name: 'Papas Fritas (Media)', category: 'platos-combinados', price: 3.60, descripcion: 'Media ración de papas fritas', imageUrl: '/papas-fritas.jpg' },
  { id: 'papas-fritas-racion', name: 'Papas Fritas (Ración)', category: 'platos-combinados', price: 4.60, descripcion: 'Ración de papas fritas', imageUrl: '/papas-fritas.jpg' },
  { id: 'papas-pizza', name: 'Papas Pizza', category: 'platos-combinados', price: 6.20, descripcion: 'Papas con jamón, queso, atún y huevo', imageUrl: '/papas-pizza.jpg' },
  
  // PARA LOS "PEKES"
  { id: 'ninos-salchicha', name: 'Salchicha con Papas', category: 'ninos', price: 5.70, descripcion: 'Salchicha con papas fritas', imageUrl: '/salchicha-papas.jpg' },
  { id: 'ninos-nuggets', name: 'Nuggets con Papas', category: 'ninos', price: 5.90, descripcion: 'Nuggets de pollo con papas', imageUrl: '/nuggets.jpg' },
  { id: 'ninos-mixto', name: 'Salchicha Nuggets y Papas', category: 'ninos', price: 6.90, descripcion: 'Mixto de salchicha y nuggets', imageUrl: '/ninos-mixto.jpg' },
  { id: 'ninos-croquetas', name: 'Media de Croquetas', category: 'ninos', price: 5.50, descripcion: 'Media ración de croquetas', imageUrl: '/croquetas-ninos.jpg' },
  
  // POSTRES
  { id: 'postre-polvito', name: 'Polvito Uruguayo', category: 'postres', price: 3.50, descripcion: 'Postre tradicional uruguayo', imageUrl: '/polvito.jpg' },
  { id: 'postre-mousse-gofio', name: 'Mus de Gofio', category: 'postres', price: 3.50, descripcion: 'Mousse de gofio canario', imageUrl: '/mousse-gofio.jpg' },
  { id: 'postre-mousse-chocolate', name: 'Mus de Chocolate', category: 'postres', price: 3.50, descripcion: 'Mousse de chocolate', imageUrl: '/mousse-chocolate.jpg' },
  { id: 'postre-flan', name: 'Flan Casero', category: 'postres', price: 3.50, descripcion: 'Flan casero tradicional', imageUrl: '/flan.jpg' }
];

// Función para actualizar Firebase
async function updateFirebase() {
  try {
    const productsRef = collection(db, 'products');
    
    console.log('📦 Actualizando Firebase con', products.length, 'productos...\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const product of products) {
      try {
        await setDoc(doc(productsRef, product.id), product);
        console.log(`✅ ${product.name} - ${product.price.toFixed(2)}€`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error con ${product.name}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 ¡ACTUALIZACIÓN COMPLETADA!');
    console.log('✅ Éxitos:', successCount);
    console.log('❌ Errores:', errorCount);
    console.log('📊 Total:', products.length, 'productos');
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar
updateFirebase();