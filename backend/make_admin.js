import mongoose from "mongoose";
import userModel from "./models/userModel.js";
import "dotenv/config";

const MONGO_URL = "mongodb+srv://anandkumar124943_db_user:1TYdDZXEbPtriiuh@cluster0.m9znf8p.mongodb.net/food-delivery";

async function makeAdmin() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        const user = await userModel.findOne({ email: "admin@gmail.com" });
        if (user) {
            user.role = "admin";
            await user.save();
            console.log("User admin@gmail.com is now an admin!");
        } else {
            console.log("User not found. Please register first on the frontend or check the email.");
        }
        
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

makeAdmin();
