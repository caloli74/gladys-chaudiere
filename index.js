module.exports = function (sails) {
    var install = require('./lib/install.js');

    return {
        install: install,
    };
};