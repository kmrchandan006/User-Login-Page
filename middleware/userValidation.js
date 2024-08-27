const Joi = require('joi');
// const {userValidationSchema} = require('../middlewares/userValidation');


// const userValidationSchema = (req, res, next) => {
//     const {firstName, lastName, mobile, email, street, city, country, username, password} = req.body;

   

    
// }

const userValidationSchema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),

    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(), // Added required()

    mobile: Joi.string()
        .min(10)
        .max(10)
        .pattern(new RegExp('^[0-9]{10}$'))
        .required(), // Added required()

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(), // Added required()
        
    street: Joi.string()
        .min(3)
        .max(50)
        .required(), // Adjusted max length and added required()

        state: Joi.string()
        .min(3)
        .max(50)
        .required(), // Adjusted max length and added required()

    city: Joi.string()
        .min(3)
        .max(50)
        .required(), // Adjusted max length and added required()

    country: Joi.string()
        .min(3)
        .max(50)
        .required(), // Adjusted max length and added required()

    username: Joi.string()
        .min(3)
        .max(30)
        .required(), // Adjusted max length and added required()

    password: Joi.string()
        .min(6)
        .max(6)
        .required(), // Adjusted max length and added required()
});


module.exports = {userValidationSchema}
