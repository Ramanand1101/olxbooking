const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
		name: String,
		description: String,
		category : String,
		image : String,
		location : String,
		postedAt :Date,
		price : String	
})

const ProductModel=new mongoose.model("Products",productSchema)

module.exports={
	ProductModel
}