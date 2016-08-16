var GoogleSearchImages = function (templateObj) {
    this.tmplObj = templateObj;
}
GoogleSearchImages.prototype.api_key = 'AIzaSyDhqh_KqKvYa4RBtx91trAlq1dEsi0IjTo';
GoogleSearchImages.prototype.cx = '016207691750960459060:louir-l4vgk';
GoogleSearchImages.prototype.url = 'https://www.googleapis.com/customsearch/v1?searchtype=image&q=';

GoogleSearchImages.prototype.loadSearchResults = function (keyword) {
    //call google search api use searctype=images   
    var url = this.url;
    url = url + keyword;
    url = url + '&key=' + this.api_key;
    url = url + '&cx=' + this.cx;
    var GoogleSearch = this;
    $.ajax({
        dataType: "json",
        url: url,
        success: function (data) {
            GoogleSearch.parseResults(data, GoogleSearch.tmplObj);
        },
        error: this.errorResult
    });
}

GoogleSearchImages.prototype.parseResults = function (data, tmplObject) {
    //parse json data recieved from google api	   
    $.each(data.items, function (i, item) {
        if (item.pagemap.imageobject == null) {
            return;
        }
        var srcImg = item.pagemap.imageobject[0].image;
        tmplObject.createImages(srcImg, srcImg.substring(srcImg.lastIndexOf("/") + 1), item.pagemap.cse_thumbnail[0].src);
    });
}
GoogleSearchImages.prototype.errorResult = function () {
    console.log('Error load search results');
}

