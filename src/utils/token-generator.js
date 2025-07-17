import jwt from 'jsonwebtoken';
import { envs } from '../config/envs.js'; 

const { JWT_SECRET_KEY } = envs.secrets;

export const generateToken = (userData) => {
  const user = { id: userData.id, email: userData.email };
  const expiration = { expiresIn: '1h' };

  return jwt.sign(user, JWT_SECRET_KEY, expiration);
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, message: error.message };
  };
};