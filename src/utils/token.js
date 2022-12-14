import jwt from 'jsonwebtoken';
import 'dotenv/config'


// const { jwtSecret } = config;

export const generateToken = id => {
    return jwt.sign({
        sub: id,
        iss: 'App',
        iat: new Date().getTime()
    }, JWT_SECRET, { expiresIn: '30d' });
};
