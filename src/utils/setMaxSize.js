const setMaxSize = (maxSize) => (req, res, next) => {
    req.maxSize = maxSize;
    next();
  };
  
  module.exports = setMaxSize;
  