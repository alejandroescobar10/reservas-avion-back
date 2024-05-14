import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://alejoesmo:edwardjunior@cluster0.ovtdg3f.mongodb.net/tickets")
        console.log(">>> BD connected")
    } catch (error) {
        console.log(error)
    }
}