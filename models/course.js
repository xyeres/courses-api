'use strict';
const { Model, DataTypes } = require('sequelize');

/* 
    Setup the Course Model
*/
module.exports = (sequelize) => {
    class Course extends Model { }
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A course title is required'
                },
                notEmpty: {
                    msg: "Please provide a course title"
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A course description is required"
                },
                notEmpty: {
                    msg: "Please provide a course description"
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User, { // establish 1-1 relationship
            as: 'user', // alias
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            }
        });
    };
    return Course;
};