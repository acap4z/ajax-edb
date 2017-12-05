/*!
 * AJAX EDB v1.0 (https://albertov91.github.io/ajax-edb/)
 * Licensed under MIT (https://github.com/albertov91/ajax-edb/blob/master/LICENSE)
 */
 
var MAX_ROWS = 1000; //Maximum number of rows displayed in the results table.

var COL_ID = 0;
var COL_PATH = 1;
var COL_TITLE = 2;
var COL_DATE = 3;
var COL_AUTHOR = 4;
var COL_CATEGORY = 5;
var COL_PLATFORM = 6;

 
function parseData(rawData, isShellcode){

	if(!isShellcode){
		arrayData = $.csv.toArrays(rawData);
		arrayData.shift(); // Removes the header.
		
		// localStorage.setItem("arrayData",JSON.stringify(arrayData));
		loadParsedData(arrayData, isShellcode);
	}else{
		arrayShellcodes = $.csv.toArrays(rawData);
		arrayShellcodes.shift(); // Removes the header.
		
		// localStorage.setItem("arrayData",JSON.stringify(arrayData));
		loadParsedData(arrayShellcodes, isShellcode);		
	}
}

function loadParsedData(data, isShellcode){
	var categories = ["remote","webapps","local","dos"];
	if (isShellcode) categories = ["shellcode"];
	
	$('#results').html("");
	document.title = "AJAX EDB";	
	fillTopTables(data, categories);
}


function fillTopTables(data, categories){
	for(var categoryID in categories) {
		var category = categories[categoryID];
		var categoryData = filterByCategory(data, category);
		sortByDate(categoryData);		
		var topCategoryData = categoryData.slice(categoryData.length-7); //Only Top 7 are displayed.
		var htmlData = generateTable(topCategoryData.reverse()); // Top table is sorted by Date before processing.
		$('#'+category+'Content').html(htmlData);	
	}
}


function filterByCategory(data, category){
	var result = [];
	
	for(var row in data) {
		var row_category = data[row][COL_CATEGORY];
		if(row_category === category){
			result.push(data[row]);
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
	
	var totalRows = data.length;
	if (totalRows > MAX_ROWS) totalRows = MAX_ROWS; // A max of 1000 results are displayed to avoid performance hangs.
	for(var row = 0; row < totalRows; row++) {
	  html += '<tr>\r\n';
	  sorted_row[0] = data[row][COL_DATE]; //Date
	  sorted_row[1] = data[row][COL_ID]; //ID
	  sorted_row[2] = data[row][COL_TITLE]; //Title
	  sorted_row[3] = data[row][COL_PLATFORM]; //Platform
	  sorted_row[4] = data[row][COL_AUTHOR]; //Author
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

// Sorts a 2D array by date. Date column number is fixed as 3.
function sortByDate(data){
	data.sort(function(a, b){
		var parts = a[3].split('-');
		var date_a = new Date(parts[0],parts[1]-1,parts[2]);
		
		parts = b[3].split('-');
		var date_b = new Date(parts[0],parts[1]-1,parts[2]);

		return date_a.getTime()-date_b.getTime();
	});	
}