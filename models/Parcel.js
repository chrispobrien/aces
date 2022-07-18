const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Parcel extends Model {}

Parcel.init(
    {
        parcel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        swis_sbl_key: {
            type: DataTypes.STRING(26),
            allowNull: false,
            // unique: true,
        },
        swis_code: {
            type: DataTypes.VIRTUAL,
            get() {
                return swis_sbl_key.substring(0, 5);
            },
            set() {
                throw new Error('swis_code is a virtual for swis_sbl_key');
            },
        },
        section: {
            type: DataTypes.VIRTUAL,
            get() {
                return swis_sbl_key.substring(6, 8);
            },
            set() {
                throw new Error('section is a virtual for swis_sbl_key');
            },
        },
        subsection: {
            type: DataTypes.VIRTUAL,
            get() {
                return swis_sbl_key.substring(9, 11);
            },
            set() {
                throw new Error('block is a virtual for swis_sbl_key');
            },
        },
        block: {
            type: DataTypes.VIRTUAL,
            get() {
                return swis_sbl_key.substring(12, 15);
            },
            set() {
                throw new Error('block is a virtual for swis_sbl_key');
            },
        },
        lot: {
            type: DataTypes.VIRTUAL,
            get() {
                return swis_sbl_key.substring(16, 18);
            },
            set() {
                throw new Error('lot is a virtual for swis_sbl_key');
            },
        },
        sublot: {
            type: DataTypes.VIRTUAL,
            get() {
                return swis_sbl_key.substring(19, 21);
            },
            set() {
                throw new Error('sublot is a virtual for swis_sbl_key');
            },
        },
        suffix: {
            type: DataTypes.VIRTUAL,
            get() {
                return swis_sbl_key.substring(22, 25);
            },
            set() {
                throw new Error('suffix is a virtual for swis_sbl_key');
            },
        },
        print_key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        school_code: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        legal_address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'address',
                key: 'address_id',
            },
        },
        acreage: {
            type: DataTypes.DECIMAL(11,4),
            allowNull: false
        },
        total_assessed_value: {
            type: DataTypes.DECIMAL(11,0),
            allowNull: false
        },
        land_assessed_value: {
            type: DataTypes.DECIMAL(11,0),
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
        modelName: 'parcel',
    }
);

module.exports = Parcel;
