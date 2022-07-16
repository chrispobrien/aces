const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Address extends Model {}

Address.init(
    {
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address_street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address_other: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address_city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address_state: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        address_zip5: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address_zip4: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        address_zip: {
            type: DataTypes.VIRTUAL,
            get() {
                return address_zip4
                    ? ('00000' + address_zip5).slice(-5) + '-' + ('0000'+address_zip4).slice(-4)
                    : ('00000' + address_zip5).slice(-5);
            },
            set(value) {
                throw new Error(
                    `address_zip is a virtual for address_zip5 + address_zip4 (${value})`
                );
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
        modelName: 'address',
    }
);

module.exports = Address;
