var settingsNotificationRepository = require('../../repositories/settingsNotification');
module.exports = function(app) {


    app.post('/api/settingsnotification', function(req, res) {
        settingsNotificationRepository.add(req.body, function(err, data){
            res.err = err;
            res.send(data);
        });
    });

    app.get('/api/settingsnotification', function(req, res) {
        settingsNotificationRepository.getAll(function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.get('/api/settingsnotification/:id', function(req, res) {
        settingsNotificationRepository.findByUserId(req.params.id, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.put('/api/settingsnotification/:id', function(req, res) {
       settingsNotificationRepository.update(req.params.id, req.body, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

    app.delete('/api/settingsnotification/:id', function(req, res) {
        settingsNotificationRepository.delete(req.params.id, function(err, data) {
            res.err = err;
            res.send(data);
        });
    });

};