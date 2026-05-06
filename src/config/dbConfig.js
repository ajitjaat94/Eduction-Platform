import mongoose from "mongoose";
const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URL);
         console.log("mongoDB connect successfully");
    } catch (error) {
        console.log("mongoDB connect faild");
    }
}
 export default connectDB;