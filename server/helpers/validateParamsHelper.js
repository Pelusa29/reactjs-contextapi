const validateId = (schema) => (req, res, next) => {
    try {
        schema.parse(req.params);
        return next();
    } catch (err) {
        res.status(400).json({ errors: err.errors });
    }
}

export default validateId