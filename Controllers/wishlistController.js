const { response } = require('express')
const wishlists = require('../Models/wishlistSchema')

//Add to wishlist
exports.addWishlist = async(req,res)=>{
    //get a product id
    const {id,title,price,image}= req.body
    //add details of the product to the db
    const userId = req.payload
    try{
        const existingProduct = await wishlists.findOne({id})
        if(existingProduct){
            res.status(404).json("Product already exists")
        }
        else{
            const newProduct = new wishlists({
                id,title,price,image,userId
            })
           await newProduct.save()
           res.status(200).json("Product Added successfully")
        }
    }
    catch(err){
        res.status(500).json("error", err) 
    }


}

//get all products from the wishlists
exports.getWishlist = async(req,res)=>{
    try{
        const wishlistProduct = await wishlists.find()
        if(wishlistProduct){
            res.status(200).json(wishlistProduct) 
        }
        else{
            res.status(404).json("Product Not Found") 
        }
       
    }
    catch(err){
        res.status(500).json("error", err) 
    }
}

//delete from wishlist
exports.deleteFromWishlist = async(req, res)=>{
    const {id} = req.params
    try{
        const deleteItem = await wishlists.deleteOne({id})
        if(deleteItem){
            const wishlistProduct = await wishlists.find()
            res.status(200).json(wishlistProduct) 
        }
    }
    catch(err){
        res.status(500).json("error", err)  
    }
}