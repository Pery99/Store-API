const errorHandler = (err,req,res) =>{
    res.status(500).json({msg: 'something went wrong...try again'});
}

module.exports = errorHandler;