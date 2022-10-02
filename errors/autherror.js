class autherror extends Error {
  constructor(message) {
    super(message);
    res.status(200).json({success : false , msg : "authentication error"})
  }
}

module.exports = autherror 