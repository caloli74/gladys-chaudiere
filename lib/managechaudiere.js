const fs = require('fs');
const DEVICE_GATEWAY_INTENSITY = 185;
const DEVICE_GATEWAY_RED = 186;
const DEVICE_GATEWAY_BLUE = 187;
var last_state = -1;
var queries = require('./queries.js');

module.exports = function managechaudiere() {
    return new Promise(function (resolve, reject) {
        var state = ''
        var p1 = gladys.utils.sql(queries.get_current_target_temps);
        var p2 = gladys.deviceType.getByType({ type: 'temperature' });

        Promise.all([p1, p2])
            .then((result) => {
                var chauffage = 0;
                for (i = 0; i < result[0].length; i++) {
                    for (j = 0; j < result[1].length; j++) {
                        if (result[0][i].room.toLowerCase() === result[1][j].roomName.toLowerCase() && result[0][i].target_temp > result[1][j].lastValue) {
                            chauffage = 1;
                            state = state + result[0][i].room + ' a chauffer : T° cible = ' + result[0][i].target_temp + ', T° act = ' + result[1][j].lastValue + ' / ';
                        }
                    }
                }
                if (chauffage !== last_state) {
                    last_state = chauffage;
                    if (chauffage === 1) {
                        console.log(state);
                        gladys.modules['xiaomi-gateway'].setColor('red')
                    }
                    else {
                        console.log('Toutes les pieces sont chauffees');
                        gladys.modules['xiaomi-gateway'].setColor('blue')
                    }
                }
                return resolve('success');
            })
            .catch((err) => {
                return reject(new Error(err));
            });
    });
}