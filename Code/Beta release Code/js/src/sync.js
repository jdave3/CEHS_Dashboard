/*
The purpose of this demo is to demonstrate how multiple charts on the same page can be linked
through DOM and Highcharts events and API methods. It takes a standard Highcharts config with a
small variation for each data set, and a mouse/touch event handler to bind the charts together.
*/
var HCL,DSL;
function filter_data_init() {

	document.getElementById("container").innerHTML="";
	document.getElementById("container1").innerHTML="";
	document.getElementById("container2").innerHTML="";
	
	var input_state1 = document.getElementById("state_dropdown1").value;
	var input_state2 = document.getElementById("state_dropdown2").value;
	var input_state3 = document.getElementById("state_dropdown3").value;
	var input_state4 = document.getElementById("state_dropdown4").value;
	console.log(input_state1);
	console.log(input_state2);
	var dataset_test=[],dataset_test1=[],dataset_test2=[];
    // Get the data. The contents of the data file can be viewed at
    // https://github.com/highslide-software/highcharts.com/blob/master/samples/data/activity.json
    $.getJSON("sync.json", function (activity) {
		//console.log(activity);
		
        $.each(activity.datasets, function (i, dataset) {
				//console.log(dataset);
				//console.log(input_state1);
				//dataset_test = dataset; 	 	
				
				if(dataset.name == input_state1 || dataset.name == input_state2 || dataset.name == input_state3 || dataset.name == input_state4)
				{
				// Add X values
				dataset_test.push(
					{
						data : Highcharts.map(dataset.data, function (val, j) {return [activity.xData[j], val]; }),
						name : dataset.name,
						type : dataset.type,
						unit : dataset.unit
					});
				
				}
				//console.log(dataset_test);
				//console.log(dataset_test.name);
		});
	});
	$.getJSON("sync1.json", function (activity) {
		//console.log(activity);
		
        $.each(activity.datasets, function (i, dataset) {
				//console.log(dataset);
				//console.log(input_state1);
				//dataset_test = dataset; 	 	
				
				if(dataset.name == input_state1 || dataset.name == input_state2 || dataset.name == input_state3 || dataset.name == input_state4)
				{
				// Add X values
				dataset_test1.push(
					{
						data : Highcharts.map(dataset.data, function (val, j) {return [activity.xData[j], val]; }),
						name : dataset.name,
						type : dataset.type,
						unit : dataset.unit
					});
				
				}
				//console.log(dataset_test);
				//console.log(dataset_test.name);
		});
	});
	$.getJSON("sync2.json", function (activity) {
		//console.log(activity);
		
        $.each(activity.datasets, function (i, dataset) {
				//console.log(dataset);
				//console.log(input_state1);
				//dataset_test = dataset; 	 	
				
				if(dataset.name == input_state1 || dataset.name == input_state2 || dataset.name == input_state3 || dataset.name == input_state4)
				{
				// Add X values
				dataset_test2.push(
					{
						data : Highcharts.map(dataset.data, function (val, j) {return [activity.xData[j], val]; }),
						name : dataset.name,
						type : dataset.type,
						unit : dataset.unit
					});
				
				}
				//console.log(dataset_test);
				//console.log(dataset_test.name);
		});
	});
	setTimeout(function(){
		DSL=dataset_test.length;
		display_visual(dataset_test,dataset_test1,dataset_test2);
		}, 1000);
	
};

