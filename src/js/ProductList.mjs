import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card" data-id="${product.Id}">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Images.PrimaryMedium}"
          alt="${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
    </li>
`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);

    const sortSelect = document.querySelector("#sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => this.filterProducts(e.target.value));
    }

    this.setupQuickView();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  setupQuickView() {
    const modal = document.getElementById("quick-view-modal");
    const modalClose = document.getElementById("modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalBrand = document.getElementById("modal-brand");
    const modalPrice = document.getElementById("modal-price");
    const modalDesc = document.getElementById("modal-description");

    if (!modal || !modalClose) return;
    modalClose.onclick = () => {
      modal.classList.remove("active");
    };
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove("active");
    };

    this.listElement.onclick = (e) => {
      if (e.target.classList.contains("quick-view-btn")) {
        const productId = e.target.dataset.id;
        const product = this.products.find(p => p.Id === productId);
        if (!product) return;

        modalTitle.textContent = product.Name;
        modalImage.src = product.Images.PrimaryMedium;
        modalImage.alt = product.Name;
        modalBrand.innerHTML = `<strong>Brand:</strong> ${product.Brand.Name}`;
        modalPrice.innerHTML = `<strong>Price:</strong> $${product.FinalPrice}`;

        const capacityMatch = product.Name.match(/\d+L|\d+/);
        const capacity = capacityMatch ? capacityMatch[0] : "N/A";
        const colors = product.Colors.map(c => c.ColorName).join(", ");

        modalDesc.innerHTML = `
    <strong>Capacity:</strong> ${capacity.includes('L') ? capacity : capacity + 'L'}<br>
    <strong>Colors:</strong> ${colors}
`;

        modal.classList.add("active");
      }
    };

    document.onkeydown = (e) => {
      if (e.key === "Escape") {
        modal.classList.remove("active");
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