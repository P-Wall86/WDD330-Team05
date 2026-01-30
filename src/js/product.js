import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";
import {loadHeaderFooter} from "./utils.mjs";

const dataSource = new ExternalServices();
const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);

loadHeaderFooter();
productDetails.init();