function filter_data() {	

    document.getElementById("container").innerHTML="";
	document.getElementById("container1").innerHTML="";
	document.getElementById("container2").innerHTML="";
	
	var input_state1 = document.getElementById("state_dropdown1").value;
	var input_state2 = document.getElementById("state_dropdown2").value;
	var input_state3 = document.getElementById("state_dropdown3").value;
	var input_state4 = document.getElementById("state_dropdown4").value;
	console.log(input_state1);
	console.log(input_state2);
	var dataset_test=[],dataset_test1=[],dataset_test2=[];
    // Get the data. The contents of the data file can be viewed at
    // https://github.com/highslide-software/highcharts.com/blob/master/samples/data/activity.json
    $.getJSON("sync.json", function (activity) {
		//console.log(activity);
		
        $.each(activity.datasets, function (i, dataset) {
				//console.log(dataset);
				//console.log(input_state1);
				//dataset_test = dataset; 	 	
				
				if(dataset.name == input_state1 || dataset.name == input_state2 || dataset.name == input_state3 || dataset.name == input_state4)
				{
				// Add X values
				dataset_test.push(
					{
						data : Highcharts.map(dataset.data, function (val, j) {return [activity.xData[j], val]; }),
						name : dataset.name,
						type : dataset.type,
						unit : dataset.unit
					});
				
				}
				//console.log(dataset_test);
				//console.log(dataset_test.name);
		});
	});
	$.getJSON("sync1.json", function (activity) {
		//console.log(activity);
		
        $.each(activity.datasets, function (i, dataset) {
				//console.log(dataset);
				//console.log(input_state1);
				//dataset_test = dataset; 	 	
				
				if(dataset.name == input_state1 || dataset.name == input_state2 || dataset.name == input_state3 || dataset.name == input_state4)
				{
				// Add X values
				dataset_test1.push(
					{
						data : Highcharts.map(dataset.data, function (val, j) {return [activity.xData[j], val]; }),
						name : dataset.name,
						type : dataset.type,
						unit : dataset.unit
					});
				
				}
				//console.log(dataset_test);
				//console.log(dataset_test.name);
		});
	});
	$.getJSON("sync2.json", function (activity) {
		//console.log(activity);
		
        $.each(activity.datasets, function (i, dataset) {
				//console.log(dataset);
				//console.log(input_state1);
				//dataset_test = dataset; 	 	
				
				if(dataset.name == input_state1 || dataset.name == input_state2 || dataset.name == input_state3 || dataset.name == input_state4)
				{
				// Add X values
				dataset_test2.push(
					{
						data : Highcharts.map(dataset.data, function (val, j) {return [activity.xData[j], val]; }),
						name : dataset.name,
						type : dataset.type,
						unit : dataset.unit
					});
				
				}
				//console.log(dataset_test);
				//console.log(dataset_test.name);
		});
	});
	setTimeout(function(){
		DSL=dataset_test.length;
		display_visual(dataset_test,dataset_test1,dataset_test2);
		}, 1000);
	
}

