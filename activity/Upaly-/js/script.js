;$(function () {
	$('.conter .conter-input').on( 'click' ,function (e) {
		$('#box').css({visibility:'inherit'});
	    $( '.di' ).show();
		e.preventDefault();	
	});
	$("#box ul li").click(function(){
	var val = $(this).index(),
		clone = $( '#box ul li' ).eq(val).clone();
		setTimeout(function(){
			$('.conter-input ul').html('').append(clone);
			$('.di').hide();
			$('#box').css({visibility:'hidden'});
		},300);
	});
});