import 'dotenv/config';

function requireEnvironmentVariable(name){
    const value = process.env[name];

    if(!value){
        throw new Error(`Missing environment variables: ${name}`);
    }

    return value;
}

const jwtSecret = requireEnvironmentVariable("JWT_SECRET");

if(Buffer.byteLength(jwtSecret, "utf8") < 32){
    throw new Error("JWT_SECRET must contain at least 32 bytes");
}

export const env = Object.freeze({
    port: Number(process.env.PORT) || 4000,

    jwt: {
        secret: jwtSecret,
        issuer: process.env.JWT_ISSUER || 'clean-auth-api',
        audience: process.env.JWT_AUDIENCE || 'clean-auth-client',
        expiresIn: process.env.JWT_EXPIRES || '1h'
    }
})