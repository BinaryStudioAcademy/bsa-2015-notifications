// var userName = document.getElementById("userName");
// var avatar = document.getElementById('avatar');
// var userLink = document.getElementById('userLink');

// function getCookie(name) {
//   var matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }

// var serverUID = getCookie('serverUID');
// var userObject = {};

// var getUser = function() {
//     var request = new XMLHttpRequest();
//     request.open('GET', 'http://localhost:1337/api/users/?serverUserId='+ serverUID, true);
//     request.withCredentials = true;
//     request.send();
//     request.onreadystatechange = function() {
//         if (request.readyState != 4) return;
//         if (request.status != 200) {
//             alert(request.status + ': ' + request.statusText);
//         } else {
//             userObject = JSON.parse(request.responseText)[0];
//             avatar.setAttribute("src", 'http://localhost:1337'+ userObject.avatar.urlAva);
//             userName.innerHTML = userObject.name + ' ' + userObject.surname;
//             userLink.setAttribute('href', 'http://localhost:1337');
//         }
//     };
// };

// getUser();

