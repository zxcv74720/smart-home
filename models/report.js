const Sequelize = require('sequelize');

module.exports = class Report extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            reportId: {
                type: Sequelize.BIGINT,
                autoIncrement: false,
                primaryKey: true
            },
            reportDate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            energyUsage: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            securityEventsCount: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            temperature: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            humidity: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            airQuality: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Report',
            tableName: 'reports',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        //db.Report.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
    }
};
