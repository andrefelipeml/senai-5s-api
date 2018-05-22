  module.exports = (sequelize, DataTypes) => {  
    const User = sequelize.define('User', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },		
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        userName: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        profile: {
            type: DataTypes.STRING
        },
    },  
    {
        tableName: 'users' 
    });
    
    return User;
  };