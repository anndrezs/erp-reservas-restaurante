import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'cliente' | 'restaurante' | 'admin'; 

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
 
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['cliente', 'restaurante', 'admin'], default: 'cliente' },
}); //{ timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);