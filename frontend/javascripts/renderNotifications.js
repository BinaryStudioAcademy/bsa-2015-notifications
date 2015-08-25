var notificationList = document.getElementById("notificationList");
var respArray=[{
    "title": "some Title 1",
    "time": "10.09.15",
    "text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "url": "#",
    "serviceType": "1"
}, {
    "title": "some Title 2",
    "time": "10.09.15",
    "text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "url": "#",
    "serviceType": "2"
}, {
    "title": "some Title 3",
    "time": "10.09.15",
    "text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "url": "#",
    "serviceType": "3"
}, {
    "title": "some Title 4",
    "time": "10.09.15",
    "text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "url": "#",
    "serviceType": "4"
}, {
    "title": "some Title 5",
    "time": "10.09.15",
    "text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "url": "#",
    "serviceType": "5"
}, {
    "title": "some Title 6",
    "time": "10.09.15",
    "text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "url": "#",
    "serviceType": "6"
}, ];


// var getAttention = function() {

//     var xhr = new XMLHttpRequest();

//     xhr.open('GET', 'api/notification', true);

//     xhr.send();

//     xhr.onreadystatechange = function() { // (3)
//         if (xhr.readyState != 4) return;

       

//         if (xhr.status != 200) {
//             alert(xhr.status + ': ' + xhr.statusText);
//         } else {
//           respArray = JSON.parse(xhr.responseText);
//             // respArray = xhr.responseText.map(function(obj) {
//             //     JSON.parse(obj);
//             // });
//             console.log(respArray);
//         }

//     };
// };

//  document.getElementById('notificationBtn').onclick = getAttention();
var renderNotification = function(renderItem) {
    var newNotification = document.createElement('li');
    newNotification.className = 'liNotification';
    newNotification.innerHTML = '<div class="notification"><img src="' + renderItem.imgUrl + '" class="imgApp"><div = class="textBlockNotification"><h5 class="titleNotification">' + renderItem.title + '</h5><span class="textNotification">' + renderItem.text + '</span></div></div>';
    notificationList.insertBefore(newNotification, notificationList.firstChild);
};

var addNotification = function(arrayNotification) {
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

addNotification(respArray);