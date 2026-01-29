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

        // Placeholder hình ảnh nếu không load được
        const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial'%3ENo Image%3C/text%3E%3C/svg%3E";
        
        const img = document.createElement("img");
        img.src = p.images[0];
        img.alt = p.title;
        img.onerror = function() {
            this.src = placeholderImage;
            console.warn(`Không load được hình: ${p.images[0]}`);
        };

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
