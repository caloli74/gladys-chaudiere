const schedule = require('node-schedule');
var loadparam = require('./loadparam.js');
var managechaudiere = require('./managechaudiere.js');

module.exports = function daemon() {
    // reload des parametres toutes les 10 minutes
    schedule.scheduleJob('*/10 * * * *', function () {
        loadparam();
    });

    // check de la temperature cible toutes les 1 minutes
    schedule.scheduleJob('0 * * * * *', function () {
        managechaudiere();
    });
}