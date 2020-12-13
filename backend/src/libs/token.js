import jwt from 'jsonwebtoken';

export function createToken(content) {
  return jwt.sign(content, process.env.JWT_SECRET);
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function createPasswordResetToken(content, secret) {
  return jwt.sign(content, secret, { expiresIn: '1h' });
}

export function verifyPasswordResetToken(token, secret) {
  return jwt.verify(token, secret, { expiresIn: '1h' });
}

export function decodeToken(token)
{
  return jwt.decode(token);
}
