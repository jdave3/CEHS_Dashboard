var source_data = [];
var columns = ['Claim_Number','ClientID','VendorID','State','Claim_Type','Date_of_Loss','Body_Part','Legal_Indicator','Indemnity_Cost','Medical_Cost','Expense_Cost'];
var disp_columns = ['Claim Number','Client ID','Vendor ID','State','Claim Type','Date of Loss (YYYY/MM/DD)','Body Part','Legal Indicator (Y/N)','Indemnity Cost (USD)','Medical Cost (USD)','Expense Cost (USD)'];
function disp_table()
{
			var $table = $('table.mytableclass'),
				$bodyCells = $table.find('tbody tr:first').children(),
				colWidth;
			// Adjust the width of thead cells when window resizes
			$(window).resize(function() {
				// Get the tbody columns width array
				colWidth = $bodyCells.map(function() {
					return $(this).width();
				}).get();
				
				// Set the width of thead columns
				$table.find('thead tr').children().each(function(i, v) {
					$(v).width(colWidth[i]);
				});    
			}).resize(); // Trigger resize handler
			
				
				document.getElementById("tablecontainer").innerHTML="";
				
				d3.csv('CEHS_Dashboard_data_table.csv',function (data) {
					for(var i=0;i<data.length;i++){
					source_data.push(
					{Claim_Number: data[i].Claim_Number,
					ClientID: data[i].ClientID,
					VendorID: data[i].VendorID,
					State: data[i].State,
					Claim_Type: data[i].Claim_Type,
					Date_of_Loss: data[i].Date_of_Loss,
					Body_Part: data[i].Body_Part,
					Legal_Indicator: data[i].Legal_Indicator,
					Indemnity_Cost: data[i].Indemnity_Cost,
					Medical_Cost: data[i].Medical_Cost,
					Expense_Cost: data[i].Expense_Cost
					});
					}
			
				//console.log(source_data);
				//console.log("tabulate call");
				tabulate(source_data,columns,"All","All States","All years","All body parts");
				})
				
				
				
}
function tabulate(data,columns, input_LegalInd, input_state, input_year, input_BodyPart) {
				var tablehead = d3.select('#tablecontainer')
							.append('div')
							.text("Total Records for "+input_LegalInd+" cases ,"+input_state+" ,"+input_year+" ,"+input_BodyPart+" are "+data.length)
							.append('div')
							.attr("class","panel panel-default")
							.append('table')
							.attr("id","mytable")
							.attr("class","table table-bordered mytableclass")
					var thead = tablehead.append('thead')
				
					thead.append('tr')
					.selectAll('th')
						.data(disp_columns)
						.enter()
					.append('th')
						.text(function (d) { return d })
					
				var tablebody = d3.select('#tablecontainer')
							.append('div')
							.attr("class","div-table-content")
							.append('table')
							.attr("id","mytable")
							.attr("class","table table-hover table-bordered mytableclass")	
					var tbody = tablebody.append('tbody')
					var rows = tbody.selectAll('tr')
						.data(data)
						.enter()
					.append('tr')
					var cells = rows.selectAll('td')
						.data(function(row) {
							return columns.map(function (column) {
								return { column: column, value: row[column] }
						})
					})
					.enter()
					.append('td')
					.text(function (d) { return d.value })
				
				return tablebody;
}
function filter_table()
{
	var copy_source_data = source_data;
	var input_LegalInd = d3.select('input[name="LegalInd"]:checked').node().value;
	//console.log("input_LegalInd:::"+input_LegalInd);
	var input_state = document.getElementById("state_dropdown").value;
	//console.log(input_state);
	var input_year = document.getElementById("year_dropdown").value;
	//console.log(input_year);
	var input_BodyPart = document.getElementById("BodyPart").value;
	//console.log(input_BodyPart);
	
	var var_filteredlegInd;
	var var_filteredstate;
	document.getElementById("tablecontainer").innerHTML="";
	if(input_LegalInd != "All")
	{
		copy_source_data = copy_source_data.filter(function(d){return d.Legal_Indicator.trim() == input_LegalInd});
	}
	if(input_state != "All")
	{
		copy_source_data = copy_source_data.filter(function(d){return d.State.trim() == input_state});
	}
	if(input_year != "All")
	{
		copy_source_data = copy_source_data.filter(function(d){return d.Date_of_Loss.substring(0,4) == input_year});
	}	
	if(input_BodyPart != "")
	{
		copy_source_data = copy_source_data.filter(function(d){return d.Body_Part.toLowerCase().indexOf(input_BodyPart.toLowerCase()) > -1});
	}
	tabulate(copy_source_data,columns, input_LegalInd, input_state, input_year, input_BodyPart );
	
	
}
	