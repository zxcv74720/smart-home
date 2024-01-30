const Sequelize = require('sequelize');

module.exports = class VoiceCommand extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            voiceCommandId: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            command: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            action: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,       
            underscored: false,     
            modelName: 'VoiceCommand',   
            tableName: 'voiceCommands',  
            paranoid: false,       
            charset: 'utf8mb4',  
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        //db.VoiceCommand.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
    }
};