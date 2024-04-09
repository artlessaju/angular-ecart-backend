
const carts = require('../Models/cartSchema')

//AddToCart

exports.addToCart =async(req,res)=>{
    //get details
    const {id,title,price,image,quantity}=req.body
    try{
        const cartitem = await carts.findOne({id})
        if(cartitem){
            cartitem.quantity+=1
            cartitem.price=cartitem.quantity*cartitem.price
            res.status(200).json("Product updated successfully")
        }
        else{
            const cartNewProduct = new carts({id,title,price,image,quantity})
            await cartNewProduct.save()
            res.status(200).json("Product added successfully")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.getCart=async(req,res)=>{
    try{
        const allCartProducts = await carts.find()
        res.status(200).json(allCartProducts)
    }
    catch(err){
        res.status(404).json(err)
    }
}