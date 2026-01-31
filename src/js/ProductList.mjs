import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card" data-id="${product.Id}">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category; // Pode ser o nome da categoria ou o termo de busca
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    // A API já aceita o termo no endpoint /products/search/${category}
    this.products = await this.dataSource.getData(this.category);
    
    if (this.products && this.products.length > 0) {
        this.renderList(this.products);
    } else {
        this.listElement.innerHTML = "<li>No products found.</li>";
    }

    const sortSelect = document.querySelector("#sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => this.filterProducts(e.target.value));
    }

    this.setupQuickView();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  // ... (mantenha o restante do seu código setupQuickView e filterProducts sem alterações)
  setupQuickView() {
    const modal = document.getElementById("quick-view-modal");
    const modalClose = document.getElementById("modal-close");
    const list = this.listElement;

    if (!modal || !modalClose) return;
    modalClose.onclick = () => modal.classList.remove("active");
    
    list.onclick = (e) => {
      if (e.target.classList.contains("quick-view-btn")) {
        const productId = e.target.dataset.id;
        const product = this.products.find(p => p.Id === productId);
        if (!product) return;
        
        document.getElementById("modal-title").textContent = product.Name;
        document.getElementById("modal-image").src = product.Images.PrimaryMedium;
        document.getElementById("modal-brand").innerHTML = `<strong>Brand:</strong> ${product.Brand.Name}`;
        document.getElementById("modal-price").innerHTML = `<strong>Price:</strong> $${product.FinalPrice}`;
        document.getElementById("modal-description").textContent = product.DescriptionHtmlSimple || "";
        
        modal.classList.add("active");
      }
    };
  }

  filterProducts(sortValue) {
    let sortedList = [...this.products];
    if (sortValue === "name") {
      sortedList.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortValue === "price") {
      sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    this.renderList(sortedList);
  }
}