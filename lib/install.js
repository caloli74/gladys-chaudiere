var queries = require('./queries.js');

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        var requests = queries.create_db.split(';');
        for (var i = 0; i < requests.length; i++) {
            if (requests[i].trim() === '') {
                requests.splice(i, 1);
                i--;
            }
        }
        gladys.utils.sql(requests);
        /*
        var promises = [];
        for (var i = 0; i < requests.length; i++) {
            if (requests[i].trim() !== '') {
                console.log(i + ' : ' + requests[i]);
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
*/
    });
}