// JavaScript Document
var global_source_data=[];
var global_illinois_data=[];
var global_state_names="";
var color_data={};
function load_data()
{
	d3.csv('CEHS_Dashboard_Quartile_data.csv',function (data) {
					
					for(var i=0;i<data.length;i++){
					if(data[i].State.trim() != "Illinois")
					{
						var newdata = [ data[i]["Minimum"] + "," + 
										data[i]["Lower_Quartile"] + "," +
										data[i]["Median"] + ","  +
										data[i]["Upper_Quartile"] + "," + 
										data[i]["Maximum"] 										
						]
						global_source_data.push(newdata);
						global_state_names += "'"+data[i].State+"'" + ",";
						//console.log(global_state_names);
					}
					
					/*else
					{
						global_illinois_data.push(
							{State: data[i].State,
							Maximum: data[i].Maximum,
							Upper_Quartile: data[i].Upper_Quartile,
							Median: data[i].Median,
							Lower_Quartile: data[i].Lower_Quartile,
							Minimum: data[i].Minimum
						});
					}*/
					}
					global_state_names = global_state_names.substring(0,global_state_names.length-1);
					//document.write(global_source_data);
					console.log(global_source_data);
					console.log(global_state_names);
					showData();
					})
					
					
};

function showData()
{
	//var copy_source_data = global_source_data;
	/*for(int i=0;i<copy_source_data.length;i++){
		console.log(copy_source_data[i][Lower_Quartile]);
	}*/
	//console.log(copy_source_data);

    $('#container').highcharts({

        chart: {
            type: 'boxplot',
			borderWidth: 2,
			shadow: false
        },
        title: {
            text: 'Illinois Vs Neighbouring States'
        },
		subtitle: {
            text: 'Statistical distribution of Total Cost'
        },
        legend: {
            enabled: false
        },

        xAxis: {
            categories: ['Indiana','Iowa','Kentucky','Michigan','Missouri','Wisconsin'],
            title: {
                text: 'States'
            }
        },

        yAxis: {
            title: {
                text: 'Total Cost (USD)'
            },
            plotLines: [{
                value: 9203.17,
                color: 'red',
                width: 1,
                label: {
                    text: 'ILLINOIS mean: 9203.17',
                    align: 'center',
                    style: {
                        color: 'gray'
                    }
                }
            }]
        },
		credits: false,
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
        series: [{
            name: 'Costs (USD)',
            data: [
                [7000, 8010, 8480, 8950, 9650],
                [7330, 8530, 9390, 9800, 10800],
                [7140, 7620, 8170, 8700, 9180],
                [7240, 8020, 8060, 8710, 9500],
				[7240, 8020, 8060, 8710, 9500],
                [7340, 8360, 8640, 8820, 9100]
            ],
            tooltip: {
                headerFormat: '<em>Expenses for the State {point.key}</em><br/>'
            }
        }, {
            name: 'Outlier',
            color: Highcharts.getOptions().colors[0],
            type: 'scatter',
            data: [ // x, y positions where 0 is the first category
                ['Indiana', 5014],
                [4, 6018],
                [4, 10051],
                [4, 12069]
            ],
            marker: {
                fillColor: 'white',
                lineWidth: 1,
                lineColor: Highcharts.getOptions().colors[0]
            },
            tooltip: {
                pointFormat: 'Observation: {point.y}'
            }
        }]

    });// container ends here
};