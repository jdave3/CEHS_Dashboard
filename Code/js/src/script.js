$(document).ready(function(){
	
	$('#email').accordion({collapsible: true, active: false});
	
	$('#contact').accordion({collapsible: true, active: false});
	
	$('#skillslink').mouseenter(function(){
		$(this).addClass('zoom');
	});
	$('#skillslink').mouseleave(function(){
		$(this).removeClass('zoom');
	});
	
	$('#contactlink').mouseenter(function(){
		$(this).addClass('zoom');
	});
	$('#contactlink').mouseleave(function(){
		$(this).removeClass('zoom');
	});
	
	$('#maplink').mouseenter(function(){
		$(this).addClass('zoom');
	});
	$('#maplink').mouseleave(function(){
		$(this).removeClass('zoom');
	});

});