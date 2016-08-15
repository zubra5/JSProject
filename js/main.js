$(document).ready(function () {
	//begin initialization
	var searchObj= GoogleSearchImages;
	var saveObj= LocalStorage;
	var templateObj=  TemplateWork;
	
	searchObj.createImages=templateObj.createImages;
	templateObj.loadResults=saveObj.loadResults;
	templateObj.retrieveResults=saveObj.retrieveResults;
	saveObj.createImages=templateObj.createImages;	
	saveObj.createDivSave=templateObj.createDivSave;
	//end initialization

	console.log('templateObj',templateObj);
	//load old results
	saveObj.loadOldResults();

	//catch key up event
	$("#txt-search-go").keyup(function (e) {
   		if (e.keyCode == 13) {     
			searchObj.loadSearchResults($(this).val()); 			
    		}
	});

	//save all find and rest images into Local strorage
	$("#btnSaveResults").click(function(){
		var arr=templateObj.getArrayImages();		
		saveObj.saveSearchResults(arr,templateObj.getKeyWord());
		var nameSearch= templateObj.getNameSearch(arr.length);
		templateObj.createDivSave(nameSearch,arr.length);
		templateObj.clearImages();
		templateObj.clearKeyWord();		
	});
	

});