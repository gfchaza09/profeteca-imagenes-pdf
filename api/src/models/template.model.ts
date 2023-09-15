import mongoose, { Document, Schema } from "mongoose";
export interface ITemplate extends Document {
  nombre: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const templateSchema: Schema = new Schema(
  {
    nombre: { type: String, required: true },
    path: { type: String, required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITemplate>("Template", templateSchema);
