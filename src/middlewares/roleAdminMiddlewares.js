import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const JWT_SECRET = process.env.JWT_SECRET;
const roleAdminMiddleware = (req, res, next) => {
  // const token = req.header('Authorization').replace('Bearer ', '');
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;



  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. Malformed token.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'ADMIN') {
      return res
        .status(403)
        .json({ message: 'Acces denied. You are not authorized.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalide token.' });
  }
};

export default roleAdminMiddleware;
