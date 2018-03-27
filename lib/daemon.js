const schedule = require('node-schedule');
var loadparam = require('./loadparam.js');
var managechaudiere = require('./managechaudiere.js');

module.exports = function daemon() {
    // reload des parametres toutes les 10 minutes
    var j1 = schedule.scheduleJob('*/10 * * * *', function () {
        loadparam();
    });

    // check de la temperature cible chaque fois qu'on reçoit un état de la temperature
    gladys.on('GatewayMessage', (msg) => {
        //console.log('GatewayMessage => ' + JSON.stringify(msg));
        if ((msg.cmd === 'report' || msg.cmd === 'heartbeat')
            && msg.model === 'sensor_ht'
            && JSON.parse(msg.data).temperature) {
            managechaudiere();
        }
    });
}