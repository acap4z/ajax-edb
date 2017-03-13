
function parse(rawData){

	arrayData = $.csv.toArrays(rawData);
	arrayData.shift(); // Removes the header.
	// localStorage.setItem("arrayData",JSON.stringify(arrayData));
	loadParsedData();
	
}


function loadParsedData(){
	var categories = ["remote","webapps","local","dos","shellcode"];
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
		var filePath = arrayData[row][1];
		var row_category = filePath.split("/")[2];
		if(row_category === category){
			result.push(arrayData[row]);
		}
	}
	
	return result;
}


// build HTML table data from an array (one or two dimensional)
function generateTable(data) {
  var html = '';

  if(typeof(data[0]) === 'undefined') {
	return null;
  }

  if(data[0].constructor === String) {
	html += '<tr>\r\n';
	for(var item in data) {
	  html += '<td>' + data[item] + '</td>\r\n';
	}
	html += '</tr>\r\n';
  }

  if(data[0].constructor === Array) {
	for(var row in data) {
	  html += '<tr>\r\n';
	  for(var item in data[row]) {
		html += '<td>' + data[row][item] + '</td>\r\n';
	  }
	  html += '</tr>\r\n';
	}
  }

  if(data[0].constructor === Object) {
	for(var row in data) {
	  html += '<tr>\r\n';
	  for(var item in data[row]) {
		html += '<td>' + item + ':' + data[row][item] + '</td>\r\n';
	  }
	  html += '</tr>\r\n';
	}
  }
  
  return html;
}