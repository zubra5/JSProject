var TemplateWork = function (saveResults_) {

    this.saveResults = saveResults_;
}
TemplateWork.prototype.createImages = function (src, shortSrc, thumbSrc) {
    //create image div 
    var cntDiv = $("#images").find(".wrapper-image").length;
    if (cntDiv == 0 || cntDiv % 3 == 0) {
        $("#images").append('<div class="row"></div>');
    }

    var div_ = $("#template").find(".wrapper-image").clone();
    div_.addClass("real-image");
    var a_ = div_.find("a");
    a_.text(shortSrc)
    a_.attr("href", src);
    a_.attr("download", src);
    div_.find("img").attr("src", thumbSrc).attr("date-href", src);
    div_.find(".glyphicon-remove").click(function (e) {
        $(this).parent().parent().remove();
    });
    div_.appendTo($("#images"));
}

TemplateWork.prototype.clearImages = function () {
    $("#images").html("");
}
TemplateWork.prototype.getArrayImages = function () {
    var arr = [];
    var cntImg = 0;
    var cntDivSave = $("#results_saved").find(".search-result-row").length;
    cntDivSave++;
    $(".real-image").find("img").each(function () {
        var arrArr = { "href": $(this).attr("date-href"), "src": $(this).attr("src") };
        arr.push(arrArr);
        cntImg++;
    });
    return arr;
}

TemplateWork.prototype.createDivSave = function (nameSearch, cntImg) {
    //create dom-element for retrieve saved results from LocalStorage	
    var divSave = $("#template-save").find(".search-result-row").clone();
    divSave.find("span").html(cntImg + " images");

    divSave.find("a").text(nameSearch);   
    divSave.find("a").bind("click",{TemplateWorkObj:this}, this.searchAgain);
    divSave.appendTo($("#results_saved"));
}

TemplateWork.prototype.getKeyWord = function () {
    return $("#txt-search-go").val();
}
TemplateWork.prototype.clearKeyWord = function () {
    $("#txt-search-go").val("");
}
TemplateWork.prototype.getNameSearch = function (n_) {
    return this.getKeyWord() + '#' + n_;
}
TemplateWork.prototype.searchAgain = function (event) {  
    $("#images").html("");   
    var arr =event.data.TemplateWorkObj.saveResults.retrieveResults($(this).text());
    $("#txt-search-go").val($(this).text().substring(0, $(this).text().indexOf('#')));
    $.each(arr, function (i, item) {      
        event.data.TemplateWorkObj.loadResults(i, item, event.data.TemplateWorkObj);
    });
}

TemplateWork.prototype.loadResults = function (i, item, TemplateWorkObj) {   
    TemplateWorkObj.createImages(item.href, item.href.substring(item.href.lastIndexOf("/") + 1), item.src);
}
