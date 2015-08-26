var notificationList = document.getElementById("notificationList");
var respArray =[]; 

var getNotification = function() {
    
    var request = new XMLHttpRequest();

    request.open('GET', 'api/notification', true);

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

document.getElementById('notificationBtn').addEventListener('click',getNotification,false);
var renderNotification = function(renderItem) {
    var newNotification = document.createElement('li');
    newNotification.className = 'liNotification';
    newNotification.innerHTML = '<div class="notification"><img src="' + renderItem.imgUrl + '" class="imgApp"><div = class="textBlockNotification"><h5 class="titleNotification">' + renderItem.title + '</h5><span class="textNotification">' + renderItem.text + '</span></div></div>';
    notificationList.insertBefore(newNotification, notificationList.firstChild);
};

var addNotification = function(arrayNotification) {
    notificationList.innerHTML = '';
    arrayNotification.forEach(function(notiObj) {

        switch (notiObj.serviceType) {
            case "1":
                notiObj.imgUrl = "images/1.png";
                break;
            case "2":
                notiObj.imgUrl = "images/2.png";
                break;
            case "3":
                notiObj.imgUrl = "images/3.png";
                break;
            case "4":
                notiObj.imgUrl = "images/4.png";
                break;
            case "5":
                notiObj.imgUrl = "images/5.png";
                break;
            case "6":
                notiObj.imgUrl = "images/6.png";
                break;
        }
        renderNotification(notiObj);
    });
};

