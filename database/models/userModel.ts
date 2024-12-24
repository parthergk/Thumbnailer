import { models, model, Model, Schema } from "mongoose";

interface User {
    name: string;
    username: string;
    email: string;
    password: string;
}

// Define the User schema
const userSchema = new Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // Email format validation
    password: { type: String, required: true, minlength: 6 }, // Ensure a minimum password length
});

// Define the User model
const User: Model<User> = models.User || model<User>("User", userSchema);

export default User;
