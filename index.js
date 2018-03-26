module.exports = function (sails) {
    var install = require('./lib/install.js');
    var daemon = require('./lib/daemon.js');

    gladys.on('ready', function(){
        console.log(gladys.modules['xiaomi-gateway'].shared.SERVER_PORT);
        daemon();
    });

    return {
        install: install,
    };
};