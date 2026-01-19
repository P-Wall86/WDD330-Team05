import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        if (!this.product) {
            console.error("Product not found");
            return;
        }

        this.renderProductDetails();

        const btn = document.getElementById("addToCart");
        if (btn) {
            btn.addEventListener("click", this.addProductToCart.bind(this));
        }
    }

    renderProductDetails() {
        document.querySelector("h3").textContent = this.product.Brand?.Name || "No Brand";

        document.querySelector("h2.divider").textContent = this.product.NameWithoutBrand || "No Name";

        // Render discount badge if discount exists
        this.renderDiscountBadge();

        document.querySelector(".product-card__price").textContent = `$${this.product.FinalPrice?.toFixed(2) || "0.00"}`;

        const colorName = this.product.Colors?.[0]?.ColorName || "";
        document.querySelector(".product__color").textContent = colorName;

        document.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple || "";

        const img = document.getElementById("productImage");
        if (img && this.product.Image) {
            img.src = this.product.Image;
            img.alt = this.product.NameWithoutBrand || "Product Image";
        }

        const btn = document.getElementById("addToCart");
        if (btn) {
            btn.dataset.id = this.product.Id;
        }
    }

    renderDiscountBadge() {
        // Check if discount exists
        if (!this.product.discount || this.product.discount <= 0) {
            return;
        }

        // Get the price element to insert badge after it
        const priceElement = document.querySelector(".product-card__price");
        if (!priceElement) return;

        // Calculate discounted price
        const originalPrice = this.product.FinalPrice || 0;
        const discountPercentage = this.product.discount;
        const discountedPrice = (originalPrice * (1 - discountPercentage / 100)).toFixed(2);

        // Create discount badge HTML
        const badgeHTML = `
            <div class="discount-badge">
                <span class="discount-badge__text">${discountPercentage}% OFF</span>
            </div>
            <div class="discount-info">
                <p class="discount-original-price"><span class="strikethrough">$${originalPrice.toFixed(2)}</span></p>
                <p class="discount-final-price"><strong>Now: $${discountedPrice}</strong></p>
            </div>
        `;

        // Insert badge after price element
        priceElement.insertAdjacentHTML("afterend", badgeHTML);
    }

    addProductToCart() {
        let cart = getLocalStorage("so-cart") || []
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        alert("Product successfully added to cart!");
    }
}
