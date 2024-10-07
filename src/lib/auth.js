import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h'});
    return token;
};

export const verifyToken = (request) => {
    const authHeader = request.headers.get('Authorization');
    if(!authHeader){
        throw new Error('Token no proporcionado');
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        throw new Error('No Autorizado');
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new Error('Token invalido');
    }
    
};