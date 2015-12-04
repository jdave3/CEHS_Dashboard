var global_source_data=[];
var global_illinois_data=[];
var color_data={};
function close_tutorial()
{
	document.getElementById("tutorial_backscreen").style.display = "none";
	document.getElementById("tutorial_frontscreen").style.display = "none";
}

function Load_data()
{
				d3.csv('CEHS_Dashboard_data_cost_diff.csv',function (data) {
					for(var i=0;i<data.length;i++){
					if(data[i].State.trim() != "Illinois")
					{
						global_source_data.push(
							{State: data[i].State,
							Date_of_Loss: data[i].Date_of_Loss,
							Body_Part: data[i].Body_Part,
							Legal_Indicator: data[i].Legal_Indicator,
							Indemnity_Cost: data[i].Indemnity_Cost,
							Medical_Cost: data[i].Medical_Cost,
							Expense_Cost: data[i].Expense_Cost,
							IndAndMed_Cost: data[i].IndAndMed_Cost,
							IndAndExp_Cost: data[i].IndAndExp_Cost,
							MedAndExp_Cost: data[i].MedAndExp_Cost,
							Total_Cost: data[i].Total_Cost,
						});
					}
					else
					{
						global_illinois_data.push(
							{State: data[i].State,
							Date_of_Loss: data[i].Date_of_Loss,
							Body_Part: data[i].Body_Part,
							Legal_Indicator: data[i].Legal_Indicator,
							Indemnity_Cost: data[i].Indemnity_Cost,
							Medical_Cost: data[i].Medical_Cost,
							Expense_Cost: data[i].Expense_Cost,
							IndAndMed_Cost: data[i].IndAndMed_Cost,
							IndAndExp_Cost: data[i].IndAndExp_Cost,
							MedAndExp_Cost: data[i].MedAndExp_Cost,
							Total_Cost: data[i].Total_Cost,
						});
					}
					}
				filter_data();
				////console.log(global_source_data[0]);
				////console.log("tabulate call");
				//tabulate(source_data,columns);
				})
}

