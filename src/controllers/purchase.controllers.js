const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
  const userId = req.user.id
  const purchases = await Purchase.findAll({where:{userId},include:[{
    model:Product,
    include:[Image]
}]})
    return res.json(purchases)
});
const create = catchError( async(req,res)=>{ 
  const userId = req.user.id
  const cart = await Cart.findAll({where:{userId},  attributes: ['userId','productId','quantity'],raw: true})
 const purchases= await Purchase.bulkCreate(cart)
  await Cart.destroy({where: {userId}})
  return res.json(purchases) 
})

module.exports = {
    getAll,
    create
}