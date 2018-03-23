var fs = require('fs');

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        //var promises = [];
        var script = fs.readFile('/home/pi/gladys/api/hooks/chaudiere/lib/create_db.sql', (err, data) => {
            if (err) throw err;
            console.log(data);
          });

        var requests = script.split(';');
        /*
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
        */
        console.log(script);
        return resolve('success');
    });
}
