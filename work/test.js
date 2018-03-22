var fs = require('fs');
var queries = require('./queries.js');

//gladys.utils.sql(queries.create_tables);
var param = JSON.parse(fs.readFileSync('param.json'));
param.schedule.forEach((sched) => {
        console.log(sched.day + ' ' + sched.special_day + ' ' + sched.start_time + ' ' + sched.stop_time);
});
