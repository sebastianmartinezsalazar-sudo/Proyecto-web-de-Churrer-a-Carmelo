# 🥐 Churrería Carmelo - Web Project

> Academic project for **Markup Languages** course - **DAW** (Web Applications Development)  
> Developed by: **Sebastián Martínez Salazar** | Year: **2026**

![Churrería Carmelo](public/Logo-Bar-Churreria-Carmelo.jpg)

[🌐 Live Demo](https://churreria-carmelo.web.app) · [📋 Report Issue](https://github.com/sebastianmartinezsalazar-sudo/Proyecto-web-de-Churrer-a-Carmelo/issues)

---

## 📋 Table of Contents

<details>
<summary>Click to expand</summary>

1. [Description](#-description)
2. [Technologies](#-technologies)
3. [Features](#-features)
4. [Available Routes](#-available-routes)
5. [Screenshots](#-screenshots)
6. [Installation](#-installation)
7. [Project Structure](#-project-structure)
8. [Grading Criteria](#-grading-criteria)
9. [Contact](#-contact)

</details>

---

## 📄 Description

Modern web application for **Churrería Carmelo**, a traditional churros shop in Las Palmas de Gran Canaria. The website showcases the menu, the establishment's history, and provides contact information for customers.

### Main Features:
- 🎨 Hero section with call-to-action buttons
- 🔍 Product search and category filtering
- 🔐 User authentication with Firebase
- 📊 Sales statistics charts with D3.js
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🗺️ Interactive map with Leaflet
- 📰 RSS feed reader integration

---

## 🛠️ Technologies

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **Vite** | Build tool & dev server |
| **Firebase** | Authentication & hosting |
| **D3.js** | Data visualization (charts) |
| **React Router** | Client-side routing |
| **Leaflet** | Interactive maps |
| **CSS3** | Styling with Flexbox/Grid |
| **RSS Parser** | RSS feed reader |

---

## ✨ Features

### Core Features
- ✅ **Responsive Design** - Mobile, tablet & desktop compatible
- ✅ **Firebase Auth** - User login and registration
- ✅ **Product Catalog** - Filterable menu by categories
- ✅ **D3.js Charts** - Sales statistics visualization
- ✅ **RSS Reader** - External news feed integration
- ✅ **Interactive Map** - Location with Leaflet
- ✅ **Real-time Search** - Instant product filtering
- ✅ **Contact Form** - Job application with CV upload

### Technical Features
- ✅ Reusable React components
- ✅ State management with Hooks (`useState`, `useEffect`)
- ✅ Firebase Firestore data integration
- ✅ Form validation
- ✅ Image optimization and lazy loading

---

## 🗺️ Available Routes

| Route | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page with hero and featured products |
| `/carta` | Menu | Full menu with filters and search |
| `/contacto` | Contact | Contact form and interactive map |
| `/trabajanos` | WorkWithUs | Job application form |
| `/rss` | RSSFeed | RSS news feed reader |
| `/login` | Login | User authentication page |

---

## 📸 Screenshots

### 🏠 Home Page
![Home](./screenshots/home.png)

### 📋 Menu / Carta
![Menu](./screenshots/menu.png)

### 📊 D3.js Statistics
![Stats](./screenshots/stats.png)

### 🗺️ Contact with Map
![Contact](./screenshots/contacto.png)

### 💼 Work With Us
![Work](./screenshots/trabajanos.png)

> 💡 *To view screenshots locally, create a `screenshots/` folder in the project root.*

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/sebastianmartinezsalazar-sudo/Proyecto-web-de-Churrer-a-Carmelo.git

# 2. Navigate to project directory
cd Proyecto-web-de-Churrer-a-Carmelo

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open in browser
http://localhost:5173