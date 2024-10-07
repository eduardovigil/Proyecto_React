import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h'});
};

export const verifyToken = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        throw new Error('No Autorizado');
    }
    return jwt.verify(token, process.env.SECRET_KEY);
};