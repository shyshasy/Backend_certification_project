// src/controllers/reportingController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getDateFromPeriod = (period) => {
  const now = new Date();
  if (period === 'today') {
    return new Date(now.setHours(0, 0, 0, 0));
  } else if (period === 'week') {
    const firstDayOfWeek = now.getDate() - now.getDay();
    return new Date(now.setDate(firstDayOfWeek));
  } else if (period === 'month') {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  return null;
};

export const obtenirRapports = async (req, res) => {
  const { periode = 'all', guichetId = 'all' } = req.query;

  try {
    const dateDebut = getDateFromPeriod(periode);
    const where = {
      ...(dateDebut ? { dateCre: { gte: dateDebut } } : {}),
      ...(guichetId !== 'all' ? { guichetId: parseInt(guichetId) } : {}),
    };

    const totalTickets = await prisma.ticket.count({ where });
    const totalUtilisateurs = await prisma.utilisateur.count();
    const servis = await prisma.ticket.count({
      where: { ...where, statut: 'servi' },
    });
    const enAttente = totalTickets - servis;

    const ticketsParGuichet = await prisma.guichet.findMany({
      include: {
        _count: {
          select: { tickets: { where } },
        },
      },
    });

    const guichetData = ticketsParGuichet.map(guichet => ({
      guichetNom: guichet.nom,
      tickets: guichet._count.tickets,
    }));

    res.json({
      totalTickets,
      totalUtilisateurs,
      enAttente,
      servis,
      ticketsParGuichet: guichetData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'obtention des rapports' });
  }
};
