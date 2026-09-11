import { Monument } from './monument.model.js';
import { Anecdote } from './anecdote.model.js';
import { User } from './user.model.js';
import { Favorite } from './favorite.model.js';

Monument.hasMany(Anecdote, {
    foreignKey: 'monumentId',
    as: 'anecdotes',
    onDelete: 'CASCADE',
});

Anecdote.belongsTo(Monument, {
    foreignKey: 'monumentId',
    as: 'monument',
});

User.belongsToMany(Monument, {
    through: Favorite,
    foreignKey: 'userId',
    otherKey: 'monumentId',
    as: 'favoriteMonuments',
});

Monument.belongsToMany(User, {
    through: Favorite,
    foreignKey: 'monumentId',
    otherKey: 'userId',
    as: 'favoritedByUsers',
});

Favorite.belongsTo(Monument, {
    foreignKey: 'monumentId',
    as: 'monument'
});