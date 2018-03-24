const fs = require('fs');

module.exports = function loadparam() {
    return new Promise(function (resolve, reject) {
        console.log(__dirname);
        var param = JSON.parse(fs.readFileSync(__dirname + '/../param.json'));
        param.schedule.forEach((sched) => {
            console.log(sched.day + ' ' + sched.special_day + ' ' + sched.start_time + ' ' + sched.stop_time);
            /*
                            .then(() => {
                                return resolve('success');
                            })
                            .catch((err) => {
                                return reject(new Error(err));
                            });
                        
        */
        });
    });
}