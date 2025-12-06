import mongoose from "mongoose";

//connect db

const connectDB = async () => {
    mongoose.connection.on('connected', () =>
    console.log("db connected"))

    await mongoose.connect(`${process.env.MONGODB_URI}/academix`)
}

export default connectDB;