'use strict';

module.exports = (sequelize , DataTypes) => {
    const Role = sequelize.define("Role" , 
       {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            code: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        } ,
        {
            tableName: 'roles',   
            timestamps: true ,
            defaultScope : {
                attributes: { exclude: ['id' , 'createdAt' , 'updatedAt'] }
            }
        }
    );

    Role.associate = function(db) {
        Role.hasMany(db.User, {
            foreignKey: 'roleId',
            as: 'users'
        });
    };
    return Role ; 
}