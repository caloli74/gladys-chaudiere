var queries = require('./queries.js');

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        var requests = queries.create_db.split(';');
        var promises = [];
        for (var i = 0; i < requests.length; i++) {
            if (requests[i].trim() !== '') {
                promises.push(gladys.utils.sql(requests[i] + ';'));
            }
        }

        Promise.all(promises)
            .then(() => {
                return resolve('success');
            })
            .catch((err) => {
                return reject(new Error(err));
            });
    });
}