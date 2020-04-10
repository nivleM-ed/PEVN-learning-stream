const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

module.exports = {
    dbPool: config,
    pageLimit: 10,
}