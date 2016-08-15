var keyAppication="JSProject #";

function saveSearchResults(loadResults){		
	var arr=[];
	var cntImg=0;
	var cntDivSave=$("#results_saved").find(".search-result-row").length;
	cntDivSave++;
	$(".real-image").find("img").each(function(){
		var arrArr={"href":$(this).attr("date-href"), "src":$(this).attr("src")};
		arr.push(arrArr);
		cntImg++;
	});
	var nameSearch= $("#txt-search-go").val()+'#'+cntDivSave;
	localStorage.setItem(keyAppication+nameSearch,JSON.stringify({"data":arr}));

	createDivSave(nameSearch,cntImg,loadResults);

	$("#images").html("");
	$("#txt-search-go").val("");
	
}

//create dom-element for retrieve saved results from LocalStorage
function createDivSave(nameSearch,cntImg,loadResults){
	var divSave=$("#template-save").find(".search-result-row").clone();
	divSave.find("span").html(cntImg+" images");		
			
	divSave.find("a").text(nameSearch);
	divSave.find("a").click(function(){		
		$("#images").html("");
		var arr=JSON.parse(localStorage.getItem(keyAppication+$(this).text()));
		$("#txt-search-go").val( $(this).text().substring(0,$(this).text().indexOf('#')));
		$.each(arr.data, LoadResultsFromStorage);
	});
	divSave.appendTo($("#results_saved") );	
}

//load saved results from LocalStorage when user updates page
function loadOldResults(){
	for (var i=0, iC=localStorage.length; i<iC; ++i) { 
    		var storageKey = localStorage.key(i);		
		if(storageKey.indexOf(keyAppication)>-1){
			var items=JSON.parse(localStorage.getItem(storageKey));			
			var nameSearch=storageKey.substring(keyAppication.length);
			var cntImg=Object.keys(items.data).length;
			createDivSave(nameSearch,cntImg);
		}
    		
	}
}

function LoadResultsFromStorage(i, item){				
	if( i==0 || i%3==0){						
		$("#images").append('<div class="row"></div>');			
	}		
	var div_=$("#template").find(".wrapper-image").clone();	
	div_.addClass("real-image");			
	var srcImg=item.href;
	var a_=div_.find("a");
	a_.text(srcImg.substring(srcImg.lastIndexOf("/")+1));
	a_.attr("href", srcImg);
	a_.attr("download", srcImg);
			
	div_.find("img").attr( "src",item.src).attr("date-href",srcImg);	
	div_.find(".glyphicon-remove").click(function(e){
		$(this).parent().parent().remove();
	});	
	div_.appendTo($("#images") );	
}