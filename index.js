require("dotenv").config()
const express=require("express")
const cors=require("cors")
const{connection}=require("./config/db")
const{userRouter}=require("./routers/user.route")
const{authenticate}=require("./middleware/authenticate")
const{productRouter}=require("./routers/product.route")

const app=express()
//all middleware code present there
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Olx Home Page")
})
app.use("/user",userRouter)
app.use(authenticate)
app.use("/product",productRouter)

//sorting,filtering and searching code
app.get('/search', async (req, res) => {
    const query = req.query.q; // Get the search query from the query parameter
    const sortField = req.query.sortBy || 'name'; // Get the sort field from the query parameter, default to 'name'
    const sortOrder = req.query.sortOrder || 'asc'; // Get the sort order from the query parameter, default to 'asc'
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter, default to page 1
    const limit = parseInt(req.query.limit) || 10; // Get the number of items per page from the query parameter, default to 10
  
    try {
      const sortOptions = {};
      sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1; // Set the sort order based on the sortOrder parameter
  
      const count = await Item.countDocuments({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive search on the 'name' field
          { category: { $regex: query, $options: 'i' } }, // Case-insensitive search on the 'category' field
        ],
      });
  
      const totalPages = Math.ceil(count / limit);
  
      const items = await Item.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive search on the 'name' field
          { category: { $regex: query, $options: 'i' } }, // Case-insensitive search on the 'category' field
        ],
      })
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.json({
        items,
        page,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while searching.' });
    }
  });
  


//============================== Dont touch below code ========================================
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }
    catch(error){
        console.log("Not connected to DB")
    }
    console.log(`server running in Port ${process.env.port}`)
})