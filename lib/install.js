var queries = require('./queries.js');

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        gladys.utils.sql(queries.create_tables);
        return resolve('success');
    });
}