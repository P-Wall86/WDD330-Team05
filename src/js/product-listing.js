import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const title = document.getElementById("product-title");
if (title) {
    const prettyCategory = category
        .replace("-", " ")
        .replace(/\b\w/g, l => l.toUpperCase());

    title.textContent = `Top Products: ${prettyCategory}`;
}

const dataSource = new ProductData(category);
const list = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, list);

productList.init();