var fs = require('fs');
var queries = require('./queries.js');

//gladys.utils.sql(queries.create_tables);
var param = JSON.parse(fs.readFileSync('param.json');
console.log(param.schedule[0].day);
