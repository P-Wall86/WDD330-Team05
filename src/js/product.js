import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();