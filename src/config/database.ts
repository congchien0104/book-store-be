//import config from "config";
import { connect } from "mongoose";

const connectDB = async () => {
  try {
    //const mongoURI: string = config.get("mongoURI");
    const mongoURI: string = "mongodb://localhost:27017/book-store"
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;