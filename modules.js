module.exports = {
    axios: require('axios'),
    util: require('util'),
    telegam_api: require('node-telegram-bot-api'),
    dotenv: require('dotenv').config(),
    express : require('express'),
    CONSTANTS: require('./CONSTANTS').getConstants
}