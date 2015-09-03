var notificationRepository = require('../../repositories/notification');
var notificationService = require('../../services/notification');
var userNotificationRepository = require('../../repositories/userNotification');
var appContext = require('../../units/appContext');

module.exports = function(app) {


    app.post('/api/notification', function(req, res) {
        var usersArray = req.body.users;
        console.log(usersArray);
        delete req.body.users;
        var now = new Date();
        req.body.time = now;
        console.log(appContext.io.sockets.adapter.rooms); 
        notificationRepository.add(req.body, function(err, data) {
            for(var i = 0; i<usersArray.length; i++){
                var newObj = {};
                newObj.userId = usersArray[i];
                newObj.notificationId = data._id;
                newObj.isRead = false;
                console.log(newObj);
                userNotificationRepository.add(newObj);
                console.log('user_'+ usersArray[i]);
                appContext.io.to('user_'+ usersArray[i]).emit('notification', data);
                // appContext.io.sockets.emit('notification', data);
            }
            res.err = err;
            res.send(data);
        });
    });

    app.get('/api/notification', function(req, res) {
        notificationService.getAll(function(err, data) {
            res.header('Access-Control-Allow-Origin', '*');
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