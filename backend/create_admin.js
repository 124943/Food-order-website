import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "./models/userModel.js";
import "dotenv/config";

const MONGO_URL = "mongodb+srv://anandkumar124943_db_user:1TYdDZXEbPtriiuh@cluster0.m9znf8p.mongodb.net/food-delivery";

async function createAdmin() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        const existingAdmin = await userModel.findOne({ email: "admin@gmail.com" });
        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        const adminUser = new userModel({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        await adminUser.save();
        console.log("Admin user created successfully!");
        console.log("Email: admin@gmail.com");
        console.log("Password: admin123");
        
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
}

createAdmin();
