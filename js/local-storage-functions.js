var LocalStorage = function (keyApp) {
    this.keyAppication = keyApp;
    this.template = null;
    this.cntSearch = 0;
}
LocalStorage.prototype.saveSearchResults = function (arr, keyWord) {
    this.cntSearch++;
    var title =  keyWord + '#' + this.cntSearch;
    var key = this.keyAppication + ' ' + title;
    localStorage.setItem(key, JSON.stringify({ "data": arr }));
    return title;
}
LocalStorage.prototype.retrieveResults = function (nameSearch) {
    var arr = JSON.parse(localStorage.getItem(this.keyAppication + ' ' + nameSearch))
    return arr.data;
}


LocalStorage.prototype.loadOldResults = function () {
    //load saved results from LocalStorage when user updates page	
    this.cntSearch = localStorage.length;
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


