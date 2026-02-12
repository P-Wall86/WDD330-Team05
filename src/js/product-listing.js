import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices(); 

const listElement = document.querySelector(".product-list");

const titleElement = document.querySelector("#category-name");
if (titleElement) {
  titleElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
}

window.addEventListener("DOMContentLoaded", () => {
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
});