import { Monument } from './monument.model.js';
import { Anecdote } from './anecdote.model.js';

Monument.hasMany(Anecdote, {
    foreignKey: 'monumentId',
    as: 'anecdotes',
    onDelete: 'CASCADE',
});

Anecdote.belongsTo(Monument, {
    foreignKey: 'monumentId',
    as: 'monument',
});