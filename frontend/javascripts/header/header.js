function headerFubction(){
    document.getElementById('appsBtn').addEventListener('click', function() {
        document.getElementById("notificationBlock").classList.add('invisible');
        var block = document.getElementById("appsBlock");
        block.classList.toggle('invisible');
    }, false);

    document.getElementById('notificationBtn').addEventListener('click', function() {
        document.getElementById("appsBlock").classList.add('invisible');
        var block = document.getElementById("notificationBlock");
        block.classList.toggle('invisible');
    });

    var notificationList = document.getElementById("notificationList");
    var respArray = [];

    var getNotification = function() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://team.binary-studio.com/app/api/notification', true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState != 4) return;
            if (request.status != 200) {
                alert(request.status + ': ' + request.statusText);
            } else {
                respArray = JSON.parse(request.responseText);
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

            renderNotification(notiObj);
        });
    };
    var servicesList = document.getElementById("appsBlock");
    var respArrayServise = [];

    var getService = function() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://team.binary-studio.com/app/api/notificationservice', true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState != 4) return;
            if (request.status != 200) {
                alert(request.status + ': ' + request.statusText);
            } else {
                respArrayServise = JSON.parse(request.responseText);
                addService(respArrayServise);
            }
        };
    };

    document.getElementById('appsBtn').addEventListener('click', getService, false);
    var renderServices = function(renderItem) {
        var newService = document.createElement('div');
        newService.className = 'serviceItem';
        newService.innerHTML = '<button class="appButton"><img src="' + renderItem.logo + '"></button><div class="appName"><span>' + renderItem.name + '</span></div>';
        servicesList.insertBefore(newService, servicesList.firstChild);
    };

    var addService = function(arrayServices) {
        servicesList.innerHTML = '';
        arrayServices.forEach(function(notiObj) {
            renderServices(notiObj);
        });
    };
}