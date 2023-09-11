import mongoose, { Document, Schema } from "mongoose";
export interface IImagen extends Document {
  path: string;
  descripcion: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const imagenSchema: Schema = new Schema(
  {
    path: { type: String, required: true },
    descripcion: { type: String, required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IImagen>("Imagen", imagenSchema);
