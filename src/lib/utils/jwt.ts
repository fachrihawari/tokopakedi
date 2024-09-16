import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET

export async function signJwtAccessToken<T extends JWTPayload>(payload: T) {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const alg = 'HS256';

    return new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('1w')
        .sign(secret);
}

export async function verifyJwt<T>(token: string): Promise<T> {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify<T>(token, secret);
    return payload
}
