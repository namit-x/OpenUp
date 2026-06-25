import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log("OpenUpDB =", process.env.OpenUpDB);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.OpenUpDB as string);
    console.log("Connected with OpenUp Database.")
  }
  catch(err) {
    console.log("Cannot connect to the DB, ", err);
  }
}

export default connectDB;
