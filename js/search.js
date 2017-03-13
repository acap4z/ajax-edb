
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
		results = $.grep(results, function(row) {
			return (row[2].toLowerCase().indexOf(keywords[i].toLowerCase()) >= 0);
		});
	}
	
	var htmlData = generateTable(results.reverse());
	$('#panel').html(htmlData);
	if (pre_query == null){
		history.pushState(search_query, null);	
	} 
	document.title = "AJAX EDB | Search: '"+search_query+"'";
}