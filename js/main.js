$(document).ready(function () {
	
	var searchObj=Object.create(null);
	searchObj.search=loadSearchResults;

	var retrieveObj=Object.create(null);
	retrieveObj.retrieveAll=loadOldResults;
	retrieveObj.loadSavedResult=LoadResultsFromStorage;

	var saveObj=Object.create(null);
	saveObj.saveResults=saveSearchResults;

	
	retrieveObj.retrieveAll();
	//catch key up event
	$("#txt-search-go").keyup(function (e) {
   		if (e.keyCode == 13) {       
			searchObj.search($(this).val());
    		}
	});

	//save all find and rest images into Local strorage
	$("#btnSaveResults").click(function(){		
		saveObj.saveResults(retrieveObj.loadSavedResult)
		}
	);
	

});