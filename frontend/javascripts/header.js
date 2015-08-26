document.getElementById('appsBtn').addEventListener('click',function() {
    document.getElementById("notificationBlock").classList.add('invisible');
    var block = document.getElementById("appsBlock");
    block.classList.toggle('invisible');
}, false);

document.getElementById('notificationBtn').addEventListener('click', function() {
    document.getElementById("appsBlock").classList.add('invisible');
    var block = document.getElementById("notificationBlock");
    block.classList.toggle('invisible');
});

document.getElementById('myaccountAppBtn').addEventListener('click', function () {
    location.href = "/header";
});
document.getElementById('pdpAppBtn').addEventListener('click', function () {
    location.href = "/header";
});
document.getElementById('qaAppBtn').addEventListener('click', function () {
    location.href = "/header";
});
document.getElementById('codereviewAppBtn').addEventListener('click', function () {
    location.href = "/header";
});
document.getElementById('hrAppBtn').addEventListener('click', function () {
    location.href = "/header";
});
document.getElementById('feedbacksAppBtn').addEventListener('click', function () {
    location.href = "/header";
});
document.getElementById('accountingAppBtn').addEventListener('click', function () {
    location.href = "/header";
});
