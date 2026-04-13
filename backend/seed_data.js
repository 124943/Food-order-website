import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import "dotenv/config";

const MONGO_URL = "mongodb+srv://anandkumar124943_db_user:1TYdDZXEbPtriiuh@cluster0.m9znf8p.mongodb.net/food-delivery";

const sampleFood = [
    {
        name: "Greek Salad",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_1.png",
        category: "Salad"
    },
    {
        name: "Veg Salad",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 18,
        image: "food_2.png",
        category: "Salad"
    },
    {
        name: "Clover Salad",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 16,
        image: "food_3.png",
        category: "Salad"
    },
    {
        name: "Chicken Salad",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 24,
        image: "food_4.png",
        category: "Salad"
    },
    {
        name: "Lasagna Rolls",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 14,
        image: "food_5.png",
        category: "Rolls"
    },
    {
        name: "Peri Peri Rolls",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_6.png",
        category: "Rolls"
    }
];

async function seedData() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        // Clear existing food list to start fresh or just add more
        // await foodModel.deleteMany({}); 

        for (const item of sampleFood) {
            const exists = await foodModel.findOne({ name: item.name });
            if (!exists) {
                const newFood = new foodModel(item);
                await newFood.save();
                console.log(`Added: ${item.name}`);
            } else {
                console.log(`Already exists: ${item.name}`);
            }
        }

        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seedData();
