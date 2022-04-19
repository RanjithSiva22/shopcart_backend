var Joi=require('@hapi/joi');


function validateUser(user)
{
    const JoiSchema = Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
        
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}


function loginUser(user)
{
    const JoiSchema = Joi.object({
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
        
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}

module.exports.validateUser=validateUser;
module.exports.loginUser=loginUser;