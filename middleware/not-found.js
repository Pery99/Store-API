const notFound = (req, res) => {
    res.status(404).json({msg: 'The Route is not available now'});
}

module.exports = notFound