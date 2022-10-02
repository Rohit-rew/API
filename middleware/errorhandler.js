function handleError(err, req, res, next) {
  res.status(200).json({
    success: false,
    msg: err.message
  });
}


module.exports = handleError