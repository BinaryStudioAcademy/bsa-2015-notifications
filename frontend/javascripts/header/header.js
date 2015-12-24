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
                window.server = {host: responseConf.server};
            }

            var src = window.notificationserver.host + '/javascripts/socket.io.js';

            try{
                require([src], callback);
            }catch(e){
                var body = document.getElementsByTagName('body')[0];
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = src;
                script.onload = function(){
                    callback();
                };
                body.appendChild(script);
            }         
        };
    };

    getConfig(function(ioInstance){
        if (!window.io){
            window.io = ioInstance;
        }
        
        document.getElementById('BSheaderLogo').addEventListener('click', function () {
            location.href = "http://team.binary-studio.com/";
        });

        document.getElementById('search').addEventListener('click', function (evt) {
            document.getElementById('search').classList.add('hdr-invisible');
        });

        // document.getElementById('sendnotification').addEventListener('click', function () {
        //     sendNotification();
        // });

        document.getElementsByTagName('body')[0].addEventListener('click', function (evt) {
           var elements = ['logOutBox', 'appsBlock', 'notificationBlock', 'search'];
           elements.forEach(function(item){
                var el = document.getElementById(item);
                if (!matchId(item, event.target) && el.className.indexOf('hdr-invisible') === -1 && !matchClass('hdr-buttons', evt.target)){
                    el.className += ' hdr-invisible';
                }
           });
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
            if (document.getElementById('notificationList').children.length === 0){
                
            }
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
            var node = document.getElementById('notificationList');
            while (node.hasChildNodes()) {
                node.removeChild(node.lastChild);
            }
            document.getElementById('readAllBtn').style.display = 'none';
            notificationCounter.classList.add('hdr-invisible');
            notificationCounter.innerHTML = 0;
            var notReadList = document.querySelectorAll('.hdr-notRead');
            for(var i = 0; i<notReadList.length; i++){
                notReadList[i].classList.remove('hdr-notRead');
            }
            var request = new XMLHttpRequest();
            request.open('PUT', window.notificationserver.host + '/api/usernotification/' + userObject.serverUserId, true);
            request.withCredentials = true;
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({isRead: true}));
            request.onreadystatechange = function() {
                if (request.readyState != 4) return;
                if (request.status != 200) {
                }else {
                    // console.log(request.responseText);
                }
            };
        });

        function matchId(id, el){
            if (el.id && el.id === id){
                return el;
            } else if (el.parentNode) {
                return matchId(id, el.parentNode);
            }
        }

        function matchClass(clas, el){
            if (el.className && el.className.indexOf(clas) !== -1 ){
                return el;
            } else if (el.parentNode) {
                return matchClass(clas, el.parentNode);
            }
        }

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
                    avatar.setAttribute("src", window.server.host + userObject.avatar.urlAva);
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
                        // console.log(respArray);
                        var result = respArray.map(function(notification){
                            if(!notification.isRead && Object.keys(notification).length !== 0){
                                counter++;
                                return notification;
                            }
                        });
                        document.getElementById('notificationCounter').innerHTML = counter;
                        if(counter){    
                            document.getElementById('notificationCounter').classList.remove('hdr-invisible');
                        }
                        addNotification(result);
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
            var logoDefault = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADmElEQVRoQ+2az08TQRTHv6/QgmGLeNXL4h+gJdF4tBw0Jh7Eg2fLyVAOwF9A+QuAQyGeqGcPwsHE6AE8Gk1E/wCZi56BLpGW0mdmlyXd7Y+d7e5U0nSP7cyb95n35s2bN0Pok4/6hAMDkFaWNDf/muDzhyA2UWcTRKanHbNAggSYBCpjO2KJDuPyiMgWsZWvnz8DOEeETBjFmLEPUAmJoR0xd02E6etv2zWIA3C2TES5KAq4fZm5hERypVug0CDmKk9g1FogRiEOAL8MJhRwaqyHdbtQIGbRygC8FdaFwgJfuNysmDf2Vfsqg5ib5Szq/I6IJlSFR2nHzIdI0HMxl95TkaMEYhatHBFvqQiMuw0zScuUguQGgkhLEGM3SJDO/5kwHWSZjiDOmqjv9sqd2k2G7WZITHdaM21B7OiUsnZ1L2xVS9oBoGpMt4tm7UGK5QIRllUH6kU7ZqyI+XTLsN8SRG52xLWDqMqlU8CDm8O2mC9/aihXo0l0IllyqtWm2Rpk47hEoJdRhr2VJrx/MYbxEUfKcQV4+vYEv8scRSwY/Ebkx5uyiSaQuKyxcD+FhXspj9Lr36pY/xrRLACYhif9VmkG2bAWCbwaadoAaAUBLYm8sdaoYzNIsfw9jkj1aHIYr5+Meubj1YdTfDqoRZ0jyAgm5tNTbUHicit3gNk7STyedBb7x4Matn6eRYZwBXDFuNEYij0W+Z+pSFhCf+riA7l6e0f73d67p3hBYgi7YWe22/b+MOwDKe8R8LBb4f5+v+YMz0+3N624RIOBzyKfzroCByAqUzuwiMIsBbhW9ByrUQe9FvHmXFrDr1YQX0qvdUPUC+I9y3tBYjqHuO6lFaRTiiIVMDfK+wTcVVhvgU10gTDwQ+TTnvKstjReUuoDUUnjY3QvbSAqByvHveIJw/Jw1fjFcjpUPeraIDFaJXAhhWrAR0zJjHLxwYbph3KQDSILdCOWzIZjiWChJr5FYxmpUDGyoQt0jlWsDFF9D6DrURWJ1p+PmBPZrkqm7sB9UcS+hOmHawWvZXi7d24mIxTNBF0ntDwhBvmxfc1AXNIdAOyFzZTTcvV2aRnnumFRT6VeLmpaQ9VY03oZ2mgx53HAWSFqsduVKasioGShZ9fTfve7eO0wYz8YCLnn2C4kHwzQ0Ha3AF2tkcA1ZLvdiYQy7Wcc8D3hADvPN0AC1bHtsO7TafzAy9Ag5a/K/wOQq2IJV49/pPvIQkkfXxQAAAAASUVORK5CYII=';
            var logo =  renderItem.serviceLogo ? renderItem.serviceLogo : logoDefault;
            newNotification.innerHTML = '<div class="hdr-notification"><img src="' + logo + '" class="hdr-imgApp" width='+50+' height='+50+'><div class="hdr-textBlockNotification"><h5 class="hdr-titleNotification"><a target="_blank" class="itemReadNotification" href=' + renderItem.url + ' nid=' + renderItem._id + '>' + renderItem.title + '</a></h5><span class="hdr-textNotification">' + renderItem.text + '</span><span class="hdr-dateNotificationInBox">' + renderItem.time + '</span></div></div>';
            notificationList.insertBefore(newNotification, notificationList.firstChild);

            

            newNotification.getElementsByTagName('a')[0].addEventListener('click', readNotification, false);



        };

        var readNotification = function(evt) {
                var attribute = this.getAttribute("nid");
                var request = new XMLHttpRequest();
                request.open('PUT', window.notificationserver.host + '/api/usernotification/' + userObject.serverUserId + '/nid/' + attribute, true);
                request.withCredentials = true;
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify({isRead: true}));
                var self = this;
                request.onreadystatechange = function() {
                    if (request.readyState != 4) return;
                    if (request.status != 200) {
                    }else {
                        var el = matchClass('hdr-notRead', self);
                        if (el){
                            el.classList.remove('hdr-notRead');   
                        }
                        el = document.getElementById('notificationCounter');
                        var number = Number(el.innerText) -1;
                        el.innerText = number;
                        if (!number || number === 0){
                            el.style.display = 'none';
                        }
                    }
                };
            };

        var addNotification = function(arrayNotification) {
            notificationList.innerHTML = '';
            arrayNotification.forEach(function(notiObj) {
                if (notiObj){
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
                }
            });
        };

        var servicesList = document.getElementById("appsList");
        appsArray = [];

        var getService = function() {
            var request = new XMLHttpRequest();
            request.open('GET', window.notificationserver.host + '/api/notificationService', true);
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
            var results = document.getElementById('search');
            results.className = results.className.replace('hdr-invisible', '');
            renderSearchResult(searchFiltrRsult);
            if (inputValue === '') {
                searchFiltrRsult = [];
                searchList.innerHTML = '';
            }

        });

        var sendNotification = function() {
                var request = new XMLHttpRequest();
                request.open('POST', window.notificationserver.host + '/api/notification/', true);
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                request.send(JSON.stringify({
                    title : "tets message",
                    text: "WOW!!",
                    url: "/api/images/bg.jpg",
                    sound: "false",
                    serviceType: "News",
                    users: ['55de32626b8bc0b909ba2620']
                }));
                request.onreadystatechange = function() {
                    if (request.readyState != 4) return;
                    if (request.status != 200) {
                    } else {
                        respArray = JSON.parse(request.responseText);
                        // console.log(respArray);
                    }
                };
            };

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
                    // console.log(usersArray);

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
            var path = window.userprofileserver.host + '/#/userdata/' + id;
            searchItem.setAttribute("href", path);
            searchItem.innerHTML = '<div class = "hdr-searchItem"><img style="height: 100%" src="'+ window.server.host + avatar +'"><span>' + name + ' ' + surname + '</span></div>';
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
                // console.log('welcome', data);
            });

            this.socket.on('title', function(data){
                // console.log('title', data);
            });

            this.socket.on('notification', function(data){
                // console.log('notification', data);
                document.getElementById('notificationCounter').style.display = 'block';
                document.getElementById('readAllBtn').style.display = 'inline-block';
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
            // console.log(sessionid);
            // console.log('user connected!');
        };

        SocketHandler.prototype.onDisconnect = function(){
            // console.log('user disconnected!');
        };

        SocketHandler.prototype.sendMessage = function(channel, data) {
            this.socket.emit(channel, data);
        };

        var socketHandler = new SocketHandler();
    });

}