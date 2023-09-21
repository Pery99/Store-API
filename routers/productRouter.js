const express = require('express');
const router = express.Router();
const { getAllProducts, getAllStaticProduct } = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllStaticProduct)
module.exports = router