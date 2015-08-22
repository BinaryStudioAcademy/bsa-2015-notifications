var notificationRepository = require('../../repositories/notification');
module.exports = function(app) {


    app.post('/api/notification', function(req, res) {
        notificationRepository.add(req.body);
        res.send(req.body);
    });

    app.get('/api/notification', function(req, res) {
        notificationRepository.getAll(function(err, data) {
            res.err = err;
            res.send(data);


        });
    });

    app.get('/api/notification/app/ :iDapp', function(req, res) {

    });



};