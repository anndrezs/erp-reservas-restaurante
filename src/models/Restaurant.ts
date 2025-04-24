import mongoose, {Document, Schema} from "mongoose";

export interface IRestaurant extends Document{
    name: string;
    description: string;
    address: string;
    owner: mongoose.Types.ObjectId;
}

const RestaurantSchema = new Schema<IRestaurant>({
    name: { type: String, required: true },
    description: { type: String },
    address: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  });
export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);