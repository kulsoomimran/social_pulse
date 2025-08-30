import { Schema, model, Document, Types } from "mongoose";

// ---------------------------
// Interfaces
// ---------------------------
export interface IOption extends Document {
  _id: Types.ObjectId;
  text: string;
  votes: number;
}

export interface IReaction {
  user: Types.ObjectId;
  type: string;
}

export interface IComment extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
  createdAt: Date;
  reactions: IReaction[];
}

export interface IPoll extends Document {
  question: string;
  options: Types.DocumentArray<IOption>;   // ✅ DocumentArray fixes TS error
  createdBy: Types.ObjectId;
  comments: Types.DocumentArray<IComment>; // ✅ same for comments
  createdAt: Date;
}

// ---------------------------
// Schemas
// ---------------------------
const optionSchema = new Schema<IOption>({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

const commentSchema = new Schema<IComment>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  reactions: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      type: { type: String, enum: ["like", "love", "haha", "sad", "angry"], required: true }
    }
  ]
});

const pollSchema = new Schema<IPoll>({
  question: { type: String, required: true },
  options: [optionSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now }
});

// ---------------------------
// Model
// ---------------------------
const Poll = model<IPoll>("Poll", pollSchema);
export default Poll;


// import { Schema, model, Document, Types } from "mongoose";

// export interface IOption extends Document {
//   text: string;
//   votes: number;
// }

// export interface IPoll extends Document {
//   question: string;
//   options: Types.DocumentArray<IOption>;
//   createdBy: Types.ObjectId;
//   createdAt: Date;
// }

// const OptionSchema = new Schema<IOption>({
//   text: { type: String, required: true },
//   votes: { type: Number, default: 0 },
// });

// const PollSchema = new Schema<IPoll>(
//   {
//     question: { type: String, required: true },
//     options: [OptionSchema],
//     createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// export default model<IPoll>("Poll", PollSchema);
