function d3Tutorial(){
    
 	//Assign colors
	var mapColor = "#D2D2D2";
	var mapText = "#000082";
	var mapBorder = "#464646";
	var mapMarker = "#820000";
	
	//projecting 3D to 2D and setting size of map
	
	//https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
	var width = 1300;
	var height = 700;
	var projection = d3.geo.albersUsa()
                       .translate([width/2, height/2])
					   .scale([1400]);
	

	
	//Define path
	//https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
	var path = d3.geo.path()
                 .projection(projection);
				 
	//Define Map holder
	//https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
	var svg = d3.select("#map").append("svg")
								.attr("id","mapHolder")
								.attr("width", width)
								.attr("height", height)
								
	
	
	//Parse csv file
	d3.csv("sample.csv", function(data) {
			
	//variable for citywise
	var nested_statewise = d3.nest()
						.key(function(d){return d.State_Name})
						.entries(data);
	
	console.log(us-states.json)
	//loading the json file
	d3.json("us-states.json", function(json) {
	    
       //binding GeoJson to path element
		svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("fill",mapColor)
		.attr("stroke",mapBorder)
		.attr("d", path)

		
		//Inserting state abbreviations
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

}
