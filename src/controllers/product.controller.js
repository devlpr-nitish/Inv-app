import path from 'path';
import ProductModel from '../models/product.model.js';



export default class ProductController {
    getProducts(req, res) {
        let products = ProductModel.get()
        // console.log(products);
        res.render("product", { products, userEmail : req.session.userEmail });
        // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'product.ejs'))
    }

    getAddForm(req, res) {
        return res.render("new-product", { errorMessage: null, userEmail : req.session.userEmail });
    }

    addNewProduct(req, res) {
        const { name, desc, price } = req.body;
        const imageUrl = "images/" + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl)
        let products = ProductModel.get();
        res.render('product', { products: products, userEmail : req.session.userEmail })
    }

    getUpdateProductview(req, res, next) {
        //1. if product then exists return view
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        // console.log(productFound);
        if (productFound) {
            res.render('update-product', { product: productFound, errorMessage: null, userEmail : req.session.userEmail });
        }

        //2. else return error
        else {
            res.status(401).send("Product Not Found");
        }
    }

    postUpdateProduct(req, res) {
        ProductModel.update(req.body)
        let products = ProductModel.get()
        res.render('product', { products, userEmail : req.session.userEmail });
    }


    deleteProduct(req, res) {
        const id = req.params.id
        const productFound = ProductModel.getById(id)
        if (!productFound) {
            return res.status(401).send("Product Not Found");
        }
        ProductModel.delete(id)
        let products = ProductModel.get()
        res.render('product', { products, userEmail : req.session.userEmail })
    }
}