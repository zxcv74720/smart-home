const Sequelize = require('sequelize');
const User = require('./user');
const VoiceCommand = require('./voice-command');
const CalendarEvent = require('./calendar-event');
const DeviceControl = require('./device-control');
const Report = require('./report');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const db = {
    sequelize,
    User,
    VoiceCommand,
    CalendarEvent,
    DeviceControl,
    Report
};

User.init(sequelize);
VoiceCommand.init(sequelize);
CalendarEvent.init(sequelize);
DeviceControl.init(sequelize);
Report.init(sequelize);

User.associate(db);
VoiceCommand.associate(db);
CalendarEvent.associate(db);
DeviceControl.associate(db);
Report.associate(db);

module.exports = db;
