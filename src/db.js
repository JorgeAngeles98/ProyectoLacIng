import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://201711202:o91996@clusterurp.k1azl.mongodb.net/");
        console.log("Database connected");
    }catch(error){
        console.log(error);
    }
}