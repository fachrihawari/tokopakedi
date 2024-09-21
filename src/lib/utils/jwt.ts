import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET

export async function signToken(payload: JWTPayload) {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const alg = 'HS256';

    return new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('1w')
        .sign(secret);
}

export async function verifyToken(token: string) {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload
}
