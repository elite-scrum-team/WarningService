'use strict'
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: (image, _) => 
                Image.count({
                    where: {
                        WarningId: image.dataValues.WarningId
                    }
                }).then(count => {
                    if (count >= 5) return sequelize.Promise.reject("Image upload limit reached")
                    return sequelize.Promise.resolve()
                })   
        }
    })
    Image.associate = function(models) {
        Image.belongsTo(models.Warning)
    }
    return Image
}