const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Building extends Model {}

Building.init(
    {
        building_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        parcel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'parcel',
                key: 'parcel_id',
            }
        },
        stories: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year_buit: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        half_bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        kitchens: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fireplaces: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        central_air: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        living_area: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        // pass in our imported sequelize connection (the direct connection to the database)
        sequelize,
        // automatically create createdAt/updatedAt timestamp fields
        timestamps: true,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camelcase (i.e. 'comment_text' and not 'commentText')
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'building',
    }
);

module.exports = Building;