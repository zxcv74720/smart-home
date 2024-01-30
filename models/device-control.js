const Sequelize = require('sequelize');

module.exports = class DeviceControl extends Sequelize.Model {
    static init(sequelize) {
        return super.init({ 
            deviceControlId: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            action: {
                type: Sequelize.STRING(100),
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
            modelName: 'DeviceControl',
            tableName: 'deviceControls',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        //db.DeviceControl.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
    }
};
