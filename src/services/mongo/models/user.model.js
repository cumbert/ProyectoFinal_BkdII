import mongoose from "mongoose"

const collection = "Users"

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true }, 
    age: { type: Number, min: 0 }, 
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' } 
})

const UserModel = mongoose.model(collection, userSchema)

export default UserModel