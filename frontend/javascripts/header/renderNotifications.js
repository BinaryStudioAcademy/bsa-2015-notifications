var userName = document.getElementById("userName");
var avatar = document.getElementById('avatar');
var userLink = document.getElementById('userLink');

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

var serverUID = getCookie('serverUID');
var userObject = {};

var getUser = function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:1337/api/users/?serverUserId='+ serverUID, true);
    request.withCredentials = true;
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200) {
            alert(request.status + ': ' + request.statusText);
        } else {
            userObject = JSON.parse(request.responseText)[0];
            avatar.setAttribute("src", 'http://localhost:1337'+ userObject.avatar.urlAva);
            userName.innerHTML = userObject.name + ' ' + userObject.surname;
            userLink.setAttribute('href', 'http://localhost:1337');
        }
    };
};

getUser();

//=======================================


var notificationList = document.getElementById("notificationList");
var respArray = [];

var getNotification = function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'api/usernotification/' + userObject.id, true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200) {
            alert(request.status + ': ' + request.statusText);
        } else {
            respArray = JSON.parse(request.responseText);
            console.log(respArray);
            addNotification(respArray);
        }
    };
};

document.getElementById('notificationBtn').addEventListener('click', getNotification, false);
var renderNotification = function(renderItem) {
    var newNotification = document.createElement('li');
    newNotification.className = 'liNotification';
    newNotification.innerHTML = '<div class="notification"><img src="' + renderItem.serviceLogo + '" class="imgApp"><div = class="textBlockNotification"><h5 class="titleNotification">' + renderItem.title + '</h5><span class="textNotification">' + renderItem.text + '</span><span>' + renderItem.time + '</span></div></div>';
    notificationList.insertBefore(newNotification, notificationList.firstChild);
};

var addNotification = function(arrayNotification) {
    notificationList.innerHTML = '';
    arrayNotification.forEach(function(notiObj) {
        var d = new Date(notiObj.time);
        Number.prototype.padLeft = function(base, chr) {
            var len = (String(base || 10).length - String(this).length) + 1;
            return len > 0 ? new Array(len).join(chr || '0') + this : this;
        };
        notiObj.time = [(d.getMonth() + 1).padLeft(),
            d.getDate().padLeft(),
            d.getFullYear()
        ].join('/') + ' ' +
            [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()
        ].join(':');
        // notiObj.time = [d.getMonth()+1,
        //        d.getDate(),
        //        d.getFullYear()].join('/')+' '+
        //       [d.getHours(),
        //        d.getMinutes(),
        //        d.getSeconds()].join(':');

        renderNotification(notiObj);
    });
};