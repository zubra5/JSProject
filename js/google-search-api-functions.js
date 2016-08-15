GoogleSearchImages={
	createImages:function(src, shortSrc, thumbSrc){
		
	},
	loadSearchResults:function(keyword){
	//call google search api use searctype=images
		var api_key='AIzaSyDhqh_KqKvYa4RBtx91trAlq1dEsi0IjTo';
		var cx='016207691750960459060:louir-l4vgk';
		var url='https://www.googleapis.com/customsearch/v1?searchtype=image&q=';
		url=url+keyword;
		url=url+'&key='+api_key;
		url=url+'&cx='+cx;
		$.ajax({
  			dataType: "json",
  			url: url,  		
  			success: this.parseResults,
			error: this.errorResult
		});
	},
	parseResults:function (data){
	//parse json data recieved from google api	
		$.each(data.items, function(i, item){
			if(item.pagemap.imageobject==null) {			
				return;
			}
			var srcImg=item.pagemap.imageobject[0].image;
			GoogleSearchImages.createImages(srcImg, srcImg.substring(srcImg.lastIndexOf("/")+1), item.pagemap.cse_thumbnail[0].src);				
		});
	},
	errorResult:function (){
		console.log('Error load search results');
	}
}
