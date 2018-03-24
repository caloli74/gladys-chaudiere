const schedule = require('node-schedule');
var loadparam = require('./loadparam.js');

module.exports = function daemon() {
    var j1 = schedule.scheduleJob({second: 0}, function(){
        loadparam();
      });
}