function display_visual(dataset_test,dataset_test1,dataset_test2) {	
	/**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
	 
    $('#container').bind('mousemove touchmove', function (e) {
        var chart,
            point,
            i;
		//console.log(HCL-(dataset_test.length*3));
		//console.log(HCL-(dataset_test.length*2));
		//console.log(HCL-(dataset_test.length));
		console.log(HCL);
		console.log(DSL);
        for (i = HCL-(DSL*3); i < HCL-(DSL*2); i = i + 1) {
            chart = Highcharts.charts[i];
			//console.log(chart);
            e = chart.pointer.normalize(e); // Find coordinates within the chart
			//console.log(chart.series[0]);
            point = chart.series[0].searchPoint(e, true); // Get the hovered point
			//console.log(point);
			

            if (point) {
                point.onMouseOver(); // Show the hover marker
                chart.tooltip.refresh(point); // Show the tooltip
                chart.xAxis[0].drawCrosshair(e, point); // Show the crosshair
            }
        }
    });
    /**
     * Override the reset function, we don't need to hide the tooltips and crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    /**
     * Synchronize zooming through the setExtremes event handler.
     */
    function syncExtremes(e) {
        var thisChart = this.chart;

        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
            Highcharts.each(Highcharts.charts, function (chart) {
                if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                        chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                    }
                }
            });
        }
    }
	//console.log(dataset_test);
		$.each(dataset_test, function (i, temp) {
			//console.log(dataset.data);
            $('<div class="chart">')
                .appendTo('#container')
                .highcharts({
                    chart: {
                        marginLeft: 50, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20,
                        zoomType: 'x',
						height: 85
                    },
                    title: {
                        text: null,
                        align: 'left',
                        margin: 0,
                        x: 30
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true,
                        events: {
                            setExtremes: syncExtremes
                        },
                        labels: {
                            format: '{value}'
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    tooltip: {
                        positioner: function () {
                            return {
                                x: this.chart.chartWidth - this.label.width, // right aligned
                                y: -1 // align to title
                            };
                        },
                        borderWidth: 0,
                        backgroundColor: 'none',
                        pointFormat: '{point.y}',
                        headerFormat: '',
                        shadow: false,
                        style: {
                            fontSize: '13px'
                        },
                        valueDecimals: temp.valueDecimals
                    },
                    series: [{
                        data: temp.data,
                        name: temp.name,
                        type: temp.type,
                        color: Highcharts.getOptions().colors[i],
                        fillOpacity: 0.3,
                        tooltip: {
							valuePrefix: temp.name + ': ' + temp.unit
                        }
                    }]
                });
        });
		display_visual1(dataset_test1,dataset_test2);
}
function display_visual1(dataset_test1,dataset_test2) {	
	/**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
    $('#container1').bind('mousemove touchmove', function (e) {
        var chart,
            point,
            i;
		//console.log(Highcharts.charts.length);
        for (i = HCL-(DSL*2); i < HCL-(DSL); i = i + 1) {
            chart = Highcharts.charts[i];
			//console.log(chart);
            e = chart.pointer.normalize(e); // Find coordinates within the chart
			//console.log(chart.series[0]);
            point = chart.series[0].searchPoint(e, true); // Get the hovered point
			//console.log(point);
			

            if (point) {
                point.onMouseOver(); // Show the hover marker
                chart.tooltip.refresh(point); // Show the tooltip
                chart.xAxis[0].drawCrosshair(e, point); // Show the crosshair
            }
        }
    });
    /**
     * Override the reset function, we don't need to hide the tooltips and crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    /**
     * Synchronize zooming through the setExtremes event handler.
     */
    function syncExtremes(e) {
        var thisChart = this.chart;

        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
            Highcharts.each(Highcharts.charts, function (chart) {
                if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                        chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                    }
                }
            });
        }
    }
								
	//console.log(dataset_test);
		$.each(dataset_test1, function (i, temp) {
			//console.log(temp.data);
            $('<div class="chart">')
                .appendTo('#container1')
                .highcharts({
                    chart: {
                        marginLeft: 50, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20,
                        zoomType: 'x',
						height: 85
                    },
                    title: {
                        text: null,
                        align: 'left',
                        margin: 0,
                        x: 30
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true,
                        events: {
                            setExtremes: syncExtremes
                        },
                        labels: {
                            format: '{value}'
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    tooltip: {
                        positioner: function () {
                            return {
                                x: this.chart.chartWidth - this.label.width, // right aligned
                                y: -1 // align to title
                            };
                        },
                        borderWidth: 0,
                        backgroundColor: 'none',
                        pointFormat: '{point.y}',
                        headerFormat: '',
                        shadow: false,
                        style: {
                            fontSize: '13px'
                        },
                        valueDecimals: temp.valueDecimals
                    },
                    series: [{
                        data: temp.data,
                        name: temp.name,
                        type: temp.type,
                        color: Highcharts.getOptions().colors[i],
                        fillOpacity: 0.3,
                        tooltip: {
							valuePrefix: temp.name + ': ' + temp.unit
                        }
                    }]
                });
        });
		display_visual2(dataset_test2);
}
function display_visual2(dataset_test2) {	
	/**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
    $('#container2').bind('mousemove touchmove', function (e) {
        var chart,
            point,
            i;
		//console.log(Highcharts.charts.length);
        for (i = HCL-(DSL); i < HCL; i = i + 1) {
            chart = Highcharts.charts[i];
			//console.log(chart);
            e = chart.pointer.normalize(e); // Find coordinates within the chart
			//console.log(chart.series[0]);
            point = chart.series[0].searchPoint(e, true); // Get the hovered point
			//console.log(point);
			

            if (point) {
                point.onMouseOver(); // Show the hover marker
                chart.tooltip.refresh(point); // Show the tooltip
                chart.xAxis[0].drawCrosshair(e, point); // Show the crosshair
            }
        }
    });
    /**
     * Override the reset function, we don't need to hide the tooltips and crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    /**
     * Synchronize zooming through the setExtremes event handler.
     */
    function syncExtremes(e) {
        var thisChart = this.chart;

        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
            Highcharts.each(Highcharts.charts, function (chart) {
                if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                        chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                    }
                }
            });
        }
    }
	//console.log(dataset_test);
		$.each(dataset_test2, function (i, temp) {
			//console.log(dataset.data);
            $('<div class="chart">')
                .appendTo('#container2')
                .highcharts({
                    chart: {
                        marginLeft: 50, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20,
                        zoomType: 'x',
						height: 85
                    },
                    title: {
                        text: null,
                        align: 'left',
                        margin: 0,
                        x: 30
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true,
                        events: {
                            setExtremes: syncExtremes
                        },
                        labels: {
                            format: '{value}'
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    tooltip: {
                        positioner: function () {
                            return {
                                x: this.chart.chartWidth - this.label.width, // right aligned
                                y: -1 // align to title
                            };
                        },
                        borderWidth: 0,
                        backgroundColor: 'none',
                        pointFormat: '{point.y}',
                        headerFormat: '',
                        shadow: false,
                        style: {
                            fontSize: '13px'
                        },
                        valueDecimals: temp.valueDecimals
                    },
                    series: [{
                        data: temp.data,
                        name: temp.name,
                        type: temp.type,
                        color: Highcharts.getOptions().colors[i],
                        fillOpacity: 0.3,
                        tooltip: {
							valuePrefix: temp.name + ': ' + temp.unit
                        }
                    }]
                });
        });
		HCL = Highcharts.charts.length;
}