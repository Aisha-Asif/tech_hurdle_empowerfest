import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

export function sign(payload, opts = { expiresIn: '8h' }) {
  return jwt.sign(payload, JWT_SECRET, opts);
}

export function verify(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}