
const API_URL = "./db.json";
let allProducts = [];
let filteredProducts = [];
let currentSort = null;

// Fetch data and render
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        filteredProducts = data;
        renderProducts(filteredProducts);
        renderTable(filteredProducts);
    })
    .catch(error => {
        console.error("Lỗi load dữ liệu:", error);
    });

// Tìm kiếm sản phẩm (onChanged)
function onSearchChanged() {
    const value = document.getElementById('searchInput').value.toLowerCase();
    filteredProducts = allProducts.filter(p => p.title.toLowerCase().includes(value));
    if (currentSort) sortProducts(currentSort, true);
    else {
        renderProducts(filteredProducts);
        renderTable(filteredProducts);
    }
}

// Dropdown sort
function toggleSortDropdown(event) {
    event && event.stopPropagation();
    document.querySelector('.dropdown').classList.toggle('show');
}

// Đóng dropdown khi click ra ngoài (trừ khi click vào dropdown hoặc nút)
document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

function sortProducts(type, keepFiltered=false) {
    currentSort = type;
    let arr = keepFiltered ? filteredProducts : [...filteredProducts];
    switch(type) {
        case 'nameAsc':
            arr.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
            break;
        case 'nameDesc':
            arr.sort((a, b) => b.title.localeCompare(a.title, 'vi'));
            break;
        case 'priceAsc':
            arr.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            arr.sort((a, b) => b.price - a.price);
            break;
    }
    filteredProducts = arr;
    renderProducts(filteredProducts);
    renderTable(filteredProducts);
}

function renderProducts(products) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial'%3ENo Image%3C/text%3E%3C/svg%3E";
        const img = document.createElement("img");
        img.src = p.images[0];
        img.alt = p.title;
        img.onerror = function() { this.src = placeholderImage; };
        div.appendChild(img);
        const h3 = document.createElement("h3");
        h3.textContent = p.title;
        div.appendChild(h3);
        const desc = document.createElement("p");
        desc.textContent = p.description;
        div.appendChild(desc);
        const price = document.createElement("p");
        price.innerHTML = `<b>Giá:</b> $${p.price}`;
        div.appendChild(price);
        const category = document.createElement("span");
        category.className = "category";
        category.textContent = p.category.name;
        div.appendChild(category);
        container.appendChild(div);
    });
}

function renderTable(products) {
    const tbody = document.getElementById('product-table-body');
    tbody.innerHTML = '';
    products.forEach(p => {
        const tr = document.createElement('tr');
        const imgTd = document.createElement('td');
        const img = document.createElement('img');
        img.src = p.images[0];
        img.alt = p.title;
        img.style.maxWidth = '60px';
        img.onerror = function() { this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='40'%3E%3Crect fill='%23ddd' width='60' height='40'/%3E%3Ctext x='50%25' y='50%25' font-size='10' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Img%3C/text%3E%3C/svg%3E"; };
        imgTd.appendChild(img);
        tr.appendChild(imgTd);
        const nameTd = document.createElement('td');
        nameTd.textContent = p.title;
        tr.appendChild(nameTd);
        const descTd = document.createElement('td');
        descTd.textContent = p.description.substring(0, 50) + '...';
        tr.appendChild(descTd);
        const priceTd = document.createElement('td');
        priceTd.innerHTML = `<b>$${p.price}</b>`;
        tr.appendChild(priceTd);
        const catTd = document.createElement('td');
        catTd.textContent = p.category.name;
        tr.appendChild(catTd);
        tbody.appendChild(tr);
    });
}
