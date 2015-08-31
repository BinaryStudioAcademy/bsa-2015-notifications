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
    // console.log(inputValue);
    filtrByInput(usersArray, inputValue);
    // console.log(searchFiltr);

    renderSearchResult(searchFiltrRsult);
    if (inputValue === '') {
        searchFiltrRsult = [];
        searchList.innerHTML = '';
    }

});

var getAllUsers = function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:1337/api/users', true);
    request.withCredentials = true;
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200) {
            alert(request.status + ': ' + request.statusText);
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
    var path = 'http://localhost:1337/api/users/'+ id;
    searchItem.setAttribute("href", path);
    searchItem.innerHTML = '<div class = "searchItem"><span>' + name + ' ' + surname + '</span></div>';
    searchList.appendChild(searchItem);
};
var getInputValue = function() {
    inputValue = inputField.value;
};