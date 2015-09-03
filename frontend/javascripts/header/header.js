function headerFunction() {
    document.getElementById('BSheaderLogo').addEventListener('click', function () {
        location.href = "http://binary-studio.com/";
    });
    document.getElementById('searchBtn').addEventListener('click', function () {
        location.href = "http://team.binary-studio.com/profile/#/search";
    });

    document.getElementById('appsBtn').addEventListener('click', function() {
        document.getElementById("notificationBlock").classList.add('invisible');
        document.getElementById("logOutBox").classList.add('invisible');
        var block = document.getElementById("appsBlock");
        block.classList.toggle('invisible');
    }, false);

    document.getElementById('notificationBtn').addEventListener('click', function() {
        document.getElementById("appsBlock").classList.add('invisible');
        document.getElementById("logOutBox").classList.add('invisible');
        var block = document.getElementById("notificationBlock");
        block.classList.toggle('invisible');
    });

     document.getElementById('userLink').addEventListener('click', function() {
        document.getElementById("appsBlock").classList.add('invisible');
        document.getElementById("notificationBlock").classList.add('invisible');
        var block = document.getElementById("logOutBox");
        block.classList.toggle('invisible');
    });

    var userName = document.getElementById("userName");
    var avatar = document.getElementById('avatar');
    var userLink = document.getElementById('userprofileBtnInBox');

    document.getElementById('userProfileInBoxBtn').addEventListener('click', function () {
        location.href = window.userprofileserver.host;
    });
    document.getElementById('logOutButton').addEventListener('click', function () {
        location.href = window.loginserver.host + "/logout";
    });

    var notificationCounter = document.getElementById('notificationCounter');
    var readAllButton = document.getElementById('readAllBtn');
    readAllButton.addEventListener('click', function (event) {
        event.preventDefault();
        notificationCounter.classList.add('invisible');
        respArray = [];

    });

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
        request.open('GET', window.userprofileserver.host + '/api/users/?serverUserId=' + serverUID, true);
        request.withCredentials = true;
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState != 4) return;
            if (request.status != 200) {
            } else {
                userObject = JSON.parse(request.responseText)[0];
                avatar.setAttribute("src", window.userprofileserver.host + userObject.avatar.urlAva);
                userName.innerHTML = userObject.name + ' ' + userObject.surname;
                //userLink.setAttribute('href', 'http://team.binary-studio.com/profile');
                getNotification();
            }
        };
    };

    getUser();

    //=======================================


    var notificationList = document.getElementById("notificationList");
    var respArray = [];

    var getNotification = function() {
        var request = new XMLHttpRequest();
        request.open('GET', window.notificationserver.host + '/api/usernotification/' + userObject.id, true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState != 4) return;
            if (request.status != 200) {
            } else {
                respArray = JSON.parse(request.responseText);
                console.log(respArray);
                document.getElementById('notificationCounter').innerHTML = respArray.length;
                addNotification(respArray);
            }
        };
    };

    // document.getElementById('notificationBtn').addEventListener('click', getNotification, false);
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

    var servicesList = document.getElementById("appsList");
    appsArray = [];

    var getService = function() {
        var request = new XMLHttpRequest();
        request.open('GET', window.notificationserver.host + '/api/notificationservice', true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState != 4) return;
            if (request.status != 200) {
            } else {
                appsArray = JSON.parse(request.responseText);
                addService(appsArray);
            }
        };
    };
    getService();

    // document.getElementById('appsBtn').addEventListener('click', getService, false);
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
    var inputField = document.getElementById('searchBar');
    var searchList = document.getElementById('search');
    var inputValue = "";
    var usersArray = [];
    var searchFiltrRsult = [];

    inputField.addEventListener('focus', function() {
        {
            getAllUsers();

            console.log(getAllUsers);
        }
    });
    inputField.addEventListener('keyup', function(e) {

        getInputValue();
        filtrByInput(usersArray, inputValue);
        renderSearchResult(searchFiltrRsult);
        if (inputValue === '') {
            searchFiltrRsult = [];
            searchList.innerHTML = '';
        }

    });

    var getAllUsers = function() {
        var request = new XMLHttpRequest();
        request.open('GET', window.userprofileserver.host + '/api/users', true);
        request.withCredentials = true;
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState != 4) return;
            if (request.status != 200) {
            } else {
                usersArray = JSON.parse(request.responseText);
                console.log(usersArray);

            }
        };
    };

    var filtrByInput = function(array, inputValue) {
        searchFiltrRsult = [];
        var reg = new RegExp(inputValue, 'i');
        array.forEach(function(user) {
            var tmpNS = user.name + ' ' + user.surname;

            var tmpSN = user.surname + ' ' + user.name;

            if (user.name.search(reg) !== -1 || user.surname.search(reg) !== -1 || tmpSN.search(reg) !== -1 || tmpNS.search(reg) !== -1) {
                searchFiltrRsult.push(user);
            }
        });

    };
    var renderSearchResult = function(resultArrey) {
        searchList.innerHTML = '';
        resultArrey.forEach(function(obj) {
            renderItem(obj.name, obj.surname, obj.id);
        });
    };
    var renderItem = function(name, surname, id) {
        var searchItem = document.createElement('a');
        searchItem.className = 'noTextDecoration';
        var path = window.userprofileserver.host + '/api/users/' + id;
        searchItem.setAttribute("href", path);
        searchItem.innerHTML = '<div class = "searchItem"><span>' + name + ' ' + surname + '</span></div>';
        searchList.appendChild(searchItem);
    };
    var getInputValue = function() {
        inputValue = inputField.value;
    };

    var SocketHandler = function(){

        var self = this;

        this.socket = io('http://localhost:4033');
        this.socket.on('connect', function(){
            self.onConnect();
        });
        this.socket.on('disconnect', function(){
            self.onDisconnect();
        });

        this.socket.on('welcome', function(data){
            console.log('welcome', data);
        });

        this.socket.on('title', function(data){
            console.log('title', data);
        });

        this.socket.on('notification', function(data){
            console.log('notification', data);

            var d = new Date(data.time);
            Number.prototype.padLeft = function(base, chr) {
                var len = (String(base || 10).length - String(this).length) + 1;
                return len > 0 ? new Array(len).join(chr || '0') + this : this;
            };
            data.time = [(d.getMonth() + 1).padLeft(),
                d.getDate().padLeft(),
                d.getFullYear()
            ].join('/') + ' ' +
                [d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()
            ].join(':');

            document.getElementById('notificationCounter').innerHTML = parseInt(document.getElementById('notificationCounter').innerHTML) + 1;

            renderNotification(data);

        });

    };

    SocketHandler.prototype.onConnect = function(){
        var sessionid = this.socket.io.engine.id;
        console.log(sessionid);
        console.log('user connected!');
    };

    SocketHandler.prototype.onDisconnect = function(){
        console.log('user disconnected!');
    };

    SocketHandler.prototype.sendMessage = function(channel, data) {
        this.socket.emit(channel, data);
    };

    var socketHandler = new SocketHandler();

}