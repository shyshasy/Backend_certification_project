import prisma from "../config/client.js";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config()
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
class UserService{
    static async authenticate(email, password) {
        try {
          const user = await prisma.utilisateur.findUnique({
            where: {
              email: email,
              password: password
            },
          });
    
          if (!user) {
            throw new Error('User not found');
          }
    
        //   if (!user.status) {
        //     throw new Error('Account is inactive');
        //   }
        
        
        
        const isMatch = bcrypt.compare(password, user.password);
        
        if (!isMatch) {
          
          throw new Error('Incorrect pass word');
        }
        
        const token = jwt.sign(
          { id: user.id, name: user.nom, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION || '5h' }
          );
          
          
          return { token, user: { id: user.id, name: user.nom, role: user.role } };
        } catch (error) {
          throw error;
        }
      }
    
}
export default UserService