// db.js
import mongoose from "mongoose";

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB is Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
export default connectDB