const schedule = require('node-schedule');
var loadparam = require('./loadparam.js');

module.exports = function daemon() {
    // reload des parametres toutes les 10 minutes
    var j1 = schedule.scheduleJob('*/10 * * * *', function(){
        loadparam();
      });
}
