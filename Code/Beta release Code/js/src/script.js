$(document).ready(function(){
	
	//$('#table_filter_option').accordion({collapsible: true, active: false});
	
	$('#About').accordion({collapsible: true, active: false});
	
	$('#use').accordion({collapsible: true, active: false});
	
	$('#trytableHolder').accordion({collapsible: true, active: false});
	
	$('#tabs').accordion({collapsible: true, active: false});
	
	$('#t_display').accordion({collapsible: true, active: false});

	$('#s_map').accordion({collapsible: true, active: false});
	
	$('#timeline').accordion({collapsible: true, active: false});
	
	$('#cost_differ').accordion({collapsible: true, active: false});
	
	$('#boxChart').accordion({collapsible: true, active: false});
	
	$('#div2').accordion({collapsible: true, active: false});
	

});

function showMoreOrLess(thisObj,bonusContent){
    var caption = thisObj.innerHTML;
    //alert(caption);
    if ( caption == "Read more" ) {
        document.getElementById(bonusContent).style.display = "inline";
        thisObj.innerHTML = "Read less";
		thisObj.style.color = "#2D5E95";
    } else {
        document.getElementById(bonusContent).style.display = "none";
        thisObj.innerHTML = "Read more";
		
    }
}
	