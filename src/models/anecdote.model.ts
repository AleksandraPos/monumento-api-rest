import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional, type ForeignKey } from 'sequelize'
import { sequelize } from '../db/sequelize.js';
import { Monument } from './monument.model.js';

export class Anecdote extends Model<InferAttributes<Anecdote>, InferCreationAttributes<Anecdote>> {
    declare id: CreationOptional<number>;
    declare content: string;
    declare monumentId: ForeignKey<Monument['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Anecdote.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Le contenu de l'anecdote ne peut pas être vide"
            },
            len: {
                args: [10, 2000],
                msg: "Le contenu doit contenir entre 10 et 2000 caractères"
            }
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
});