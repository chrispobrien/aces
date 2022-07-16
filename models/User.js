const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        permission_level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(
                    newUserData.password,
                    10
                );
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(
                    updatedUserData.password,
                    10
                );
                return updatedUserData;
            },
        },
        // pass in our imported sequelize connection (the direct connection to the database)
        sequelize,
        // automatically create createdAt/updatedAt timestamp fields
        timestamps: true,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camelcase (i.e. 'comment_text' and not 'commentText')
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user',
    }
);

module.exports = User;
