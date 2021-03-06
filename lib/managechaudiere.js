const fs = require('fs');
var queries = require('./queries.js');

module.exports = function managechaudiere() {
    return new Promise(function (resolve, reject) {
        var state = ''
        var p1 = gladys.utils.sql(queries.get_current_target_temps);
        var p2 = gladys.deviceType.getByType({ type: 'temperature' });
        var p3 = gladys.device.get({ service: "sonoff" });
        var p4, p5;

        Promise.all([p1, p2, p3])
            .then((result) => {
                for (var i = 0; i < result[2].length; i++) {
                    if (result[2][i].name === 'Chaudiere') {
                        gladys.deviceType.getByDevice(result[2][i])
                            .then((sonoff) => {
                                var DEVICE_CHAUFFAGE = sonoff[0].id
                                var STATE_CHAUFFAGE = sonoff[0].lastValue
                                var chauffage = 0;
                                for (i = 0; i < result[0].length; i++) {
                                    for (j = 0; j < result[1].length; j++) {
                                        if (result[0][i].room.toLowerCase() === result[1][j].roomName.toLowerCase()) {
                                            if (result[0][i].target_temp > result[1][j].lastValue) {
                                                chauffage = 1;
                                            }
                                            state = state + result[0][i].room + ': ' + result[1][j].lastValue + ' / ' + result[0][i].target_temp + ' - ';
                                        }
                                    }
                                }
                                state = state.slice(0, -3) + (chauffage === 1 ? ' => Chauffage' : '');
                                if (chauffage !== STATE_CHAUFFAGE) {
                                    if (chauffage === 1) {
                                        p4 = gladys.modules['xiaomi'].setColor('red');
                                        p5 = gladys.deviceType.exec({ devicetype: DEVICE_CHAUFFAGE, value: 1 });
                                    }
                                    else {
                                        //state = 'Toutes les pieces sont chauffees';
                                        p4 = gladys.modules['xiaomi'].turnOff();
                                        p5 = gladys.deviceType.exec({ devicetype: DEVICE_CHAUFFAGE, value: 0 });
                                    }
                                }
                                Promise.all([p4, p5])
                                    .then((result) => {
                                        heure = (new Date).toLocaleTimeString();
                                        console.log(heure + ' : ' + state);
                                        return resolve('success');
                                    })
                                    .catch((err) => {
                                        return reject(new Error(err));
                                    });
                            })
                            .catch((err) => {
                                return reject(new Error(err));
                            });
                    }
                }
            })
            .catch((err) => {
                return reject(new Error(err));
            });
    });
}