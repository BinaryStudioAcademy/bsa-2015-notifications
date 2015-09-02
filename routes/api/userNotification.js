var userNotificationRepository = require('../../repositories/userNotification');
var userNotificationService = require('../../services/usernotification');
module.exports = function(app) {


    app.post('/api/usernotification', function(req, res) {
        console.log('KuKu');
        userNotificationRepository.add(req.body);
        res.send(req.body);
    });

    app.get('/api/usernotification', function(req, res) {
        userNotificationRepository.getAll(function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.get('/api/usernotification/:id', function(req, res) {
        userNotificationService.getByUserId(req.params.id, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.put('/api/usernotification/:id', function(req, res) {
       userNotificationRepository.update(req.params.id, req.body, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.delete('/api/usernotification/:id', function(req, res) {
        userNotificationRepository.delete(req.params.id, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

};