import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

export interface Todo extends Document {
  task: string;
  completed: boolean;
  priority: string;
  category: string;
  dueDate?: Date;
}

const TodoSchema = new mongoose.Schema<Todo>(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "medium",
    },
    category: {
      type: String,
      required: true,
      enum: ["Work", "Personal", "Shopping", "Health"],
    },
    dueDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Todo>("Todo", TodoSchema);
