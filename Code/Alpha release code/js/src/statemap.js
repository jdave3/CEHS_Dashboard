var global_nested_statewise=[];

function d3Tutorial(){
	
 	//Assign colors
	var mapColor = "#D2D2D2";
	var mapText = "#000082";
	var mapBorder = "#464646";
	var mapMarker = "#820000";
	//sizeChange();
	//projecting 3D to 2D and setting size of map
	d3.select(window)
    		.on("resize", sizeChange);
	document.body.onload = function() {
			sizeChange();
	}		
	
	var tip =  d3.select("#map")
				.append("div")  
				.attr("class", "tooltip")
				.attr("id","tooltip")
				.style("opacity", 0);
	//https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
	
	var projection = d3.geo.albersUsa()
					   .scale(1600);
	

	var init_height = $("#map").width()*0.3;

	
	//Define path
	//https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
	var path = d3.geo.path()
                 .projection(projection);
				 
	//Define Map holder
	//https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
	var svg = d3.select("#map")	
								.append("div")
								.append("svg")
								.attr("id","mapHolder")
								.attr("width", "100%") 
								.attr("x","10")
								//.attr("height", init_height)
								//.attr("transform","scale($("#map").width()/900)")
								.append("g");
								
	

	var color_range = ["#f7fcfd","#ccece6","#99d8c9","#66c2a4","#41ae76","#006d2c","#00441b"]	
	d3.csv("CEHS_Dashboard_data_table.csv", function(data) {
			
	//variable for citywise
	var nested_statewise = d3.nest()
						.key(function(d)
						{return d.State.trim()})
						.rollup(function(d) { 
							/*return {d3.sum(d, function(g) {return g.Indemnity_Cost; })/d.length,
							d.length}*/
							return  {
								total_count: d.length,
								litigated_count: d.filter(function(d){return d.Legal_Indicator.trim() == "Y"}).length,
								nonlitigated_count: d.filter(function(d){return d.Legal_Indicator.trim() == "N"}).length,			
								total_Indemnity_Cost: d3.sum(d, function(d) { return d.Indemnity_Cost; }).toFixed(2),
								total_Medical_Cost: d3.sum(d, function(d) { return d.Medical_Cost; }).toFixed(2),
								total_Expense_Cost: d3.sum(d, function(d) { return d.Expense_Cost; }).toFixed(2)
							};
							})
						.entries(data);	

	nested_statewise = nested_statewise.sort(function(obj1, obj2) {
						return obj1.values.total_Medical_Cost - obj2.values.total_Medical_Cost;
						});
	for(var i=0;i<nested_statewise.length;i++){
					global_nested_statewise.push(
					{key: nested_statewise[i].key,
					total_count: nested_statewise[i].values.total_count,
					litigated_count: nested_statewise[i].values.litigated_count,
					nonlitigated_count: nested_statewise[i].values.nonlitigated_count,
					total_Indemnity_Cost: nested_statewise[i].values.total_Indemnity_Cost,
					total_Medical_Cost: nested_statewise[i].values.total_Medical_Cost,
					total_Expense_Cost: nested_statewise[i].values.total_Expense_Cost
					});
		
			}
	console.log("global_nested_statewise:"+global_nested_statewise[0].total_count);	
	
	
			
	//loading the json file
	d3.json("midwest-states.json", function(json) {
	    for (var i = 0; i < nested_statewise.length; i++) {

            //Grab state name
            var dataState = nested_statewise[i].key;

            //Grab data value, and convert from string to float
            var dataValue = parseFloat(nested_statewise[i].values);

            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
            var jsonState = json.features[j].properties.name;
            if (dataState == jsonState) {

                //Copy the data value into the JSON
                json.features[j].properties.value = dataValue;
				json.features[j].properties.rank = i;
                //Stop looking through the JSON
                break;
				}
			}
		}
		
       //binding GeoJson to path element
		svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("stroke",mapBorder)
		.style("fill", function(d) {
                    //Get data value
                    var rank = d.properties.rank;
					console.log("value:"+rank);
					return color_range[rank];
                    
        })
		
		
		
		.on('mouseover',function(d,i){
		d3.select(".tooltip").style("display","block");
		var currentState = d.properties.name;
		console.log(currentState);
		d3.select(this).style('fill-opacity', 1.0);										
		tip.transition()
		   .style("opacity",1.00);
		for (var j = 0; j < nested_statewise.length; j++) {
				if(nested_statewise[j].key == currentState)
				{
					/*
					tip.html("<strong>"+nested_statewise[j].key
					+"</strong><br>Total_Claims:"+nested_statewise[j].values.total_count
					+"<br>Litigated Cases:"+nested_statewise[j].values.litigated_count
					+"<br>Non-Litigated Cases:"+nested_statewise[j].values.nonlitigated_count
					+"<br>Total_Indemnity_Cost:"+nested_statewise[j].values.total_Indemnity_Cost
					+"<br>Total_Medical_Cost:"+nested_statewise[j].values.total_Medical_Cost
					+"<br>Total_Expense_Cost:"+nested_statewise[j].values.total_Expense_Cost
					);*/
					tip.html("<table id = 'tooltiptable' border='2'><tr><th align='center' colspan='2' style>"+nested_statewise[j].key+"</th></tr>"+
					"<tr><td>Total Cases:</td>"+
					"<td>"+nested_statewise[j].values.total_count+"</td></tr>"+
					"<tr><td>Litigated Cases:</td>"+
					"<td>"+nested_statewise[j].values.litigated_count+"</td></tr>"+
					"<tr><td>Non-Litigated Cases</td>"+
					"<td>"+nested_statewise[j].values.nonlitigated_count+"</td></tr>"+
					"<tr><td>Total Indemnity Cost:</td>"+
					"<td>"+nested_statewise[j].values.total_Indemnity_Cost+"</td></tr>"+
					"<tr><td>Total Medical Cost:</td>"+
					"<td>"+nested_statewise[j].values.total_Medical_Cost+"</td></tr>"+
					"<tr><td>Total Expense Cost:</td>"+
					"<td>"+nested_statewise[j].values.total_Expense_Cost+"</td></tr>"+
					"</table>"
					);
					
					break;
				}
		}
		/*tip.html("<strong>"+nested_statewise[0].key+", "+nested_statewise[0].values+": "+"</strong><span style='color: white'>"+ nested_statewise[0].values.length+"</span>") 
		*/
		
			tip.style("left", (d3.event.pageX) + "px")
			.style("color","black")			
			.style("top", (d3.event.pageY - 25) + "px");	
		})
		
		
		.on('mouseout',function(d,i){
		d3.select(".tooltip").style("display","none");
		})
		
		svg.selectAll("text")
		.data(json.features)
		.enter()
		.append("svg:text")
		.text(function(d){
			return d.properties.abbr;
		})
		.attr("x", function(d){
			return path.centroid(d)[0];
		})
		.attr("y", function(d){
			return  path.centroid(d)[1];
		})
		.attr("fill",mapText)
		.attr("text-anchor","middle")
		.attr('font-size','8pt')
		.attr("font-family","Times New Roman")
		.attr("font-weight","bold");
	});	
	});
	
    sizeChange();
}
function sizeChange() {
	    d3.select("g").attr("transform", "scale(" + $("#map").width()/1000 + ") translate(" + $("#map").width()*-1/5+")");
		//d3.select("g").attr("transform","translate(" + $("#map").width()/40+","+$("#map").height()/30+")");
	    $("svg").height($("#map").width()*0.36);
		console.log($("#map").width()*-1/40);
		console.log("called");
}

