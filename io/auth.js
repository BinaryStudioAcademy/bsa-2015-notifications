var Cookies = require('cookies');
var xtend = require('xtend');
var jsonwebtoken = require('jsonwebtoken');
var config = require('../config/');

module.exports = function (options) {
	var defaults = {
		key: 'x-access-token',
		secret: null,
		success: function (data, accept){
			if (data.socketio_version_1) {
				accept();
			} else {
				accept(null, true);
			}
		},
		fail: function (data, message, critical, accept) {
			if (data.socketio_version_1) {
				accept(new Error(message));
			} else {
				accept(null, false);
			}
		}
	};

	var auth = xtend(defaults, options);

	auth.userProperty = 'user';

	return function(data, accept){

		// socket.io v1.0 now provides socket handshake data via `socket.request`
		if (data.request) {
			data = data.request;
			data.socketio_version_1 = true;
		}

		data.cookie = parseCookie(auth, data.headers.cookie || '');
		data.token = data.cookie;
		verifyToken(data.token, function(err, decoded){
			accept(err, decoded);
		});

		// if(data.xdomain && !data.sessionID){
		// 	return auth.fail(data, 'Can not read cookies from CORS-Requests. See CORS-Workaround in the readme.', false, accept);
		// }

	};
}

function verifyToken(token, callback){

	if (token) {
		jsonwebtoken.verify(token, config.jwt.secret, function(err, decoded) {
			if (err) {
				return callback('Failed to authenticate user');
			} else {
				return callback(null, decoded);
			}
		});
	} else {
		return callback('no token');
	}

}

function parseCookie(auth, cookieHeader) {
	var req = {
		headers:{
			cookie: cookieHeader
		}
	};
	var result;

	var cookies = new Cookies(req);
	result = cookies.get(auth.key);
	return result;
}
