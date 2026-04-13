import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import fs from "fs";
import path from "path";
import "dotenv/config";

const MONGO_URL = "mongodb+srv://anandkumar124943_db_user:1TYdDZXEbPtriiuh@cluster0.m9znf8p.mongodb.net/food-delivery";
const uploadsDir = "./uploads";

async function fixImagePaths() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        const files = fs.readdirSync(uploadsDir);
        const foods = await foodModel.find({});

        for (const food of foods) {
            const fileName = food.image; // e.g., "food_1.png"
            const matchingFile = files.find(f => f.endsWith(fileName));
            
            if (matchingFile && matchingFile !== fileName) {
                food.image = matchingFile;
                await food.save();
                console.log(`Updated ${food.name} image to ${matchingFile}`);
            }
        }

        console.log("Image paths fixed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error fixing image paths:", error);
        process.exit(1);
    }
}

fixImagePaths();
