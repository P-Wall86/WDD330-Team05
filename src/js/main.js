import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter} from "./utils.mjs";

const dataSource = new ExternalServices("tents");
const list = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, list);

loadHeaderFooter();
productList.init();