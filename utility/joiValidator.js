const Joi = require("joi");

module.exports = (schema) => async (req, res, next) => {
    try {
         
        const check = await schema.validate(req.body);
        
       
        if (check.error) {

            console.log(`-----req para error---`,check.error)
            res.status(200).json({
                status: false,
                message: check.error.details[0].message,
                data: {}
            })
        }
        else
            {
                next();
            }
        

    } catch (error) {
        console.log("--validator==error===>", error)
    }
}