import type { RequestHandler } from 'express';
import { Monument } from '../models/monument.model.js';
import { Favorite } from '../models/favorite.model.js';
import { notFoundError, badRequestError } from '../errors/http-error.js';
import { currentUser } from '../middlewares/require-auth.js';
import { UniqueConstraintError } from 'sequelize';

export const findAll: RequestHandler = async (req, res) => {
    const { userId } = currentUser(req);

    const favorites = await Favorite.findAll({
        where: { userId },
        include: [{ model: Monument, as: 'monument' }],
    });

    res.json({ message: 'Liste des favoris', data: favorites });
};

export const create: RequestHandler = async (req, res) => {
    const { userId } = currentUser(req);
    const monumentId = Number(req.params.monumentId);

    const monument = await Monument.findByPk(monumentId);
    if (!monument) throw notFoundError(`Le monument avec l'ID ${monumentId} n'a pas été trouvé`);

    try {
        const favorite = await Favorite.create({ userId, monumentId });
        res.status(201).json({ message: 'Monument ajouté aux favoris', data: favorite });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            throw badRequestError('Ce monument est déjà dans vos favoris.');
        }
        throw error;
    }
};

export const remove: RequestHandler = async (req, res) => {
    const { userId } = currentUser(req);
    const monumentId = Number(req.params.monumentId);

    const deletedCount = await Favorite.destroy({ where: { userId, monumentId } });
    if (deletedCount === 0) throw notFoundError(`Aucun favori trouvé pour ce monument.`);

    res.json({ message: 'Monument retiré des favoris', data: null });
};