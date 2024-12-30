import { models, model, Model, Schema, Document, CallbackError } from "mongoose";
import { boolean } from "zod";
// import bcrypt from "bcrypt";

// Extend the User interface to include methods
interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean;
}

interface UserDocument extends Document, User {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User schema
const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { type: String, required: true, minlength: 6 },
    verifyCode: {type: String, required: true, minlength: 4},
    isVerified: {type: Boolean, required: true, default: false}
});

// Middleware to hash the password before saving
// userSchema.pre("save", async function (next) {
//     const user = this as UserDocument;
//     if (!user.isModified("password")) {
//         return next();
//     }

//     try {
//         const saltRounds = 10;
//         user.password = await bcrypt.hash(user.password, saltRounds);
//         next();
//     } catch (error) {
//         next(error as CallbackError);
//     }
// });

// Define the custom method to compare passwords
// userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
//     const user = this as UserDocument;
//     return bcrypt.compare(candidatePassword, user.password);
// };

// Define the User model
const User: Model<UserDocument> = models.User || model<UserDocument>("User", userSchema);

export default User;
