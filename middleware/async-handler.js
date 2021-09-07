// Handler function to wrap each route.
exports.asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'ValidationError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        // Forward error to the global error handler
        next(error);
      }
    }
  }
}

