const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            id: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: 'kakao_password'
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        //db.User.hasMany(db.VoiceCommand, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'cascade' });
        //db.User.hasMany(db.Report, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'cascade' });
        //db.User.hasMany(db.DeviceControl, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'cascade' });
        //db.User.hasMany(db.CalendarEvent, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'cascade' });
    }
};
