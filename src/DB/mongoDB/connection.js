import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
