import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayout from 'express-ejs-layouts';
import addProductValidation from './src/middlewares/validation.middleware.js';
import { uplodeFile } from './src/middlewares/file-uplode.middleware.js';
import UserController from './src/controllers/User.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { lastVisit } from './src/middlewares/lastVisit.middleware.js';

const app = express();

app.use(express.static('public'));
app.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }

}));

app.use(cookieParser());
app.use(lastVisit);
//Parse form data // to receive data from the form
app.use(express.urlencoded({ extended: true }));

//set up view engine settings
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), 'src', 'views'));
app.use(ejsLayout);


//create an instance of ProductController
const productController = new ProductController();

//create an instance of UserController  
const userController = new UserController();

app.get('/', lastVisit, auth, productController.getProducts);
app.get('/new', auth, productController.getAddForm);
app.get('/update-product/:id', auth, productController.getUpdateProductview);
app.post('/delete-product/:id', auth, productController.deleteProduct);
app.post('/', uplodeFile.single('imageUrl'), auth, addProductValidation, productController.addNewProduct);
app.post('/update-product/', auth, productController.postUpdateProduct);

app.get('/register', userController.getRegister);
app.get('/login', userController.getLogin);

app.post('/register', userController.postRegister);
app.post('/login', userController.postLogin);

app.get('/logout', userController.logout);


app.use(express.static('src/views'));


app.listen(3000, () => {
    console.log(`Server is running`);
})

