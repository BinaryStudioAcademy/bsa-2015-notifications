var servicesList = document.getElementById("appsList");
var respArray = [];

var getService = function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'api/notificationservice', true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200) {
            alert(request.status + ': ' + request.statusText);
        } else {
            respArray = JSON.parse(request.responseText);
            //console.log(respArray);
            addService(respArray);
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