import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  points: number;
  badges: string[];
  streak: number;
  lastActive: Date | null;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  points: { type: Number, default: 0 },
  badges: [{ type: String }],
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: null }
});

const User = model<IUser>("User", userSchema);
export default User;
