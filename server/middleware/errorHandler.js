const notFound = (req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    return res.status(statusCode).json({ message: error.message });
};

module.exports = {
    errorHandler,
    notFound,
};