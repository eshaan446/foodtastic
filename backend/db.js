const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI=process.env.MONGO_URI
 const mongoDB= async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,res)=>{
        if(err) console.log("Error->",err);
        console.log("Connection successfull");
        const fetched_data= await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err,data){
            const foodCategory= await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function(err,catData){
                if(err) console.log(err);
                else{
                    global.food_items=data;
                    global.foodCategory=catData;
                 }
            })
            
        });
    });
 }
 module.exports=mongoDB;
