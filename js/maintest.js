
(function(){
	var Util = (function(){
		var prefix = 'html5_reader_';
		var StorageGetter = function(key) {
			return localStorage.getItem( prefix + key );
		}
		var StorageSetter = function(key, val) {
			return localStorage.setItem( prefix + key, val );
		}
		return {
			StorageGetter : StorageGetter,
			StorageSetter : StorageSetter
		}
	})();
	
	var Dom = {
		top_nav :$('#top-nav'),
		bottom_nav :$('.bottom_nav'),
		font_container : $('.font-container'),
		font_button: $('#font-button'),
		night_button : $('#night-button')
		
	}
	var Win = $(window);
	var Doc = $(document);
	var RootContainer = $('#fiction_container');
	
	var initFontSize = Util.StorageGetter('font_size') ;
	initFontSize = parseInt(initFontSize);
	if(!initFontSize){
		initFontSize = 14;
	}
	RootContainer.css('font-size',initFontSize);
	
	var fontColor = Util.StorageGetter('font_color');
	if(!fontColor){
		fontColor == '#4e534f';
	}
	RootContainer.css('font-color',fontColor);
		
	//是否是夜间模式
	var NightMode = false;
	
	function main(){
		// TODO 整个项目的入口函数
		EventHandler();
	}
	
	function ReaderModel(){
		// TODO 实现和阅读器相关的数据交互的方法
	}
	
	function ReaderBaseFrame(){
		// TODO 渲染基本的UI结构
	}
	
	function EventHandler(){
		// TODO 交互的事件绑定
		
		// 屏幕唤出上下边栏交互
		$('#action_mid').click(function(){
			if(Dom.top_nav.css('display') == 'none'){
				Dom.bottom_nav.show();
				Dom.top_nav.show();
			}else{
				Dom.bottom_nav.hide();
				Dom.top_nav.hide();
			}
		});
		
		// 唤出字体面板交互
		Dom.font_button.click(function(){
			if(Dom.font_container.css('display') == 'none'){
				Dom.font_container.show();
				Dom.font_button.addClass('current');
			}else{
				Dom.font_container.hide();
				Dom.font_button.removeClass('current');
			}
		});
		
		$('#night_button').click(function(){
			// TODO 触发背景切换的事件
		});
		
		// 字体大小设置
		$('#large-font').click(function(){
			if(initFontSize > 20){
				return;
			}
			initFontSize += 1;
			RootContainer.css('font-size',initFontSize);
		});
		$('#small-font').click(function(){
			if(initFontSize < 12 ){
				return;
			}
			initFontSize -= 1;
			RootContainer.css('font-size',initFontSize);
			Util.StorageSetter('font_size',initFontSize);
		});
		
		// 字体面板的背景切换
		
		// 字体面板中的黑白天阅读模式切换
		Dom.night_button.click(function() {
			if (NightMode) {
				$('#day_icon').hide();
				$('#night_icon').show();
				$('#font_normal').trigger('click');
				NightMode = false;
			} else {
				$('#day_icon').show();
				$('#night_icon').hide();
				$('#font_night').trigger('click');
				NightMode = true;
			}
		});
		
		if (fontColor == '#4e534f') {
			NightMode = true;
			$('#day_icon').show();
			$('#night_icon').hide();
			$('#bottom_tool_bar_ul').css('opacity', '0.6');
		} else {
			NightMode = false;
			$('#day_icon').hide();
			$('#night_icon').show();
			$('#bottom_tool_bar_ul').css('opacity', '0.9');
		}
		
		
		// 屏幕滚动事件
		Win.scroll(function(){
			Dom.bottom_nav.hide();
			Dom.top_nav.hide();
			Dom.font_container.hide();
			Dom.font_button.removeClass('current');
			Util.StorageSetter('font_size',initFontSize);
		});
	}
	
	main();	
})();