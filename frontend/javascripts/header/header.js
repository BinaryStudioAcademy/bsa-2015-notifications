function headerFunction() {


    var getConfig = function(callback) {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://team.binary-studio.com/app/api/config', true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState != 4) return;
            if (request.status != 200) {

            } else {
                var responseConf = JSON.parse(request.responseText);

                window.loginserver = {host: responseConf.loginserver};
                window.notificationserver = {host: responseConf.notificationserver};
                window.userprofileserver = {host: responseConf.userprofileserver};
                window.socketserver = {host: responseConf.socketserver};
            }

            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = window.notificationserver.host + '/javascripts/socket.io.js';
            try{
                require([script.src], callback(io));
            }catch(e){
                script.onload = function(){
                    callback();
                };
                body.appendChild(script);
            }         
        };
    };

    getConfig(function(){

        

        document.getElementById('BSheaderLogo').addEventListener('click', function () {
            location.href = "http://team.binary-studio.com/";
        });
        // document.getElementById('searchBtn').addEventListener('click', function () {
        //     location.href = "http://team.binary-studio.com/profile/#/search";
        // });

        document.getElementById('appsBtn').addEventListener('click', function() {
            document.getElementById("notificationBlock").classList.add('hdr-invisible');
            document.getElementById("logOutBox").classList.add('hdr-invisible');
            var block = document.getElementById("appsBlock");
            block.classList.toggle('hdr-invisible');
        }, false);

        document.getElementById('notificationBtn').addEventListener('click', function() {
            document.getElementById("appsBlock").classList.add('hdr-invisible');
            document.getElementById("logOutBox").classList.add('hdr-invisible');
            var block = document.getElementById("notificationBlock");
            block.classList.toggle('hdr-invisible');
        });

         document.getElementById('userLink').addEventListener('click', function() {
            document.getElementById("appsBlock").classList.add('hdr-invisible');
            document.getElementById("notificationBlock").classList.add('hdr-invisible');
            var block = document.getElementById("logOutBox");
            block.classList.toggle('hdr-invisible');
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
            notificationCounter.classList.add('hdr-invisible');
            notificationCounter.innerHTML = 0;
            var notReadList = document.querySelectorAll('.hdr-notRead');
            for(var i = 0; i<notReadList.length; i++){
                notReadList[i].classList.remove('hdr-notRead');
            }
            var request = new XMLHttpRequest();
            request.open('PUT', window.notificationserver.host + '/api/usernotification/' + userObject.id, true);
            request.withCredentials = true;
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({isRead: true}));
            request.onreadystatechange = function() {
                if (request.readyState != 4) return;
                if (request.status != 200) {
                }else {
                    console.log(request.responseText);
                }
            };
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
        var counter = 0;
        var getNotification = function() {
                var request = new XMLHttpRequest();
                request.open('GET', window.notificationserver.host + '/api/usernotification/' + serverUID, true);
                request.send();
                request.onreadystatechange = function() {
                    if (request.readyState != 4) return;
                    if (request.status != 200) {
                    } else {
                        respArray = JSON.parse(request.responseText);
                        console.log(respArray);
                        respArray.forEach(function(notification){
                            if(!notification.isRead){
                                counter++;
                            }
                        });
                        document.getElementById('notificationCounter').innerHTML = counter;
                        if(counter){    
                            document.getElementById('notificationCounter').classList.remove('hdr-invisible');
                        }
                        addNotification(respArray);
                    }
                };
            };

        // document.getElementById('notificationBtn').addEventListener('click', getNotification, false);
        var renderNotification = function(renderItem) {
            var newNotification = document.createElement('li');
            newNotification.className = 'hdr-liNotification';
            if(!renderItem.isRead){
                newNotification.classList.add('hdr-notRead');
            }
            newNotification.innerHTML = '<div class="hdr-notification"><img src="' + renderItem.serviceLogo + '" class="hdr-imgApp" width='+50+' height='+50+'><div class="hdr-textBlockNotification"><h5 class="hdr-titleNotification">' + renderItem.title + '</h5><span class="hdr-textNotification">' + renderItem.text + '</span><span class="hdr-dateNotificationInBox">' + renderItem.time + '</span></div></div>';
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
            newService.className = 'hdr-serviceItem';
            newService.addEventListener('click', function () {
                location.href = renderItem.link;
            });
            newService.innerHTML = '<button class="hdr-appButton"><img src="' + renderItem.logo + '" width='+50+' height='+50+'></button><div class="hdr-appName"><span>' + renderItem.name + '</span></div>';
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
                renderItem(obj.name, obj.surname, obj.id, obj.avatar.urlAva);
            });
        };
        var renderItem = function(name, surname, id, avatar) {
            var searchItem = document.createElement('a');
            searchItem.className = 'hdr-noTextDecoration';
            var path = window.userprofileserver.host + '/api/users/' + id;
            searchItem.setAttribute("href", path);
            searchItem.innerHTML = '<div class = "hdr-searchItem"><img style="height: 100%" src="'+ window.userprofileserver.host + avatar +'"><span>' + name + ' ' + surname + '</span></div>';
            searchList.appendChild(searchItem);
        };
        var getInputValue = function() {
            inputValue = inputField.value;
        };

        var SocketHandler = function(){

            var self = this;

            this.socket = io(window.socketserver.host);
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
                document.getElementById('notificationCounter').classList.remove('hdr-invisible');

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
    });

}