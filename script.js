$(document).ready(function(){

	var permitted = true;

	$('#thumbnails-container .thumbnail').click(function(){
		if (permitted) {
			permitted = false;
			animateNewThumbnail($(this));
			slidePanes();
		}

	});

	function animateNewThumbnail(thumbnail){

		var position = $('#panes-container #pane1 #thumb1').position();
		var width = $('#panes-container #pane1 #thumb1').width();
		var height = $('#panes-container #pane1 #thumb1').height();

		// Add placeholder

		var currentPos = $(thumbnail).position();
		var currentWidth = $(thumbnail).width();
		var currentHeight = $(thumbnail).height();
		var placeholder = $(thumbnail).next();
		console.log(currentPos);

		$(thumbnail).css({
			position: 'absolute',
			top: currentPos.top,
			left: currentPos.left
		});

		$(thumbnail).animate({
			top: position.top - 2,
			left: position.left + 13,
			width: width,
			height: height,
			'background-size': width

		}, 700, function(){
			$(thumbnail).fadeOut();
		});

		$(placeholder).show();


		// Animate panel 3's thumbnail down
		console.log("thumb 3 is ");

		$('#thumb3-placeholder').css({
			position: 'absolute',
			top: $('#thumb3').position().top + $('#thumb3').offset().top,
			left: $('#thumb3').position().left + $('#thumb3').offset().left
		});

		$('#thumb3-placeholder').show();

		$('#thumb3-placeholder').animate({
			top: currentPos.top,
			left: currentPos.left,
			width: currentWidth,
			height: currentHeight,
			'background-size': currentWidth,
			opacity: 1,
			'margin-right': 0

		}, 300, function (){

			$('#thumb3-placeholder').attr('class', 'thumbnail');
			$('#thumb3-placeholder').attr('id', '');

		});

	}

	function slidePanes(){
		var delay = 200;

		$('#pane3').animate({
			opacity: '0'
		}, 300, function(){
			$('#pane3').remove();
		});

		$('#pane1').delay(delay).animate({
			'margin-left': '+=450px'
		}, 500, function(){

			// Rename divs where necessary
			$('#pane2').attr('id', 'pane3');
			$('#thumb2').attr('id', 'thumb3');
			$('#thumb2-placeholder').attr('id', 'thumb3-placeholder');

			$('#pane1').attr('id', 'pane2');
			$('#thumb1').attr('id', 'thumb2');
			$('#thumb1-placeholder').attr('id', 'thumb2-placeholder');

			addNewPane();

			$('#pane2').animate({
				'margin-left': '15px'
			}, 0);

			$('#pane3').animate({
				'margin-left': '15px'
			}, 0);
		});
	}

	function addNewPane(){
		$('#panes-container').prepend('<div class="pane" style="opacity: 0" id="pane1"><div class="thumbnail" id="thumb1"></div><div class="description">Here is a description for pane1.</div></div>');
		$('#pane1').animate({
			opacity: '1'
		}, 100, function(){

			permitted = true;
		});
	}

});


