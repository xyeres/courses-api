'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

/* 
    Setup the User Model
*/
module.exports = (sequelize) => {
    class User extends Model { }
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A firstName is required'
                },
                notEmpty: {
                    msg: "Please provide a firstName"
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A lastName is required'
                },
                notEmpty: {
                    msg: "Please provide a lastName"
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "The email address already exists"
            },
            validate: {
                notNull: {
                    msg: 'An email address is required'
                },
                notEmpty: {
                    msg: "Please provide an email address"
                },
                isEmail: {
                    msg: "Please provide a valid email address"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) { // Go ahead and hash the password before its persisted
                const hashedPass = bcrypt.hashSync(val, 10);
                this.setDataValue('password', hashedPass);
            },
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: "Please provide a password"
                }
            }
        },
    }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, { // establish m2m  relationship
          as: 'user', // alias
          foreignKey: {
            fieldName: 'userId',
            allowNull: false,
          },
        });
      };

    return User;
};