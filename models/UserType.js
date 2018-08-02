module.exports = (sequelize, DataTypes) => {
    var UserType = sequelize.define('UserType', {
      user_type: {
        primaryKey: false,
        type: DataTypes.STRING
      },
      user_id: {
        primaryKey: true,
        type: DataTypes.INTEGER
      }

    }, {
      classMethods: {
        associate: function(models) {
      }
    },
    
    tableName: 'user_has_type' 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    });

    UserType.associate = (models) => {
      UserType.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
          allowNull: false
        }
      });
    }
    return UserType;
  };