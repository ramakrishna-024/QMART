# 🛒 QMART – E-commerce Storefront

A responsive online store front-end built with **HTML, CSS and vanilla JavaScript**. Products are loaded live from the [DummyJSON](https://dummyjson.com) API.

🔗 **Live demo:** _add your link here (Netlify / GitHub Pages)_

## ✨ Features
- Product grid loaded from a REST API using `fetch`
- **Search** by product name, category or brand (updates as you type)
- Prices shown in ₹ (converted from USD at a fixed approximate rate)
- Rating display, hover zoom on product images
- Loading, error and "no results" states
- Fully responsive layout (CSS Grid + Flexbox)
- Products cached in `localStorage` for use on other pages

## 🛠 Tech Stack
HTML5 • CSS3 • JavaScript (Fetch API, DOM, localStorage) • DummyJSON API

## 📁 Project Structure
```
├── home.html          # main page
├── home.css           # styles
├── home.js            # API call, rendering, search
├── pro_details.html   # product details page (in progress)
├── cart.html          # cart page (in progress)
└── cart.css
```

## ▶️ Run Locally
Download or clone the repository and open `home.html` in a browser. An internet connection is needed for the product data.

## 🚀 Planned Improvements
- [ ] Product details page
- [ ] Add to cart, quantity update and total price
- [ ] Django + SQL backend: user login, orders, order history
- [ ] Category filter and sorting

## 👤 Author
**Ramakrishna** – [@ramakrishna-024](https://github.com/ramakrishna-024)
