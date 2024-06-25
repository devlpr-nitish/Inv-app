// Please don't change the pre-written code
// Import the necessary modules here
import ProductModel from "../models/product.model.js";
let productModel = new ProductModel();

export default class ProductController {
  getProducts = (req, res) => {
    // Write your code here
    res.render("product", { products: productModel.fetchProducts() });
  };
}
