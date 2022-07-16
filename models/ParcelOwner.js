const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ParcelOwner extends Model {}

ParcelOwner.init(
    {
        id: {
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
            },
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'owner',
                key: 'owner_id',
            },
        },
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
        modelName: 'parcelowner',
    }
);

module.exports = ParcelOwner;
