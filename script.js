const API_URL = "./db.json";

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        renderProducts(data);
    })
    .catch(error => {
        console.error("Lỗi load dữ liệu:", error);
    });

function renderProducts(products) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${p.images[0]}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <p><b>Giá:</b> $${p.price}</p>
            <span class="category">${p.category.name}</span>
        `;

        container.appendChild(div);
    });
}
