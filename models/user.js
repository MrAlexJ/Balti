
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,   
            autoIncrement: true
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        profile_img: {
            type: DataTypes.STRING,
            defaultValue: "default.jpg"
        },

        total_completed: {
            type: DataTypes.INTEGER
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [1]
            }
        },

        password: {
            type: DataTypes.STRING,
            unique: true,
            // allowNull: false,
            validate: {
                len: [1]
            }
        },

        token: {
            type: DataTypes.STRING,
            // allowNull: false
        }

    });
    User.associate = (models) => {
        User.hasMany(models.Bucket, {
            onDelete: "cascade"
            
        });
        User.belongsToMany(models.Bucket, {
            through: models.Co,
            partner_bucket: {
                allowNull: true
            }
        })
        // User.belongsToMany(models.Bucket, {as: 'userStats'})
    };
    return User;
}










