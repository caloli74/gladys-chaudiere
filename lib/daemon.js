var schedule = require('node-schedule');

module.exports = function daemon() {
    var j = schedule.scheduleJob({second: 0}, function(){
        console.log('chaudiere daemon');
      });
}
