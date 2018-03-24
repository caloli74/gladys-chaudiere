const fs = require('fs');
var queries = require('./queries.js');

module.exports = function managechaudiere() {
    return new Promise(function (resolve, reject) {
        var p1 = gladys.utils.sql(queries.get_current_target_temps);
        var p2 = gladys.deviceType.getByType({ type: 'temperature' });

        Promise.all([p1, p2])
            .then((result) => {
                for (i = 0; i < result[0].length; i++) {
                    for (j = 0; j < result[0].length; j++) {
                        if (result[0].room[i] === result[1].roomName[j]) {
                            console.log(result[0].room[i] + ': Temperature cible = ' + result[0].target_temp[i] + ', temperature actuelle = ' + result[1].lastValue[j]);
                        }
                    }
                }
                return resolve('success');
            })
            .catch((err) => {
                return reject(new Error(err));
            });
    });
}