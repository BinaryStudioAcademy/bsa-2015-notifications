document.getElementById('appsBtn').onclick = function() {
    document.getElementById("notificationBlock").classList.add('invisible');
    var block = document.getElementById("appsBlock");
    block.classList.toggle('invisible');
};

document.getElementById('notificationBtn').onclick = function() {
    document.getElementById("appsBlock").classList.add('invisible');
    var block = document.getElementById("notificationBlock");
    block.classList.toggle('invisible');
};

document.getElementById('myaccountAppBtn').onclick = function () {
    location.href = "/header";
};
document.getElementById('pdpAppBtn').onclick = function () {
    location.href = "/header";
};
document.getElementById('qaAppBtn').onclick = function () {
    location.href = "/header";
};
document.getElementById('codereviewAppBtn').onclick = function () {
    location.href = "/header";
};
document.getElementById('hrAppBtn').onclick = function () {
    location.href = "/header";
};
document.getElementById('feedbacksAppBtn').onclick = function () {
    location.href = "/header";
};
document.getElementById('accountingAppBtn').onclick = function () {
    location.href = "/header";
};
