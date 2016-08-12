$(document).ready(function () {
var keyAppication="JSProject #";
uploadOldResults();
function parseResults(data){
	
	$.each(data.items, function(i, item){
		if(item.pagemap.imageobject==null) {			
			return;
		}		
		var cntDiv=$("#images").find(".wrapper-image").length;		
		if( cntDiv==0 || cntDiv%3==0){						
			$("#images").append('<div class="row"></div>');			
		}
		
		var div_=$("#template").find(".wrapper-image").clone();		
		div_.addClass("real-image");		
		var srcImg=item.pagemap.imageobject[0].image;
		var a_=div_.find("a");
		a_.text(srcImg.substring(srcImg.lastIndexOf("/")+1))
		a_.attr("href", srcImg);
		a_.attr("download", srcImg);
		div_.find("img").attr( "src", item.pagemap.cse_thumbnail[0].src).attr("date-href",srcImg);	
		div_.find(".glyphicon-remove").click(function(e){
			$(this).parent().parent().remove();
		});	
		div_.appendTo($("#images") );	
	});
}

function errorResult(){
	console.log('Error load search results');
}

function loadSearchResults(keyword){
	var api_key='AIzaSyDhqh_KqKvYa4RBtx91trAlq1dEsi0IjTo';
	var cx='016207691750960459060:louir-l4vgk';
	var url='https://www.googleapis.com/customsearch/v1?searchtype=image&q=';
	url=url+keyword;
	url=url+'&key='+api_key;
	url=url+'&cx='+cx;
	$("#images").html("");
	$.ajax({
  		dataType: "json",
  		url: url,  		
  		success: parseResults,
		error: errorResult
	});
}

$("#txt-search-go").keyup(function (e) {
    if (e.keyCode == 13) {	
        loadSearchResults($(this).val());
    }
});

$("#btnSaveResults").click(function(){		
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

	createDivSave(nameSearch,cntImg);

	$("#images").html("");
	$("#txt-search-go").val("");
	
});

function createDivSave(nameSearch,cntImg){
	var divSave=$("#template-save").find(".search-result-row").clone();
	divSave.find("span").html(cntImg+" images");		
			
	divSave.find("a").text(nameSearch);
	divSave.find("a").click(function(){		
		$("#images").html("");
		var arr=JSON.parse(localStorage.getItem(keyAppication+$(this).text()));
		$("#txt-search-go").val( $(this).text().substring(0,$(this).text().indexOf('#')));
		$.each(arr.data, function(i, item){				
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
		});
	});
	divSave.appendTo($("#results_saved") );	
}

function uploadOldResults(){
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

});