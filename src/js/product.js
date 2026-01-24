import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData();
const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);

loadHeaderFooter();
productDetails.init();