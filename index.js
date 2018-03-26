module.exports = function (sails) {
    var install = require('./lib/install.js');
    var daemon = require('./lib/daemon.js');

    gladys.on('ready', function(){
        daemon();
    });

    return {
        install: install,
    };
};