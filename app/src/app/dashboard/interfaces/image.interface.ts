export interface GetImages {
  message: Image[];
}

export interface Image {
  path: string;
  descripcion: string;
  base64: string;
}
