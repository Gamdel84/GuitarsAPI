import { config } from 'dotenv';
config();

export const envs = {
  
  FIREBASE: {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
  },
  port: process.env.PORT || 3005,
  secrets: {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "lajerhgnscdruhgnlseurygb",
  session: process.env.SESION_KEY || "dgbsdxgbzdtnxfhn"
  }
};
