const schedule = require('node-schedule');
var loadparam = require('./loadparam.js');
var managechaudiere = require('./managechaudiere.js');
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

module.exports = function daemon() {
    // wait 10 seconds to be sure everything is loaded
    await sleep(10000);

    // reload des parametres toutes les 10 minutes
    var j1 = schedule.scheduleJob('*/10 * * * *', function () {
        loadparam();
    });

    // check de la temperature cible toutes les 10 secondes
    var j2 = schedule.scheduleJob('*/10 * * * * *', function () {
        managechaudiere();
    });
}
