
module.exports = (sequelize, DataTypes) => {
    const Bucket = sequelize.define("Bucket", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        bucket_items: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        list_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        date_complete: {
            type: DataTypes.DATEONLY
        },

     image: {
         type: DataTypes.BLOB
     }

    });

    Bucket.associate = (models) => {
        Bucket.belongsTo(models.User, {
            user_id: {
                allowNull: false
            }
        });
        // Bucket.hasMany(models.User, {
        //     onDelete: "cascade" 
        // });
    };

    return Bucket; 
};









