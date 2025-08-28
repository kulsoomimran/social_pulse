// models/Poll.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IOption extends Document {
  text: string;
  votes: number;
}

export interface IPoll extends Document {
  question: string;
  options: Types.DocumentArray<IOption>;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const OptionSchema = new Schema<IOption>({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const PollSchema = new Schema<IPoll>(
  {
    question: { type: String, required: true },
    options: [OptionSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IPoll>("Poll", PollSchema);
