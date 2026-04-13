import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anandkumar124943_db_user:1TYdDZXEbPtriiuh@cluster0.m9znf8p.mongodb.net/food-delivery"
    );

    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;