/*!
 * AJAX EDB v1.0 (https://albertov91.github.io/ajax-edb/)
 * Licensed under MIT (https://github.com/albertov91/ajax-edb/blob/master/LICENSE)
 */
 
function bind_search(){
	$("#searchTxt").keydown(function(event){
		if (event.which === 13) {
			search();
		}
	});
	$("#searchBtn").click(function(){
		search();
	});
}


function search(pre_query){
	var results;
	var search_query;
	if(pre_query == null){
		search_query = $("#searchTxt").val();
	}else{
		// For history queries. (") char is trimmed at the beginning and the end of the string.
		search_query = pre_query.replace(/"/g, "");
	}
	var keywords = search_query.split(" ");
	console.log("Trying to search: "+search_query);
	
	results = arrayData.slice();
	// Search using AND operator for each keyword found.
	for(i in keywords) {
		var keyword = keywords[i].toLowerCase();
		
		if(keyword.indexOf("platform:") == 0){
			//Label 'platform:'
			var platform = keyword.split(":")[1];
			results = $.grep(results, function(row) {
				return (row[5].toLowerCase().indexOf(platform) >= 0);
			});
		}else if(keyword.indexOf("author:") == 0){
			//Label 'author:'
			var author = keyword.split(":")[1];
			results = $.grep(results, function(row) {
				return (row[4].toLowerCase().indexOf(author) >= 0);
			});	
		}else if(keyword.indexOf("filetype:") == 0){
			//Label 'filetype:'
			var filetype = keyword.split(":")[1];
			results = $.grep(results, function(row) {
				return (row[1].toLowerCase().endsWith("."+filetype));
			});			
		}else{
			var invert = false;
			if(keyword.indexOf("-") == 0){
				invert = true; //Exclude keyword.
				keyword = keyword.substring(1);
			}
			//Keywords
			results = $.grep(results, function(row) {
				return (row[2].toLowerCase().indexOf(keyword) >= 0);
			}, invert);
		}
	}
	
	var htmlData = generateTable(results.reverse());
	// Fills the web content.
	htmlData = '<h2 style="text-align: justify;"><a href="#"> Search Results for "' + $("<span>").text(search_query).html() + '" </a></h2>' + '<p style="text-align:justify;">' + results.length + ' results found</p>'  + htmlData;
	$('#results').html(htmlData);
	$('#status').html("");
	if (pre_query == null){
		history.pushState(search_query, null);	
	} 
	document.title = "AJAX EDB | Search: '"+search_query+"'";
}