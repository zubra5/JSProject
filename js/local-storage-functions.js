LocalStorage={
 	keyAppication:"JSProject #",
	createImages:function(src, shortSrc, thumbSrc){
		//for work with template
	},
 	saveSearchResults:function(arr,nameSearch){			
		localStorage.setItem(LocalStorage.keyAppication+nameSearch,JSON.stringify({"data":arr}));
			
	},
	retrieveResults:function(nameSearch){
		var arr=JSON.parse(localStorage.getItem(LocalStorage.keyAppication+nameSearch))		
		return arr.data;
	},	
	createDivSave:function(nameSearch,cntImg){
	},
	loadOldResults:function(){
		//load saved results from LocalStorage when user updates page		
		for (var i=0, iC=localStorage.length; i<iC; ++i) { 
    			var storageKey = localStorage.key(i);		
			if(storageKey.indexOf(LocalStorage.keyAppication)>-1){
				var items=JSON.parse(localStorage.getItem(storageKey));			
				var nameSearch=storageKey.substring(LocalStorage.keyAppication.length);
				var cntImg=Object.keys(items.data).length;
				LocalStorage.createDivSave(nameSearch,cntImg);
			}    		
		}
	},	
	loadResults:function(i, item){	
		
		LocalStorage.createImages(item.href, item.href.substring(item.href.lastIndexOf("/")+1), item.src);
	}
}