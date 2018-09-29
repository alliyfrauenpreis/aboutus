$(document).ready(function(){

	$('#thumbnails-container .thumbnail').click(function(){
		animateNewThumbnail($(this));
		slidePanes();

	});

	function animateNewThumbnail(thumbnail){

		var position = $('#panes-container #pane1 #thumb1').position();
		console.log(position.top);
		console.log($(thumbnail));

		$(thumbnail).eq(0).animate({
			opacity: '0.5'
		}, 1000);

	}

	function slidePanes(){
		var delay = 200;

		$('#pane3').animate({
			opacity: '0'
		}, 300, function(){
			$('#pane3').remove();
		});

		$('#pane1').delay(delay).animate({
			'margin-left': '+=350px'
		}, 500, function(){

			$('#pane2').attr('id', 'pane3');
			$('#pane1').attr('id', 'pane2');
			addNewPane();

			// $('#pane2').animate({
			// 	'margin-left': '15px'
			// }, 0);

			// $('#pane3').animate({
			// 	'margin-left': '15px'
			// }, 0);
		});
	}



	function addNewPane(){
		// $('#panes-container').prepend('<div class="pane" id="pane1"><div class="thumbnail" id="thumb1"></div><div class="description">Here is a description for pane1.</div></div>');
	}

});


