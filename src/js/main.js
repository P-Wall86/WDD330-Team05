import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// This will load header and footer
loadHeaderFooter();

// product listing for tents    
const listElement = document.querySelector(".product-list");
if (listElement) {
  const tentsList = new ProductList("tents", listElement);
  tentsList.init();
}
