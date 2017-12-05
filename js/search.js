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
	
	//Look for shellcodes if keyword "shellcode" is present, instead of exploits.
	var shellcode_search = false;
	for(i in keywords) {
		var keyword = keywords[i].toLowerCase();
		if(keyword.indexOf("shellcode") == 0){
			shellcode_search = true;
			console.log("Shellcode search activated. Exploits won't be shown");
			break;
		}
	}
	
	if (shellcode_search) results = arrayShellcodes.slice();
	else results = arrayData.slice();
	// Search using AND operator for each keyword found.
	for(i in keywords) {
		var keyword = keywords[i].toLowerCase();
		
		if(keyword.indexOf("platform:") == 0){
			//Label 'platform:'
			var platform = keyword.split(":")[1];
			results = $.grep(results, function(row) {
				return (row[COL_PLATFORM].toLowerCase().indexOf(platform) >= 0);
			});
			console.log("Filtered by Platform");
		}else if(keyword.indexOf("author:") == 0){
			//Label 'author:'
			var author = keyword.split(":")[1];
			results = $.grep(results, function(row) {
				return (row[COL_AUTHOR].toLowerCase().indexOf(author) >= 0);
			});	
			console.log("Filtered by Author");
		}else if(keyword.indexOf("category:") == 0){
			//Label 'author:'
			var author = keyword.split(":")[1];
			results = $.grep(results, function(row) {
				return (row[COL_CATEGORY].toLowerCase().indexOf(author) >= 0);
			});	
			console.log("Filtered by Category");
		}else if(keyword.indexOf("filetype:") == 0){
			//Label 'filetype:'
			var filetype = keyword.split(":")[1];
			results = $.grep(results, function(row) {
				return (row[COL_PATH].toLowerCase().endsWith("."+filetype));
			});	
			console.log("Filtered by Filetype");			
		}else{
			var invert = false;
			if(keyword.indexOf("-") == 0){
				invert = true; //Exclude keyword.
				keyword = keyword.substring(1);
				console.log("Negative keyword");
			}
			//Keywords
			results = $.grep(results, function(row) {
				return (row[COL_TITLE].toLowerCase().indexOf(keyword) >= 0);
			}, invert);
		}
	}
	
	// Results ordered by date since Exploit IDs and CSV order is not enough.
	sortByDate(results);
	
	var htmlDataTable = generateTable(results.reverse());
	// Fills the web content.
	var htmlData = '<h2 style="text-align: justify;"><a href="#"> Search Results for "' + $("<span>").text(search_query).html() + '" </a></h2>' + '<p style="text-align:justify;">' + results.length + ' results found'
	if(results.length > MAX_ROWS){
		htmlData += ' (only displaying ' + MAX_ROWS + ' results)</p>'  + htmlDataTable;
	}else{
		htmlData += '</p>'  + htmlDataTable;
	}
	
	$('#results').html(htmlData);
	$('#status').html("");
	$("#landing_panel").hide();
	/* Case when Browser history forward / backward commands are issued. */ 
	if (pre_query == null){
		history.pushState(search_query, null);	
	} 
	document.title = "AJAX EDB | Search: '"+search_query+"'";
}