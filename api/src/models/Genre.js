const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('genre', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    });
}; // el id lo pone por defecto la bd