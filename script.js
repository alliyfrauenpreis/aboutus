$(document).ready(function(){

	var permitted = true;

	$('#thumbnails-container .thumbnail').click(startAnims);

	function startAnims(){

		if (permitted) {
			permitted = false;
			animateNewThumbnail($(this));
			slidePanes();
		}
	}

	function animateNewThumbnail(thumbnail){

		$(thumbnail).addClass('active');
		var position = $('#pane1 #thumb1').position();
		console.log($('#pane1 #thumb1').offset());
		var width = $('#pane1 #thumb1').width();
		var height = $('#pane1 #thumb1').height();

		// Add placeholder
		var currentPos = $(thumbnail).position();
		var currentWidth = $(thumbnail).width();
		var currentHeight = $(thumbnail).height();
		var currentMargin = parseInt($(thumbnail).css('margin'));
		var placeholder = $(thumbnail).next();

		// Animate thumbnail to new pane1
		$(placeholder).show();
		$(thumbnail).css({
			position: 'absolute',
			top: currentPos.top,
			left: currentPos.left
		});

		$(thumbnail).animate({
			top: $('#pane1 #thumb1').offset().top - (parseInt($('#pane1 #thumb1').css('margin-right'))/2),
			left: $('#pane1 #thumb1').offset().left - (parseInt($('#pane1 #thumb1').css('margin-right'))/2),
			width: width,
			height: height,
			'background-size': width
		}, 700);

		// Animate panel 3's thumbnail down
		$('#thumb3-placeholder').css({
			position: 'absolute',
			top: $('#thumb3').position().top + $('#thumb3').offset().top,
			left: $('#thumb3').position().left + $('#thumb3').offset().left
		});
		$('#thumb3-placeholder').show();

		$('#thumb3-placeholder').animate({
			top: currentPos.top + (currentMargin/2),
			left: currentPos.left + (currentMargin/2),
			'margin': '10px 10px',
			width: currentWidth,
			height: currentHeight,
			'background-size': currentWidth,
			opacity: 1,
			'margin-right': 0

		}, 700, function (){

			// Reorganize divs as necessary
			$('#thumbnails-container').removeAttr('style');
			$('#thumbnails-container').prepend($('#thumb3-placeholder'));
			$('#thumb3-placeholder').click(startAnims);
			$('#thumb3-placeholder').attr('class', 'thumbnail');
			$('#thumb3-placeholder').attr('id', '');

		});

	}

	function slidePanes(){

		// Decide where panel2 should end up
		var leftOffset = $('#pane2').offset().left - $('#pane1').offset().left;
		var delay = 200;

		// Fade off & remove pane3, starting with thumbnail
		$('#pane3 .thumbnail').css({
			opacity: '0'
		});

		$('#pane3').animate({
			opacity: '0'
		}, 300, function(){
			$('#pane3').remove();
		});

		// Move pane1 over to become new pane2
		$('#pane1').delay(delay+200).animate({
			'margin-left': '+=' + leftOffset + 'px'
		}, 500, function(){

			// Reorganize divs as necessary
			$('#pane2').attr('id', 'pane3');
			$('#thumb2').attr('id', 'thumb3');
			$('#thumb2-placeholder').attr('id', 'thumb3-placeholder');

			$('#pane1').attr('id', 'pane2');
			$('#thumb1').attr('id', 'thumb2');
			$('#thumb1-placeholder').attr('id', 'thumb2-placeholder');

			// Add new pane
			addNewPane();

			// Align margins
			$('#pane2').animate({
				'margin-left': '15px'
			}, 0);

			$('#pane3').animate({
				'margin-left': '15px'
			}, 0);
		});
	}

	// Create & animate new pane1
	function addNewPane(){

		var image = $('.thumbnail.active').css('background-image');
		console.log(image);

		$('body').prepend('<div class="pane" style="opacity: 0" id="pane1"><div class="thumbnail" id="thumb1"></div><div class="description">Here is a description of a lovely person.</div></div><div class="thumbnail-movable" id="thumb1-placeholder"></div>');
		$('#pane1').animate({
			opacity: 1
		}, 200, function(){
			$('#pane1').css('opacity','');
			$('#thumb1').css('background-image', image);
			$('#thumb1-placeholder').css('background-image', image);

			permitted = true;
			$('.thumbnail.active').remove();
		});
	}

});


