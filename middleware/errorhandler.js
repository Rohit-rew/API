function handleError(err, req, res, next) {
  res.status(400).json({
    success: false,
    msg: err.message
  });
}


module.exports = handleError