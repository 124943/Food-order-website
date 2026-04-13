import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "./models/userModel.js";
import "dotenv/config";

const MONGO_URL = "mongodb+srv://anandkumar124943_db_user:1TYdDZXEbPtriiuh@cluster0.m9znf8p.mongodb.net/food-delivery";

async function resetAdmin() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        const user = await userModel.findOne({ email: "admin@gmail.com" });
        if (user) {
            user.role = "admin";
            user.password = hashedPassword;
            await user.save();
            console.log("User admin@gmail.com updated with admin role and password: admin123");
        } else {
            const adminUser = new userModel({
                name: "Admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                role: "admin"
            });
            await adminUser.save();
            console.log("Admin user created successfully with password: admin123");
        }
        
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

resetAdmin();