function makeTableHTML() {
	var tab = d3.select("#map")	
					.append("div")
					.attr("id","tableHolder")
					.attr("class","tableHolderclass")
					.style("float","right");
	
    var result = "<hr style= 'border-top: 1px solid #123455;'><table id = 'statetable' border=1 class='table table-bordered  table-hover mytableclass'>";
		result += "<tr style = 'background-color:#d9d8d5'>";
		result += "<th>Rank</th>";
		result += "<th>State</th>";
		result += "<th>Total Cases</th>";
		result += "<th>Litigated Cases</th>";
		result += "<th>Non-Litigated Cases</th>";
		result += "<th>Total Indemnity Cost</th>";
		result += "<th>Total Medical Cost</th>";
		result += "<th>Total Expense Cost</th>";		
        result += "</tr>";
    for(var i=0; i<global_nested_statewise.length; i++) {
        result += "<tr>";
		result += "<td>"+(i+1)+"</td>";
        result += "<td>"+global_nested_statewise[i].key+"</td>";
		result += "<td>"+global_nested_statewise[i].total_count+"</td>";
		result += "<td>"+global_nested_statewise[i].litigated_count+"</td>";
		result += "<td>"+global_nested_statewise[i].nonlitigated_count+"</td>";
		result += "<td>"+global_nested_statewise[i].total_Indemnity_Cost+"</td>";
		result += "<td>"+global_nested_statewise[i].total_Medical_Cost+"</td>";
		result += "<td>"+global_nested_statewise[i].total_Expense_Cost+"</td>";		
        result += "</tr>";
    }
    result += "</table>";
	$("#statetable").remove();
	console.log(result);
	tab.html(result);
	
	
}
