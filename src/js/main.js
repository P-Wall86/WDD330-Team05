import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const list = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, list);

productList.init();