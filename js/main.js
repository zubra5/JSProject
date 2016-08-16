$(document).ready(function () {
	//begin initialization
	
	var saveObj= new LocalStorage('JSProject');
	var templateObj = new TemplateWork(saveObj);
	var searchObj = new GoogleSearchImages(templateObj);    
	saveObj.template = templateObj;

	//end initialization


	//load old results
	saveObj.loadOldResults();

	//catch key up event
	$("#txt-search-go").keyup(function (e) {
	    if (e.keyCode == 13) {
	        templateObj.clearImages()
			searchObj.loadSearchResults($(this).val()); 			
    	}
	});

	//save all find and rest images into Local strorage
	$("#btnSaveResults").click(function(){
	    var arr = templateObj.getArrayImages();       
	    var title=saveObj.saveSearchResults(arr, templateObj.getKeyWord());
	    templateObj.createDivSave(title, arr.length);
		templateObj.clearImages();
		templateObj.clearKeyWord();		
	});
	

});