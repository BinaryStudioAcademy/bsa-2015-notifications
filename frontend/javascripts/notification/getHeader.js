var getHeader = function() {
var request = new XMLHttpRequest();
request.open('GET', window.notificationserver.host + '/header', true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200) {
            console.log(request.status + ': ' + request.statusText);
        } else {
           var headerHtml = request.responseText;
           var headerContainer = document.getElementById('header');
           headerContainer.innerHTML =headerHtml;
           headerFunction();
        }
    };
};
getHeader();