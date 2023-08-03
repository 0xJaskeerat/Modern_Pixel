import mongoose from "mongoose";

const connectDB = (url) => {
    // for search functionality
    mongoose.set('strictQuery',true);
    
    // connecting backend to database
    mongoose.connect(url)
        .then(() => console.log("MongoDb connected"))
        .catch((err) => console.log("err", err));
}

export default connectDB;