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

    addProductToCart() {
        let cart = getLocalStorage("so-cart") || []
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        alert("Product successfully added to cart!");
    }
}
