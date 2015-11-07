function d3Tutorial(){
    
 	//Assign colors
	var mapColor = "#D2D2D2";
	var mapText = "#000082";
	var mapBorder = "#464646";
	var mapMarker = "#820000";
	sizeChange();
	//projecting 3D to 2D and setting size of map
	d3.select(window)
    		.on("resize", sizeChange);
			
	d3.select(window)
    		.on("load", sizeChange);
			
	
	//https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
	
	var projection = d3.geo.albersUsa()
					   .scale([900]);
	
	function sizeChange() {
	    d3.select("g").attr("transform", "scale(" + $("#map").width()/900 + ")");
	    $("svg").height($("#map").width()*0.4);
		console.log("called");
	}

	
	//Define path
	//https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
	var path = d3.geo.path()
                 .projection(projection);
				 
	//Define Map holder
	//https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
	var svg = d3.select("#map").append("svg")
								.attr("id","mapHolder")
								.attr("width", "100%") 
								.attr("height", "300px") 
								.append("g");
	
	var color = d3.scale.quantize()
                    .range(["rgb(237,248,233)", "rgb(186,228,179)",
                     "rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"]);
					 
	d3.csv("CEHS_Dashboard_data_table_test.csv", function(data) {
			
	//variable for citywise
	var nested_statewise = d3.nest()
						.key(function(d){return JSON.stringify($.trim(d.State))})
						.rollup(function(d) { 
							return d3.sum(d, function(g) {return g.Indemnity_Cost; });
							})
						.entries(data);	
	console.log(nested_statewise);
	
	color.domain([
                d3.min(data, function(d) { return d.value; }),
                d3.max(data, function(d) { return d.value; })
        ]);
	
	
			
	//loading the json file
	d3.json("midwest-states.json", function(json) {
	    for (var i = 0; i < data.length; i++) {

            //Grab state name
            var dataState = data[i].State;

            //Grab data value, and convert from string to float
            var dataValue = parseFloat(data[i].value);

            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

            var jsonState = json.features[j].properties.name;

            if (dataState == jsonState) {

                //Copy the data value into the JSON
                json.features[j].properties.value = dataValue;

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
                    var value = d.properties.value;

                    if (value) {
                            //If value exists…
                            return color(value);
                    } else {
                            //If value is undefined…
                            return "#ccc";
                    }
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
}
