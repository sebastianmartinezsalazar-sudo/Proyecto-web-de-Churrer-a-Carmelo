# Churrería Carmelo Web Project

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

![Churrería Carmelo Logo](public/logo.png)

> A modern React.js web application for a traditional Canarian churros shop.

[View Demo](https://churreria-carmelo.web.app) · [Report Bug](https://github.com/sebastianmartinezsalazar-sudo/Proyecto-web-de-Churrer-a-Carmelo/issues) · [Request Feature](https://github.com/sebastianmartinezsalazar-sudo/Proyecto-web-de-Churrer-a-Carmelo/issues)

---

## 📋 Table of Contents

<details>
  <summary>Click to expand</summary>
  
  1. [Description](#-description)
  2. [Screenshots](#-screenshots)
  3. [Live Demo](#-live-demo)
  4. [RSS Feed](#-rss-feed)
  5. [Available Routes](#-available-routes)
  6. [CRUD Functionality](#-crud-functionality)
  7. [Features](#-features)
  8. [Technologies Used](#-technologies-used)
  9. [Project Structure](#-project-structure)
  10. [Responsive Design](#-responsive-design)
  11. [Installation](#-installation)
  12. [Third-Party Components](#-third-party-components)
  13. [Tutorials & Resources](#-tutorials--resources)
  14. [Contributing](#-contributing)
  15. [License](#-license)
  16. [Contact](#-contact)
  17. [Acknowledgments](#-acknowledgments)
</details>

---

## 📄 Description

This project is a web application for **Churrería Carmelo**, a traditional churrería in Las Palmas de Gran Canaria. The website aims to showcase the menu, the history of the establishment, and provide contact information for customers.

### Main Page (`/` and `/home`)
The home page features:
- 🎨 Hero section with call-to-action buttons
- 🍩 Featured products carousel from JSON data
- 🔍 Search and filter functionality by category
- 📱 Fully responsive design using Flexbox and Media Queries
- ⚡ Fast loading with Vite optimization

The page loads on both root URL (`http://localhost:5173`) and `/home` route as required.

---

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/home.png)
*Home page with featured products and navigation*

### Menu / Carta
![Menu](./screenshots/menu.png)
*Complete menu with categories, search, and product cards*

### Work With Us
![Work With Us](./screenshots/trabajanos.png)
*Job application form with CV upload functionality*

### RSS Feed Reader ⭐
![RSS Feed](./screenshots/rss-feed.png)
*RSS feed reader displaying news items with links to detailed pages*

### Contact Page
![Contact](./screenshots/contacto.png)
*Interactive map with Leaflet and contact form*

> 💡 **Note:** To view these screenshots locally, create a `screenshots/` folder in the project root and save your images there.

---

## 🚀 Live Demo

**Firebase Hosting:** [Churrería Carmelo](https://churreria-carmelo.web.app)

> *Replace with your actual Firebase URL after deployment*

### Quick Access Links:
| Page | URL |
|------|-----|
| Home | `/` or `/home` |
| Menu | `/carta` |
| Contact | `/contacto` |
| Work With Us | `/trabajanos` |
| RSS Feed | `/rss` |

---

## RSS Feed
![RSS Feed](./screenshots/rss-feed.png)
*RSS feed reader displaying news items*

This project includes a fully functional RSS 2.0 compliant news feed.

### Feed Details:
- **File Location:** `public/rss/news.xml`
- **App Route:** `/rss`
- **Production URL:** `https://churreria-carmelo.web.app/rss/news.xml`

### How It Works:
1. The RSS feed is generated as a static XML file
2. The `/rss` page parses and displays feed items
3. Each item links to a detailed news page within the app
4. Feed updates automatically when new items are added

### Sample RSS Structure:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Churrería Carmelo News</title>
    <link>https://churreria-carmelo.web.app</link>
    <description>Latest news and updates from Churrería Carmelo</description>
    <language>es-ES</language>
    
    <item>
      <title>New Flavor: White Chocolate Churros</title>
      <link>https://churreria-carmelo.web.app/news/white-chocolate</link>
      <description>Discover our exclusive new flavor made with premium Belgian chocolate...</description>
      <pubDate>Mon, 10 Feb 2026 10:00:00 GMT</pubDate>
      <guid>news-white-chocolate-2026</guid>
    </item>
    
    <item>
      <title>Extended Hours for Carnival Season</title>
      <link>https://churreria-carmelo.web.app/news/carnival-hours</link>
      <description>We're staying open late during Carnival! Visit us until midnight...</description>
      <pubDate>Fri, 07 Feb 2026 08:00:00 GMT</pubDate>
      <guid>news-carnival-2026</guid>
    </item>
  </channel>
</rss>