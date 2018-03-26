const schedule = require('node-schedule');
var loadparam = require('./loadparam.js');
var managechaudiere = require('./managechaudiere.js');

module.exports = function daemon() {
    // reload des parametres toutes les 10 minutes
    var j1 = schedule.scheduleJob('*/10 * * * *', function () {
        loadparam();
    });

    // check de la temperature cible chaque fois qu'on reçoit un état de la temperature
    Gladys.on('GatewayMessage', (msg) => {
        //if (gladys.modules['xiaomi-gateway'].shared.token !== ''
        if (msg.cmd === 'report'
            && msg.model === 'sensor_ht') {
            console.log('manage chaudiere');
            console.log(msg);
            managechaudiere();
        }
    });
}