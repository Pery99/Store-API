const Product = require('../model/product')

const getAllProducts = async (req, res) => {
    const { feautred, company, name, sort, fields, numericFilter } = req.query
    const queryObject = {};
    if (feautred) {
        queryObject.feautred = feautred === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (numericFilter) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eg',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }
    let result = Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

const getAllStaticProduct = async (req, res) => {
    const product = await Product.find({}).sort('name price');
    res.status(200).json({ product })
}

const addProduct = async (req, res) => {
    const { productName } = req.body;
    res.status(200).json({ productName, msg: 'Sucess' });
}

module.exports = {
    getAllProducts,
    getAllStaticProduct,
    addProduct
} 