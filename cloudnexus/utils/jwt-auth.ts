// utils/jwt-auth.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || '59d58a2e70858e21c1c8df799e06c24c515af94b5c9d5b5f6f3de57973e93c5f3e827f4f649a61e732bcefb5b92e1ed3bb45498cf4d92b0e3f1a829d2154df96';

export function signToken(payload: object) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: any) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
}
