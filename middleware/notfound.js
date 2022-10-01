const notfound = (req,res)=>{
    res.status(400).json({success : false , message : 'Route not found'})
}

module.exports = notfound