function filter_data()
{
	build_map();
	var series_data=[];
	var copy_source_data = global_source_data;
	var copy_illinois_data = global_illinois_data;
		//console.log(copy_illinois_data);

	var input_LegalInd = d3.select('input[name="LegalInd"]:checked').node().value;
	//console.log("input_LegalInd:::"+input_LegalInd);
	
	var input_BodyPart = document.getElementById("bodypart_dropdown").value;
	//console.log(input_BodyPart);
	
	var input_xaxis = document.getElementById("x_dropdown").value;
	//console.log(input_xaxis);
	
	var input_yaxis = document.getElementById("y_dropdown").value;
	//console.log(input_yaxis);	
	
	var checkboxes = document.getElementsByName('chk_group');
	//var input_state = "";
	/*for (var i=0, n=checkboxes.length;i<n;i++) {
	
	if (checkboxes[i].checked) 
	{
	input_state += ","+checkboxes[i].value;
	}
	}
	if (input_state) input_state = input_state.substring(1);
	*/
	var input_state = "Indiana,Iowa,Kentucky,Michigan,Missouri,Wisconsin";
	//console.log(input_state);

	
	
	var var_filteredlegInd;
	var var_filteredstate;
	//document.getElementById("tablecontainer").innerHTML="";
	if(input_LegalInd != "All")
	{
		copy_source_data = copy_source_data.filter(function(d){return d.Legal_Indicator.trim() == input_LegalInd});
		copy_illinois_data = copy_illinois_data.filter(function(d){return d.Legal_Indicator.trim() == input_LegalInd});
	}
	
	if (input_state) 
	{
		
		copy_source_data = copy_source_data.filter(function(d){
			return input_state.trim().indexOf(d.State.trim()) > -1
			});
	}
	
	if(input_BodyPart != "All")
	{
		copy_source_data = copy_source_data.filter(function(d){return d.Body_Part.toLowerCase().indexOf(input_BodyPart.toLowerCase()) > -1});
		copy_illinois_data = copy_illinois_data.filter(function(d){return d.Body_Part.toLowerCase().indexOf(input_BodyPart.toLowerCase()) > -1});
	}
	//console.log(copy_source_data);
	
	var nested_statewise = d3.nest()
						.key(function(d)
						{return d.State.trim()})
						.entries(copy_source_data);	
	
	var nested_illinois = d3.nest()
						.key(function(d)
						{return d.State.trim()})
						.rollup(function(d) { 
							return  {
								xmean: d3.mean(d, function(d) { return d[input_xaxis]; }).toFixed(2),
								ymean: d3.mean(d, function(d) { return d[input_yaxis]; }).toFixed(2)
							};
							})
						.entries(copy_illinois_data);	
	//console.log(nested_illinois[0].values.ymean);
	//console.log(nested_statewise);
	var max_x=0,max_y=0;
	for(var j=0;j<nested_statewise.length;j++)
	{
		var plot_cordinates=[];
		for(var i=0; i<nested_statewise[j].values.length;i++) 
		{
			var cordinates=[parseFloat(nested_statewise[j].values[i][input_xaxis]), parseFloat(nested_statewise[j].values[i][input_yaxis])];
			plot_cordinates.push(cordinates);
			if(max_x < parseFloat(nested_statewise[j].values[i][input_xaxis]))
				{
					max_x = parseFloat(nested_statewise[j].values[i][input_xaxis]);
				}
			if(max_y < parseFloat(nested_statewise[j].values[i][input_yaxis]))
				{
					max_y = parseFloat(nested_statewise[j].values[i][input_yaxis]);
				}
		}
		series_data.push({
				type: 'scatter',
				name: nested_statewise[j].key,
				color: color_data[nested_statewise[j].key].color,
				data: plot_cordinates,
				marker: {radius: 4}
		})
	}
	if(max_x < parseFloat(nested_illinois[0].values.xmean))
				{
					max_x = parseFloat(nested_illinois[0].values.xmean);
				}
	if(max_y < parseFloat(nested_illinois[0].values.ymean))
		{
			max_y = parseFloat(nested_illinois[0].values.ymean);
		}
	series_data.push({
				type: 'line',
				name: 'Illinois '+[input_yaxis]+' Mean',
				data: [[0, parseFloat(nested_illinois[0].values.ymean)], [max_x, parseFloat(nested_illinois[0].values.ymean)]],
				marker: {enabled: false},
				color: '#fb8072',
				states: {hover: {lineWidth: 2}},
				enableMouseTracking: false
		})
	
	series_data.push({
				type: 'line',
				name: 'Illinois '+[input_xaxis]+' Mean',
				data: [[parseFloat(nested_illinois[0].values.xmean), 0], [parseFloat(nested_illinois[0].values.xmean), max_y]],
				marker: {enabled: false},
				color: '#fb8072',
				states: {hover: {lineWidth: 2}},
				enableMouseTracking: false
		})
	
	//console.log("max_y:"+max_y);
	refresh_plot(series_data,input_xaxis,input_yaxis,max_x,max_y);
	//console.log(plot_cordinates);
	//tabulate(copy_source_data,columns);

}
function build_map()
{
	color_data['Indiana']={color:"#8dd3c7"};
	color_data['Iowa']={color:"#ffffb3"};
	color_data['Kentucky']={color:"#bebada"};
	color_data['Michigan']={color:"#80b1d3"};
	color_data['Missouri']={color:"#fdb462"};
	color_data['Wisconsin']={color:"#b3de69"};
}
function refresh_plot(series_data,input_xaxis,input_yaxis,max_x,max_y)
{
$(function () {

	// Load the fonts
Highcharts.createElement('link', {
   href: '//fonts.googleapis.com/css?family=Unica+One',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
   //colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
     // "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
         ]
      },
      style: {
         fontFamily: "georgia, sans-serif"
		 //"sans-serif, georgia"
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         //textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#FBFBFC',
			fontWeight: 'bold'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#FBFBFC',
			fontWeight: 'bold'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);	

    $('#scatter_container').highcharts({
		credits: false,
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
		colors:
			['#8dd3c7', '#ffffb3', '#bebada', '#80b1d3', '#fdb462', '#b3de69']
		,
        title: {
            text: 'Cost Differential: Illinois and Neighboring states'
        },
        subtitle: {
            text: 'Claim cases'
        },
		exporting: {
            buttons: {
                contextButton: {
					enabled: false
					
                },
                exportButton: {
                    text: 'Save',
					theme: {
						fill:"#E0E0E3"
					},
                    // Use only the download related menu items from the default context button
                    menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems.splice(2)
                }
            }
        },
        xAxis: {
            title: {
                enabled: true,
                text: input_xaxis + ' (in $)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: input_yaxis + ' (in $)'
            }
        },
        legend: {
            //align: 'right',
            //verticalAlign: 'top',
            //layout: 'vertical',
            x: 0,
            y: 0,
            //floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
				pointFormat: input_xaxis+': ${point.x}<br>'+input_yaxis+': ${point.y}'
                }
            }
        },
        series: series_data
    });
});
}