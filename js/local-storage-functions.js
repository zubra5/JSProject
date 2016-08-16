var LocalStorage = function (keyApp) {
    this.keyAppication = keyApp;
    this.template = null;
}
LocalStorage.prototype.saveSearchResults = function (arr, nameSearch) {
    localStorage.setItem(this.keyAppication + ' ' + nameSearch, JSON.stringify({ "data": arr }));

}
LocalStorage.prototype.retrieveResults = function (nameSearch) {
    var arr = JSON.parse(localStorage.getItem(this.keyAppication + ' ' + nameSearch))
    return arr.data;
}


LocalStorage.prototype.loadOldResults = function () {
    //load saved results from LocalStorage when user updates page		
    for (var i = 0, iC = localStorage.length; i < iC; ++i) {
        var storageKey = localStorage.key(i);
        if (storageKey.indexOf(this.keyAppication) > -1) {
            var items = JSON.parse(localStorage.getItem(storageKey));
            var nameSearch = storageKey.substring(this.keyAppication.length + 1);
            var cntImg = Object.keys(items.data).length;
            this.template.createDivSave(nameSearch, cntImg);
        }
    }
}


