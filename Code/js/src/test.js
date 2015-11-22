// JavaScript Document
var global_source_data=[];
var global_illinois_data=[];
var color_data={};
$(function Load_data() {
	d3.csv('CEHS_Dashboard_Quartile_data.csv',function (data) {
					for(var i=0;i<data.length;i++){
					if(data[i].State.trim() != "Illinois")
					{
						global_source_data.push(
							{State: data[i].State,
							Maximum: data[i].Maximum,
							Upper_Quartile: data[i].Upper_Quartile,
							Median: data[i].Median,
							Lower_Quartile: data[i].Lower_Quartile,
							Minimum: data[i].Minimum
						});
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
					})

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
            categories: ['Indiana', 'Iowa', 'Kentucky', 'Michigan', 'Missouri','Wisconsin'],
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
            data: [
                [700, 801, 848, 895, 965],
                [733, 853, 939, 980, 1080],
                [714, 762, 817, 870, 918],
                [724, 802, 806, 871, 950],
				[724, 802, 806, 871, 950],
                [834, 836, 864, 882, 910]
            ],
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

    });
});