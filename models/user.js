module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
      screen_name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [1]
        }
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "/img/default.jpg"
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8]
        }
      },
  
      routeName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
    User.associate = models => {
      User.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };