const bcrypt=require("bcrypt")
const express=require("express")
const {ProductModel}=require("../models/productmodel")


const productRouter=express.Router()

productRouter.get("/",async(req,res)=>{
    try{
        const productdata =await ProductModel.find() 
        res.status(200).send(productdata)
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

productRouter.post("/create",async(req,res)=>{
    try{
        const payload=req.body
        const productdata= new ProductModel(payload)
        await productdata.save()
        res.status(200).send("Product Added to Database")
    }
    catch(error){
        res.status(500).send("Data not added")
        console.log(error.message)
        
    }
   
})


productRouter.delete("/:id",async(req,res)=>{
    let id=req.params.id;
    try{
        await ProductModel.findByIdAndDelete(id);
        res.status(202).send("Product Data deleted successfully")
    }
    catch(error){
        res.status(400).send({
            error:error.message
        })
    }
})

productRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params.id;
    let data=req.body;
    try{
        await ProductModel.findByIdAndUpdate(id,data);
        res.status(201).send("Product Data update successfully")
    }
    catch(error){
        res.status(400).send({
            error:error.message
        })
    }
})


module.exports={
    productRouter
}