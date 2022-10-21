const passwordValidator = require("password-validator")
const passwordSchema = new passwordValidator()

passwordSchema
.is().min(8)
.is().max(60)
.has().uppercase()                              
.has().lowercase()                              
.has().digits(1)                                
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (req,res,next) => {
    if(passwordSchema.validate(req.body.password)){
        next()
    }else{
        res.status(400).json( { error: "Echec de la validation du mot de passe" } )
    }
}