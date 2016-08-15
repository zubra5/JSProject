

//call google search api use searctype=images
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
//parse json data recieved from google api
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
