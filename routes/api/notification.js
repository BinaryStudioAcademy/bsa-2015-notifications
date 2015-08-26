var notificationRepository = require('../../repositories/notification');
module.exports = function(app) {


    app.post('/api/notification', function(req, res) {
        var now = new Date();
        req.body.time = now;
        notificationRepository.add(req.body);
        res.send(req.body);
    });

    app.get('/api/notification', function(req, res) {
        notificationRepository.getAll(function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.get('/api/notification/:id', function(req, res) {
        notificationRepository.getById(req.params.id, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.put('/api/notification/:id', function(req, res) {
       notificationRepository.update(req.params.id, req.body, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.delete('/api/notification/:id', function(req, res) {
        notificationRepository.delete(req.params.id, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

};