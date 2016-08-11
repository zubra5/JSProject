$(document).ready(function () {
function parseResults(data){
	
	$.each(data.items, function(i, item){
		if(item.pagemap.imageobject==null) {			
			return;
		}
		if(i==0|| i%3==0){
			console.log('123');			
			$("#images").append('<div class="row"></div>');
			
		}
		console.log(i);
		var div_=$("#template").find(".wrapper-image").clone();				
		var srcImg=item.pagemap.imageobject[0].image;
		div_.find("a").text(srcImg.substring(srcImg.lastIndexOf("/")+1)).attr("href", srcImg)
		div_.find("img").attr( "src", item.pagemap.cse_thumbnail[0].src)	
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
	console.log($(this).val());
        loadSearchResults($(this).val());
    }
});


});