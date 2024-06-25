import { body, validationResult } from 'express-validator';

const ValidateRequest = async (req, res, next) => {
    //Validate data

    // const { name, price, imageUrl } = req.body;

    // let errors = [];
    // if (!name || name.trim() == '') {
    //     errors.push("Name is required")
    // }

    // if (!price || parseFloat(price) < 1) {
    //     errors.push("Price must be a positive value")
    // }

    // try {
    //     const validUrl = new URL(imageUrl)
    // } catch (error) {
    //     errors.push("URL is invalid");
    // }


    // Use Express validator

    //1.Set up rule for validator

    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price should be positive value'),
        // body('imageUrl').isURL().withMessage('Invalid URl')
        body('imageUrl').custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Image is required");
            }
            return true;
        })
    ];

    //2.run those rule
    await Promise.all(rules.map(rule => rule.run(req)))

    //3.check if there is any errors after running the rules
    let validationErrors = validationResult(req);
    console.log(validationErrors);

    //4. If there is any error return the error
    if (!validationErrors.isEmpty()) {
        return res.render("new-product", { errorMessage: validationErrors.array()[0].msg })
    }
    next();
}

export default ValidateRequest;