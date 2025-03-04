const validate = (Schema)=> async(req,res,next)=>{
    try {
        const parseBody = await Schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "fill the details correctly";
        const extraDetails = err.errors[0].message;
        const error = {
            status,
            message,
            extraDetails,
        };
        // console.log(error);
        next(error);
    }   
};

export default validate;