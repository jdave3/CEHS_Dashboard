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
	
	// Define tooltip
	// http://bl.ocks.org/d3noob/c37cb8e630aaef7df30d
	var tip =  d3.select("#map")
				.append("div")  
				.attr("class", "tooltip")
				.attr("id","tooltip")
				.style("opacity", 0);                
	
	//getting value of radio button
	//http://stackoverflow.com/questions/29325040/get-value-of-checked-radio-button-using-d3-js
	var radioButton = d3.select('input[name="AgeGroup"]:checked').node().value;
	
	
	//Parse csv file
	d3.csv("sgd.csv", function(data) {
			
	//variable for citywise
	var nested_citywise = null;			

	//check values of ageGroup radio buttons
	if(radioButton == "AgeGroup1"){
		var filtereddata = data.filter(function(d){return d.ageGroup == "1"});
		nested_citywise = d3.nest()
						.key(function(d){return d.city})
						.entries(filtereddata);					
	}else if(radioButton == "AgeGroup2"){
		
		var filtereddata = data.filter(function(d){return d.ageGroup == "2"});
		nested_citywise = d3.nest()
						.key(function(d){return d.city})
						.entries(filtereddata);	
	}else if(radioButton == "AgeGroup3"){
			
		var filtereddata = data.filter(function(d){return d.ageGroup == "3"});
		nested_citywise = d3.nest()
						.key(function(d){return d.city})
						.entries(filtereddata);	
	}else{
		nested_citywise = d3.nest()
						.key(function(d){return d.city})
						.entries(data);
	}
	
	//for age Group radio button change events
	d3.selectAll(".radio").on("change",function(){
		
		
		if(document.getElementById("AgeGroup1").checked)
		{
			document.getElementById("map").removeChild(document.getElementById("mapHolder"));
			document.getElementById("map").removeChild(document.getElementById("tooltip"));
			var filtereddata = data.filter(function(d){return d.ageGroup == "1"});
			nested_citywise = d3.nest()
						.key(function(d){return d.city})
						.entries(filtereddata);
				
		}else if(document.getElementById("AgeGroup2").checked){
			document.getElementById("map").removeChild(document.getElementById("mapHolder"));
			document.getElementById("map").removeChild(document.getElementById("tooltip"));
			var filtereddata = data.filter(function(d){return d.ageGroup == "2"});
			nested_citywise = d3.nest()
						.key(function(d){return d.city})
						.entries(filtereddata);
		}else if(document.getElementById("AgeGroup3").checked){
			document.getElementById("map").removeChild(document.getElementById("mapHolder"));
			document.getElementById("map").removeChild(document.getElementById("tooltip"));
			var filtereddata = data.filter(function(d){return d.ageGroup == "3"});
			nested_citywise = d3.nest()
						.key(function(d){return d.city})
						.entries(filtereddata);
		}else{
			document.getElementById("map").removeChild(document.getElementById("mapHolder"));
			document.getElementById("map").removeChild(document.getElementById("tooltip"));
			nested_citywise = d3.nest()
						.key(function(d){return d.city})
						.entries(data);
		}
	})

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
		
		
	//for citywise markers
		svg.selectAll("circle")
          .data(nested_citywise)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
                  return projection([d.values[0].lng, d.values[0].lat])[0];
          })
          .attr("cy", function(d) {
                  return projection([d.values[0].lng, d.values[0].lat])[1];
          })
          .attr("r", function(d) {
                  return 0.2*d.values.length
          })
		  //.attr("r", 2)
          .style("fill", mapMarker)
          .style("opacity", 1.00)
	   .on('mouseover',function(d,i){
		d3.select(".tooltip").style("display","block");
		var currentState = this;
		d3.select(this).style('fill-opacity', 1.0);												
	
		tip.transition()
		   .style("opacity",1.00);
		   
		tip.html("<strong>"+d.key+", "+d.values[0].state+": "+"</strong><span style='color: white'>"+ d.values.length+"</span>") 
			.style("left", (d3.event.pageX) + "px")
			.style("color","white")			
			.style("top", (d3.event.pageY - 25) + "px");	
		})
		
		.on('mouseout',function(d,i){
		d3.select(".tooltip").style("display","none");
		})
	});
	});

}
