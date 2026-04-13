import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import userModel from "./models/userModel.js";
import orderModel from "./models/orderModel.js";

const MONGO_URL = "mongodb+srv://anandkumar124943_db_user:1TYdDZXEbPtriiuh@cluster0.m9znf8p.mongodb.net/food-delivery";

async function checkDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        const foodCount = await foodModel.countDocuments();
        const userCount = await userModel.countDocuments();
        const orderCount = await orderModel.countDocuments();

        console.log(`Food items: ${foodCount}`);
        console.log(`Users: ${userCount}`);
        console.log(`Orders: ${orderCount}`);

        const adminUser = await userModel.findOne({ role: "admin" });
        if (adminUser) {
            console.log(`Admin user found: ${adminUser.email}`);
        } else {
            console.log("No admin user found.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkDB();
