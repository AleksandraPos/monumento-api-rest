import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional, type ForeignKey } from 'sequelize'
import { sequelize } from '../db/sequelize.js';
import { User } from './user.model.js';
import { Monument } from './monument.model.js';

export class Favorite extends Model<InferAttributes<Favorite>, InferCreationAttributes<Favorite>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare monumentId: ForeignKey<Monument['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Favorite.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    indexes: [
        {
            unique: true,
            fields: ['userId', 'monumentId'],
        },
    ],
});