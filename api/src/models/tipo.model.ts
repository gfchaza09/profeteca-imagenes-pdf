import mongoose, { Document, Schema } from "mongoose";
export interface ITipo extends Document {
  nombre: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const tipoSchema: Schema = new Schema(
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

export default mongoose.model<ITipo>("Tipo", tipoSchema);
