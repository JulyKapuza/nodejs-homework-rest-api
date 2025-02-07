const validation = (schema) => {
    return (req, res, next)=>{
        const { error } = schema.validate(req.body);
        if (error) {
         res.status(400).json({ message: "missing fields" });
        }
        next();
    }
};

module.exports = validation;