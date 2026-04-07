const express = require("express")
const cors = require("cors")
require("dotenv").config();
const connectDB = require("./src/config/db");

const port =5000

// main app 
const app = express()
const userRoutes =require("./src/routes/userRoutes")

// middleware
app.use(express.json())
app.use(cors())
app.use("/api/users", userRoutes)

const itemRoutes = require("./src/routes/itemRoutes");

app.use("/api/items", itemRoutes);


connectDB();
app.get("/",(req,res) =>{
    res.send("Server running")
})
app.post("/test" ,(req,res) =>{
res.json({
    message:"data recieved",
    data: req.body
});
})
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)

})  


