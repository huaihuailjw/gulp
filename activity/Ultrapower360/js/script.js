$( document).ready( function(){
		initHeight();data( $('.nav-fadeIn li'));data( $('.lis li'));data( $('.uls li' ));
		$('.btn').click( animate);$('.btn-top').click( animate);
		hover( $('.banner4-box .us li') );hover( $('.banner6-box .banner6-box-us li') );
		
		$('.content-shuju .content-shuju-left').find('span').on('click', function () {
			$(this).next('.sub-list').slideDown().parent().siblings().find('.sub-list').slideUp();
		});
		$('.bind').on('click', function () {
			var w = $('.bins .con').width(),
				h = $('.bins .con').height();
			$('.bins .con').css({ marginTop: -h / 2, marginLeft: -w / 2});
			$('.bins').show();
			$('.bins .back').click( function(){
				$('.bins').hide();
			})
		});
});

	
function initHeight() {
	var newheight = 0;
	var d = document.documentElement, b = document.body;
	var vp = d && d.clientWidth && d.clientWidth != 0 ?
	{ width: d.clientWidth, height: d.clientHeight } :
	{ width: b.clientWidth, height: b.clientHeight };

	if (newheight < vp.height) { newheight = vp.height -1; }
	$('#header').height(newheight);
	$('#wrap .bins,.bins .background').height(newheight);
};
function hover(object){
	object.hover( function(){
		$(this).addClass('on')
	},function(){
		$(this).removeClass('on');
	});
};
function data( object ){
	var i = 0,times = '',len = object.length;
	timer = setInterval( function(){
		i++;
		i == len ? i = 0 : len;
		object.eq(i).addClass('on').siblings().removeClass('on');
	},1000);
};
function animate(){
	var offsetH=$('.content-navBox').offset().top;
	$(window).scrollTop(offsetH);
};