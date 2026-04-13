import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "./models/userModel.js";
import "dotenv/config";

const MONGO_URL = "mongodb+srv://anandkumar124943_db_user:1TYdDZXEbPtriiuh@cluster0.m9znf8p.mongodb.net/food-delivery";

async function changeAdminCredentials() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("anand123", salt);

        // Delete the old admin first to avoid confusion
        await userModel.deleteOne({ email: "admin@gmail.com" });

        const adminUser = new userModel({
            name: "Anand Admin",
            email: "anand@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        await adminUser.save();
        console.log("Admin credentials updated successfully!");
        console.log("New Email: anand@gmail.com");
        console.log("New Password: anand123");
        
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

changeAdminCredentials();
