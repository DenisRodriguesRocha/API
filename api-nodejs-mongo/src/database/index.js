import mongoose from "mongoose";

mongoose.connect("mongodb+srv://sined:Dr20012004@cluster0.norqwlb.mongodb.net/?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;