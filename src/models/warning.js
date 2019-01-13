
module.exports = (sequelize, DataTypes) => {
    const Warning = sequelize.define('warning', {
        description: {
            type: DataTypes.TEXT,
        },
        userId: {
            type: DataTypes.UUID,
        },
        locationId: {
            type: DataTypes.UUID,
        },
    });
    return Warning;
};
