import type { RequestHandler } from 'express';
import { Monument } from '../models/monument.model.js';
import { Anecdote } from '../models/anecdote.model.js';
import { notFoundError, badRequestError } from '../errors/http-error.js';

export const findByMonument: RequestHandler = async (req, res) => {
    const monumentId = Number(req.params.id);

    const monument = await Monument.findByPk(monumentId);
    if (!monument) throw notFoundError(`Le monument avec l'ID ${monumentId} n'a pas été trouvé`);

    const anecdotes = await Anecdote.findAll({ where: { monumentId } });
    res.json({ message: 'Liste des anecdotes', data: anecdotes });
};

export const create: RequestHandler = async (req, res) => {
    const monumentId = Number(req.params.id);

    const monument = await Monument.findByPk(monumentId);
    if (!monument) throw notFoundError(`Le monument avec l'ID ${monumentId} n'a pas été trouvé`);

    const newAnecdote = await monument.createAnecdote({ content: req.body.content });
    res.status(201).json({ message: 'Anecdote créée', data: newAnecdote });
};

export const update: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);

    const anecdote = await Anecdote.findByPk(id);
    if (!anecdote) throw notFoundError(`L'anecdote avec l'ID ${id} n'a pas été trouvée`);

    await anecdote.update({ content: req.body.content });
    res.json({ message: 'Anecdote mise à jour', data: anecdote });
};

export const remove: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);

    const anecdote = await Anecdote.findByPk(id);
    if (!anecdote) throw notFoundError(`L'anecdote avec l'ID ${id} n'a pas été trouvée`);

    await anecdote.destroy();
    res.json({ message: 'Anecdote supprimée', data: null });
};