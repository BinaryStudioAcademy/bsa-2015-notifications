var notificationServiceRepository = require('../../repositories/notificationService');
module.exports = function(app) {


    app.post('/api/notificationService', function(req, res) {
        notificationServiceRepository.add(req.body);
        res.send(req.body);
    });

    app.get('/api/notificationService', function(req, res) {
        notificationServiceRepository.getAll(function(err, data) {
            res.header('Access-Control-Allow-Origin', '*')
            res.err = err;
            res.send(data);
        });
    });

    app.get('/api/notificationService/:id', function(req, res) {
        notificationServiceRepository.getById(req.params.id, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.put('/api/notificationService/:id', function(req, res) {
       notificationServiceRepository.update(req.params.id, req.body, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.delete('/api/notificationService/:id', function(req, res) {
        notificationServiceRepository.delete(req.params.id, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

};