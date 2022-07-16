const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Owner extends Model {}

Owner.init(
    {
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        owner_name_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        owner_address_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'address',
                key: 'address_id',
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
        modelName: 'owner',
    }
);

module.exports = Owner;
