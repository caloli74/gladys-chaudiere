var fs = require('fs');

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        console.log('debut install')
        var promises = [];
        var script = fs.readFileSync('./create_db.sql', 'utf8');
        console.log(script);
        var requests = script.split(';');
        for (var i = 0; i < requests.length; i++){
            if (requests[i].trim()!==''){
                console.log('requete =' + requests[i]);
                promises.push(gladys.utils.sql(requests[i] + ';'));
            }
        }
        console.log(JSON.stringify(promises));
        Promise.all(promises)
            .then(() => {
                console.log('sucess')
                return resolve('success');
            })
            .catch((err) => {
                console.log('failure')
                return reject(new Error(err));
            });
    });
}
