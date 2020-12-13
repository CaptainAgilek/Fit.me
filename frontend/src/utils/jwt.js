import jwt from 'jsonwebtoken';

export function decodeToken(token) {
    return jwt.decode(token);
}