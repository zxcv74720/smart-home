const Sequelize = require('sequelize');

module.exports = class CalendarEvent extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            calendarEventId: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            time: {
                type: Sequelize.TIME,
                allowNull: false
            },
            type: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'CalendarEvent',
            tableName: 'calendarEvents',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        //db.CalendarEvent.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
    }
};
