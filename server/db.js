import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
//top level await ya no es necesario escribir estas funciones

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`Mongodb connected: ${conn.connection.name}`);
  } catch (error) {
    console.log(error);
    process.exit(1); //0 es que va bien y 1 hay un error y para el servidor
  }
};
