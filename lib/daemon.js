const schedule = require('node-schedule');
var loadparam = require('./loadparam.js');
var managechaudiere = require('./managechaudiere.js');

module.exports = function daemon() {
    // reload des parametres toutes les 10 minutes
    var j1 = schedule.scheduleJob('*/1 * * * *', function () {
        loadparam();
    });

    // check de la temperature cible toutes les 10 secondes
    var j2 = schedule.scheduleJob('*/10 * * * * *', function () {
        managechaudiere();
    });

    gladys.on('newDeviceState', (msg) => {
        console.log('test detection device ' + JSON.stringify(msg));
    })
}
