TemplateWork={
	createImages:function (src, shortSrc, thumbSrc){
	//create image div 
		var cntDiv=$("#images").find(".wrapper-image").length;		
		if( cntDiv==0 || cntDiv%3==0){						
			$("#images").append('<div class="row"></div>');			
		}
		
		var div_=$("#template").find(".wrapper-image").clone();		
		div_.addClass("real-image");				
		var a_=div_.find("a");
		a_.text(shortSrc)
		a_.attr("href", src);
		a_.attr("download", src);
		div_.find("img").attr( "src",  thumbSrc).attr("date-href",src);	
		div_.find(".glyphicon-remove").click(function(e){
			$(this).parent().parent().remove();
		});	
		div_.appendTo($("#images") );	
	},
	clearImages:function(){
		$("#images").html("");
	},
	getArrayImages:function(){
		var arr=[];
		var cntImg=0;
		var cntDivSave=$("#results_saved").find(".search-result-row").length;	
		cntDivSave++;
		$(".real-image").find("img").each(function(){
			var arrArr={"href":$(this).attr("date-href"), "src":$(this).attr("src")};
			arr.push(arrArr);
			cntImg++;
		});
		return arr;
	},
	loadResults:function(){
	},
	retrieveResults:function(txt){
	},
	createDivSave:function(nameSearch,cntImg){
		//create dom-element for retrieve saved results from LocalStorage	
		var divSave=$("#template-save").find(".search-result-row").clone();
		divSave.find("span").html(cntImg+" images");	
			
		divSave.find("a").text(nameSearch);
		divSave.find("a").bind("click",TemplateWork.searchAgain);
		divSave.appendTo($("#results_saved") );	
	},
	getKeyWord:function(){
		return $("#txt-search-go").val();
	},
	clearKeyWord:function(){
		$("#txt-search-go").val("");
	},
	getNameSearch:function(n_){
		return TemplateWork.getKeyWord()+'#'+n_;
	},
	searchAgain:function(){		
			$("#images").html("");
			var arr=TemplateWork.retrieveResults($(this).text());
			$("#txt-search-go").val( $(this).text().substring(0,$(this).text().indexOf('#')));
			$.each(arr, TemplateWork.loadResults);
	}
}