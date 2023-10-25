export interface Config {
  PORT: number;
  PERS: string;
  mongodb: MongoDb;
  STORAGE: string;
  SECRET_KEY: string;
  auth: Auth;
  API_DATA_URL: string;
  htmlCssToImage: HtmlCssToImage;
}

export interface MongoDb {
  mongoUrl: string;
  options: MongoDbOptions;
}

export interface MongoDbOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  serverSelectionTimeoutMS: number;
}

export interface Auth {
  USER: string;
  PASSWORD: string;
}

export interface HtmlCssToImage {
  HTMLTOCSSIMAGE_USER_ID: string;
  HTMLTOCSSIMAGE_API_KEY: string;
}
