import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://201711202:o91996@clusterurp.k1azl.mongodb.net/");
        console.log("Conexión con la base de datos exitosamente");
    }catch(error){
        console.log("Error al conectar con la base de datos", error);
    }
}