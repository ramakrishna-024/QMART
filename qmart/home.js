const USD_TO_INR = 90; // approximate fixed rate (DummyJSON prices are in USD)

const productList = document.getElementById("product-list");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchStatus = document.getElementById("search-status");

const rupeeFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
});

let products = [];

// Prevents broken HTML / script injection from API text
function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function fetchProducts() {
    fetch("https://dummyjson.com/products")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            products = data.products;
            try {
                localStorage.setItem("allproducts", JSON.stringify(products));
            } catch (error) {
                console.warn("Could not save products to localStorage:", error);
            }
            displayProducts(products);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
            productList.textContent = "Products could not be loaded. Please try again later.";
        });
}

function displayProducts(list) {
    if (list.length === 0) {
        productList.innerHTML = '<p class="empty-message">No products found.</p>';
        return;
    }

    productList.innerHTML = list
        .map((product) => `
        <div class="product">
            <img src="${escapeHTML(product.thumbnail)}" alt="${escapeHTML(product.title)}">
            <h2>${escapeHTML(product.title)}</h2>
            <p class="product-rating">Rating: ${Number(product.rating).toFixed(1)} / 5</p>
            <p class="product-price">Price: ${rupeeFormatter.format(product.price * USD_TO_INR)}</p>
        </div>`)
        .join("");
}

function searchProducts() {
    if (products.length === 0) {
        return; // products are still loading
    }

    const rawQuery = searchInput.value.trim();
    const query = rawQuery.toLowerCase();

    if (!query) {
        searchStatus.textContent = "";
        displayProducts(products);
        return;
    }

    const results = products.filter((product) =>
        [product.title, product.category, product.brand].some(
            (field) => field && String(field).toLowerCase().includes(query)
        )
    );

    searchStatus.textContent = `${results.length} result(s) for "${rawQuery}"`;
    displayProducts(results);
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchProducts();
});
searchInput.addEventListener("input", searchProducts);

fetchProducts();
