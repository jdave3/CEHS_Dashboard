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
            type: 'boxplot'
        },

        title: {
            text: 'Quartile distribution of cost'
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: global_state_names,
            title: {
                text: 'States'
            }
        },

        yAxis: {
            title: {
                text: 'Cost Incured (USD)'
            },
            plotLines: [{
                value: 1063,
                color: 'red',
                width: 1,
                label: {
                    text: 'ILLINOIS mean: 1063',
                    align: 'center',
                    style: {
                        color: 'gray'
                    }
                }
            }]
        },

        series: [{
            name: 'Costs (USD)',
            data: global_source_data,
            tooltip: {
                headerFormat: '<em>Expenses for the State {point.key}</em><br/>'
            }
        }, {
            name: 'Outlier',
            color: Highcharts.getOptions().colors[0],
            type: 'scatter',
            data: [ // x, y positions where 0 is the first category
                ['Indiana', 644],
                [4, 718],
                [4, 951],
                [4, 969]
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