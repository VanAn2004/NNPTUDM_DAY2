
let allProducts = [];
let filteredProducts = [];
let currentSort = '';

fetch('./db.json')
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        filteredProducts = [...allProducts];
        renderProducts(filteredProducts);
        renderTable(filteredProducts);
    })
    .catch(error => {
        console.error("Lỗi load dữ liệu:", error);
    });

function onSearchChanged() {
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    filteredProducts = allProducts.filter(p => p.title.toLowerCase().includes(keyword));
    sortProducts(currentSort, true);
}

function sortProducts(type, skipRender) {
    currentSort = type;
    if (type === 'name-asc') {
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type === 'name-desc') {
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (type === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (type === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    renderProducts(filteredProducts);
    renderTable(filteredProducts);
}

function renderProducts(products) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${p.images && p.images[0] ? p.images[0] : ''}" alt="${p.title}" onerror="this.src='https://placehold.co/80x60?text=No+Image'">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <p><b>Giá:</b> $${p.price}</p>
            <span class="category">${p.category && p.category.name ? p.category.name : ''}</span>
        `;
        container.appendChild(div);
    });
}

function renderTable(products) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${product.images && product.images[0] ? product.images[0] : ''}" alt="${product.title}" onerror="this.src='https://placehold.co/80x60?text=No+Image'"/></td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.category && product.category.name ? product.category.name : ''}</td>
        `;
        tbody.appendChild(tr);
    });
}