import { model, models, Schema, Types, Document } from "mongoose";

// Define the interface for Thumbnail
interface ThumbnailType extends Document {
    img: string;
    user: string | Types.ObjectId; // Reference to User
}

// Define the Thumbnail schema
const thumbnailSchema = new Schema<ThumbnailType>({
    img: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

// Define the Thumbnail model
const Thumbnail = models.Thumbnail || model<ThumbnailType>("Thumbnail", thumbnailSchema);

export default Thumbnail;