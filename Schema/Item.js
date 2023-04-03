import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String
});

export default mongoose.model("Items", itemSchema);