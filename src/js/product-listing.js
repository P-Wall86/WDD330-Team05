import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

// Tenta pegar 'category' ou 'search' da URL
const category = getParam("category");
const searchHistory = getParam("search");

// Define o que será usado para buscar os dados
const query = category || searchHistory;

const dataSource = new ExternalServices(); 
const listElement = document.querySelector(".product-list");
const titleElement = document.querySelector("#category-name");

if (titleElement && query) {
  // Se for busca, muda o título para algo amigável
  titleElement.textContent = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : `Results for: "${searchHistory}"`;
}

window.addEventListener("DOMContentLoaded", () => {
  if (query) {
    const productList = new ProductList(query, dataSource, listElement);
    productList.init();
  }
});