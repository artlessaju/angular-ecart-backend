
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


exports.deleteCart=async(req,res)=>{
const {id} = req.params
try{

const deleteCartProduct = await carts.deleteOne({id})

if(deleteCartProduct){

const allCartProducts = await carts.find()
res.status(200).json(allCartProducts)

}



}
catch(err){

res.status(404).json(err)

}



}

exports.incrementCart = async(req,res)=>{

const {id} = req.params


try{
    //check if product already exists
const incrementCartproduct = await carts.findOne({id})
//if the product alraedy exists then increment product quantity 1 and update the price accordingly
if(incrementCartproduct){

incrementCartproduct.quantity+=1
incrementCartproduct.grandTotal = incrementCartproduct.price*incrementCartproduct.quantity
//if it's updated , then stored to mongodb 
await incrementCartproduct.save()
//get all the products item details after updating
const allCartProducts = await carts.find()
res.status(200).json(allCartProducts)

}
else{

    res.status(402).json("item not found")
}

}
catch(err){

res.status(404).json(err)
}

}


exports.decrementCart = async(req,res)=>{

    const {id} = req.params
    
    
    try{
        //check if product already exists
    const decrementCartproduct = await carts.findOne({id})
    //if the product alraedy exists then increment product quantity 1 and update the price accordingly
    if(decrementCartproduct){
    
    decrementCartproduct.quantity-=1
    if(decrementCartproduct.quantity==0){
//if product quantity is 0 , then delete product from cart
        const deleteCartProduct = await carts.deleteOne({id})

        if(deleteCartProduct){
        
        const allCartProducts = await carts.find()
        res.status(200).json(allCartProducts)
        
        }
        

        
    }
    else{
// if product quantity is not 0 , then update pice accordingly
        decrementCartproduct.grandTotal = decrementCartproduct.price*decrementCartproduct.quantity
        //if it's updated , then stored to mongodb 
        await decrementCartproduct.save()
        //get all the products item details after updating
        const allCartProducts = await carts.find()
        res.status(200).json(allCartProducts)

    }

    
    }
    else{
    
        res.status(402).json("item not found")
    }
    
    }
    catch(err){
    
    res.status(404).json(err)
    }
    
    }