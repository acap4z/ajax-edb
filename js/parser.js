/*!
 * AJAX EDB v1.0 (https://albertov91.github.io/ajax-edb/)
 * Licensed under MIT (https://github.com/albertov91/ajax-edb/blob/master/LICENSE)
 */
 
function parse(rawData){

	arrayData = $.csv.toArrays(rawData);
	arrayData.shift(); // Removes the header.
	
	// localStorage.setItem("arrayData",JSON.stringify(arrayData));
	loadParsedData();
	
}


function loadParsedData(){
	var categories = ["remote","webapps","local","dos","shellcode"];
	
	$('#results').html("");
	document.title = "AJAX EDB";	
	fillTopTables(categories);
}

function fillTopTables(categories){
	for(var categoryID in categories) {
		var category = categories[categoryID];
		var categoryData = filterByCategory(category);	
		var topCategoryData = categoryData.slice(categoryData.length-7); //Only Top 7 are displayed.
		var htmlData = generateTable(topCategoryData.reverse()); // Top table is sorted by Date before processing.
		$('#'+category+'Content').html(htmlData);	
	}
}


function filterByCategory(category){
	var result = [];
	
	for(var row in arrayData) {
		var row_category = arrayData[row][6];
		if(row_category === category){
			result.push(arrayData[row]);
		}
	}
	
	return result;
}


// build HTML table data from an array (one or two dimensional)
function generateTable(data) {
  var html = '';
  var sorted_row = [];
  
  if(typeof(data[0]) === 'undefined') {
	return null;
  }

  if(data[0].constructor === Array) {
	html += '<table class="exploit_list bootstrap-wrapper">';
	// Table headers
	html += '<thead>\r\n';
	html += '<tr>\r\n';
	html += '<th class="text-center date">Date Added</td>\r\n';
	html += '<th class="text-center">D</td>\r\n';
	html += '<th class="description">Title</td>\r\n';
	html += '<th class="text-center">Platform</td>\r\n';
	html += '<th class="text-center">Author</td>\r\n';
	html += '</tr>\r\n';
	html += '</thead>\r\n';
	html += '<tbody>\r\n';
	for(var row in data) {
	  html += '<tr>\r\n';
	  sorted_row[0] = data[row][3]; //Date
	  sorted_row[1] = data[row][0]; //ID
	  sorted_row[2] = data[row][2]; //Title
	  sorted_row[3] = data[row][5]; //Platform
	  sorted_row[4] = data[row][4]; //Author
	  for(var item in sorted_row) {
		switch(parseInt(item)){
			case 0:
				html += '<td class="date">';
				html += sorted_row[item] + '</td>\r\n';
				break;
			case 1:
				html += '<td class="dlink"><a href="https://www.exploit-db.com/download/' + sorted_row[1] + '/">';
				html += '<img src="img/download_icon.png" width="16px" height="16px" style="vertical-align:middle" /></a></td>\r\n'
				break;				
			case 2:
				html += '<td class="description"><a href="https://www.exploit-db.com/exploits/' + sorted_row[1] + '/" target="_blank">';
				html += sorted_row[item] + '</a></td>\r\n';
				break;		
			case 3:
				html += '<td class="platform">';
				html += sorted_row[item] + '</td>\r\n';
				break;
			case 4:
				html += '<td class="author">';
				html += sorted_row[item] + '</td>\r\n';
				break;	
			default:
				console.log("Item not registered: "+item);
		}
	  }
	  sorted_row = [];
	  html += '</tr>\r\n';
	}
	html += '</tbody>\r\n';
	html += '</table>\r\n';
  }
  
  return html;
}