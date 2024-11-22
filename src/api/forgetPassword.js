import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/client.js";

// Function to send email
const sendResetEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Or your preferred email service
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
    },
  });

  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Réinitialisation du mot de passe",
    text: `Veuillez cliquer sur ce lien pour réinitialiser votre mot de passe: ${resetLink}`,
  };

  return transporter.sendMail(mailOptions);
};

// Request password reset route
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.Utilisateur.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_RESET_SECRET, {
      expiresIn: "1h",
    });

    // Save the token in the database (optional) or proceed directly with sending email
    // You can save the token with the user data to track the reset process

    await sendResetEmail(email, resetToken);

    res.json({ message: "Email de réinitialisation envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation :", error);
    res.status(500).json({ message: "Erreur lors de la demande de réinitialisation." });
  }
};

export const resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      if (!token) {
        return res.status(400).json({ message: "Token requis." });
      }
  
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
  
      const user = await prisma.Utilisateur.findUnique({ where: { id: decoded.userId } });
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
  
      // Hacher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Mettre à jour le mot de passe dans la base de données
      await prisma.Utilisateur.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
  
      res.json({ message: "Mot de passe réinitialisé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error);
  
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({ message: "Le lien de réinitialisation a expiré." });
      }
  
      res.status(500).json({ message: "Erreur lors de la réinitialisation du mot de passe." });
    }
  };
  