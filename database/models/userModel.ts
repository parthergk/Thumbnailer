import { models, model, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

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
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { type: String, required: true, minlength: 6 },
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
    const user = this as any; // Type assertion to access `this` inside the middleware
    if (!user.isModified("password")) {
        return next(); // Skip if password is not modified
    }

    try {
        const saltRounds = 10; // Number of salt rounds
        user.password = await bcrypt.hash(user.password, saltRounds);
        next();
    } catch (error) {
        next(error); // Pass error to Mongoose error handler
    }
});

// Define the User model
const User: Model<User> = models.User || model<User>("User", userSchema);

export default User;
