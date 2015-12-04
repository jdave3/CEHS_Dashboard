var var_Litigated =[];
var var_NonLitigated =[];
function close_tutorial()
{
	document.getElementById("tutorial_backscreen").style.display = "none";
	document.getElementById("tutorial_frontscreen").style.display = "none";
}
$(function () {
	
	var counter =0;
	var nonlit_length = 0;
	var csv_lit = null;
	var csv_nonlit = null;
	
	d3.csv("litigated_illinois.csv", function(data) {
		//console.log("lit:"+data);
			for(var i=0;i<data.length;i++){
					
					var newData = [
									Date.parse(data[i]["Date_of_Loss"]),
									parseFloat(data[i]["Total_Cost"])
					]
					
					var_Litigated.push(newData);
					}
		
		//console.log(var_Litigated);
			
		});
	
		/*var csv_lit = (function () {
               var json = null;
               $.ajax({
                       'async': false,
                       'global': false,
                       'url': "litigated_illinois.csv",
                       'dataType': "text/csv",
                       'success': function (data) {
                               json = data;
                       }
					    });
               return json;
       })();
		console.log(csv_lit)
		csv_nonlit = $.ajax({
					   'type': "GET",	
                       'async': false,
                       //'global': false,
                       'url': "non-litigated_illinois.csv",
                       //'dataType': "csv"
                       
               }).responseText;
	*/
	d3.csv("non-litigated_illinois.csv", function(data) {
				//console.log("non-lit:"+data);
			//nonlit_length = data.length;
			for(var i=0;i<data.length;i++){
					
					var newData = [
									Date.parse(data[i]["Date_of_Loss"]),
									parseFloat(data[i]["Total_Cost"])
					]
					
					var_NonLitigated.push(newData);
					}
			
		//;console.log(var_NonLitigated);
		
	});
	
	setTimeout(function(){
		makePlot();
		}, 1500);
	
	/*do{
	if(counter == 2){
			
	}
	console.log(counter);	
	}while(counter == 2)
	*/
	
});
/*
function makeTableHTML() {
	console.log(NonLitigated);
	console.log(Litigated);
}
*/

function makePlot() {
	
	/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
   href: '//fonts.googleapis.com/css?family=Unica+One',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
   colors: ["#00FFFF", "#FFFF00"],
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
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3'
         //textTransform: 'uppercase'
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
            color: '#A0A0A3'

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
            color: '#A0A0A3'
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
   credits: {
      style: {
         color: '#666'
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
               fill: '#707073',
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
         gridLineColor: '#dcdcdc',
		 labels: {
                style: {
					color: 'white'
				},
		}
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
	
    var seriesOptions = [],
        seriesCounter = 0,
        names = ['Litigated', 'NonLitigated'];
	//console.log(var_NonLitigated);
	//console.log(var_Litigated);
    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    function createChart() {
		
        $('#container').highcharts('StockChart', {
			credits: false,
			chart: {
				borderWidth: 2,
				shadow: false
				//,backgroundColor: 'transparent'
			},
			title: {
            text: 'Illinois: Litigated Vs Non-Litigated Cases'
			},
	
			subtitle: {
				text: 'Variation of Total Cost'
			},
			exporting: {
            buttons: {
                contextButton: {
					enabled: false
                },
                exportButton: {
                    text: 'Save',
					theme: {
						fill:"#E9EAED"
					},
                    // Use only the download related menu items from the default context button
                    menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems.splice(2)
					}
				}
			},
            rangeSelector: {
					buttons: [{
						type: 'month',
						count: 1,
						text: '1m'
					}, {
						type: 'month',
						count: 3,
						text: '3m'
					}, {
						type: 'month',
						count: 6,
						text: '6m'
					}, {
						type: 'year',
						count: 1,
						text: '1y'
					}, {
						type: 'all',
						text: 'All'
					}],
					selected: 3
				},

            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },
			legend:{
				enabled: true
			},
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }
		var test = JSON.parse(JSON.stringify(var_Litigated));
		var test1 = JSON.parse(JSON.stringify(var_NonLitigated));
		

	seriesOptions[0] = {name: 'Litigated', data: test}
	seriesOptions[1] = {name: 'Non-Litigated', data: test1}
	createChart();
    // $.each(names, function (i, name) {
			
			// console.log('var_'+name);
            // seriesOptions[i] = {
                // name: name,
                // data: var_Litigated
            // };
			// console.log(seriesOptions[i].data);

            // // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // // we keep a counter and create the chart when all the data is loaded.
            // seriesCounter += 1;
			// console.log(seriesCounter === names.length);
            // if (seriesCounter === names.length) {
                // createChart();
            // }
    // });
	
	
	// JSON.parse(JSON.stringify(var_Litigated), function(data){
		// console.log(data);
	// });
	
	//console.log(test);
};