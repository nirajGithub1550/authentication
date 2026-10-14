// src/utils/asyncHandler.js
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    // If the promise rejects, catch it and pass to next()
    fn(req, res, next).catch(next);
  };
};