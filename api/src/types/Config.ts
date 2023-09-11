export interface Config {
  PORT: number;
  PERS: string;
  mongodb: {
    mongoUrl: string;
    options: {
      useNewUrlParser: boolean;
      useUnifiedTopology: boolean;
      serverSelectionTimeoutMS: number;
    };
  };
  STORAGE: string;
  SECRET_KEY: string;
  auth: Auth;
}

export interface Auth {
  USER: string;
  PASSWORD: string;
}
