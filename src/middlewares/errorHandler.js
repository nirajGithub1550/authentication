export const errorHandler = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status (statusCode).json({
        status: status,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && {stack: err.stack}),
    });
}