$(function() {
	var globalVars = function() {
		var $window = $(window),
			windowH = $(window).height(),
			$workInfo = $('.work-info'),
			$sideNav = $('#side-nav'),
			$menuBtn = $('#menu-button'),
			$sideNavW = $sideNav.width(),
			$workItem = $('.hp-work-item'),
			$firstPost = $workItem.eq(0),
			firstPostTop = 0,
			totalPosts = $workItem.length,
			postForIndex = totalPosts - 1,
			$lastPost = $workItem.eq(postForIndex),
			lastPostTop = $lastPost.offset().top,
			lastPostBtm = lastPostTop + $workItem.height(),
			workInfoColor = $workInfo.css('background-color'),
			$nav = $('.fixed-nav');


		return {
			window: $window,
			windowH: windowH,
			workInfo: $workInfo,
			sideNav: $sideNav,
			menuBtn: $menuBtn,
			sideNavW: $sideNavW,
			workItem: $workItem,
			firstPostTop: firstPostTop,
			lastPostTop: lastPostTop,
			lastPostBtm: lastPostBtm,
			workInfoColor: workInfoColor,
			nav: $nav
		}
	}()

	var pageStatus = {
		isAnimating: false,
		menuActive: false
	}

	/*function hpItems() {
		var $homeItem = $('section');

		//$homeItem.css('height', globalVars.windowH)
	}*/


	var menuFns = function() {
		var $wrap = $('#wrap');

		function menuBtnIn(e, obj) {
			var parentOffset = obj.offset(); 
			//or $(this).offset(); if you really just want the current element's offset
			var relX = e.pageX - parentOffset.left;

			globalVars.nav.removeClass('neutralTransform').css({
				'-webkit-transform': 'translateX(' + relX + 'px)',
				'-moz-transform': 'translateX(' + relX + 'px)',
				'-ms-transform': 'translateX(' + relX + 'px)',
				'-o-transform': 'translateX(' + relX + 'px)',
				'transform': 'translateX(' + relX + 'px)'
			});
		}

		function menuIn() {
			globalVars.workInfo.hide();
			globalVars.sideNav.css({
				'left': '0%'
			});


			$wrap.addClass('menu-clicked');
			globalVars.nav.addClass('menu-active');

			globalVars.nav.css({
				'-webkit-transform': 'translateX(' + 0 + 'px)',
				'-moz-transform': 'translateX(' + 0 + 'px)',
				'-ms-transform': 'translateX(' + 0 + 'px)',
				'-o-transform': 'translateX(' + 0 + 'px)',
				'transform': 'translateX(' + 0 + 'px)'
			});

			pageStatus.menuActive = true;
			return
		}
		function menuOut() {
			$wrap.removeClass('menu-clicked menu-hover');

			globalVars.sideNav.css({
				'left': '-50%'
			});
			globalVars.nav.removeClass('menu-active');
			
			if (pageStatus.isAnimating) {
				globalVars.workInfo.show();
			}

			pageStatus.menuActive = false;
			return
		}

		function events() {
			globalVars.menuBtn.on({
				mouseenter: function(e) {
					var self = $(this);
					var movePercentage = (-100 + (20 / globalVars.sideNavW * 100))/2;

					if (!pageStatus.menuActive) {
						$wrap.addClass('menu-hover');
						globalVars.sideNav.css({
							'left': movePercentage + '%'
						});
						menuBtnIn(e, self);
					}

				},
				mouseleave: function(e) {
					if (!pageStatus.menuActive) {
						$wrap.removeClass('menu-hover');
						globalVars.sideNav.css({
							'left': '-50%'
						});
						globalVars.nav.css({
							'-webkit-transform': 'translateX(' + 0 + 'px)',
							'-moz-transform': 'translateX(' + 0 + 'px)',
							'-ms-transform': 'translateX(' + 0 + 'px)',
							'-o-transform': 'translateX(' + 0 + 'px)',
							'transform': 'translateX(' + 0 + 'px)'
						});
					}
				},
				click: function(e) {
					if (!pageStatus.menuActive) {
						menuIn();
					} else if (pageStatus.menuActive) {
						menuOut();
					} 	
				}	
			});
			$('#side-nav li').on({
				click: function() {
					var self = $(this);
					var index = $('#side-nav li').index(self);

					// general
					menuOut();	


					//hompage only
					scrollFns.toSection(index);
				}
			})
		}

		function init() {
			events();
		}
		return {
			init: init
		}
	}();

	var scrollFns = function() {
		var $worktext = $('.worktext-appear-wrap'),
			$contact = $('#contact'),
			navH = $('.fixed-nav').outerHeight(),
			insidePosts,
			direction;


		function hpGeneralPos(scrollPos) {

			if ( (scrollPos < (globalVars.windowH - navH)) || (scrollPos >= globalVars.lastPostBtm)) {
				insidePosts = false;
			} else if ( scrollPos > (globalVars.windowH - navH) ) {
				insidePosts = true;
			}
		}

		function menuColor() {
			var $siteTitle = $('.site-title');

			if (insidePosts == false) {
				
				globalVars.nav.removeClass('onDark');

			} else if (insidePosts == true) {
				
				globalVars.nav.addClass('onDark');
			}
		}

		function scrollToSection(index, callback) {
			var selectedTop = $('section').eq(index).offset().top;

			globalVars.window.scrollTop(selectedTop) 

		}

		function changeItemBg(scrollPos) {
			var animationBeginPos = globalVars.firstPostTop,
				animationEndPos = globalVars.lastPostTop,
				beginningColor = new $.Color(globalVars.workInfoColor);
				endingColor = new $.Color('rgb(242, 231, 220)');

				console.log(scrollPos)

			if (scrollPos >= animationBeginPos && scrollPos <= animationEndPos ) { 
				var percentScrolled = scrollPos / ( animationEndPos - animationBeginPos );
	            var newRed = beginningColor.red() + ( ( endingColor.red() - beginningColor.red() ) * percentScrolled );
	            var newGreen = beginningColor.green() + ( ( endingColor.green() - beginningColor.green() ) * percentScrolled );
	            var newBlue = beginningColor.blue() + ( ( endingColor.blue() - beginningColor.blue() ) * percentScrolled );
	            var newColor = new $.Color( newRed, newGreen, newBlue );

	            console.log('color running')

	            globalVars.workInfo.animate({ backgroundColor: newColor }, 0);
			} else if ( scrollPos > animationEndPos ) {
	             globalVars.workInfo.animate({ backgroundColor: endingColor }, 0);
	        } else if ( scrollPos < animationBeginPos ) {
	             globalVars.workInfo.animate({ backgroundColor: beginningColor }, 0);
	        } else { }
		}

		function getDirection(scrollPos, lastScrollTop) {
			if (scrollPos > lastScrollTop) {
				direction = "down";
			} else if (scrollPos < lastScrollTop) {
				direction = "up"
			}
		}
		function updateSideMenu(delay) {
			var defaultDelay = 200;
			
			function thisDelay() {
				if (delay == undefined) {
					return defaultDelay;
				} else {
					return delay  
				}
			}
			var thisDelay = thisDelay();


			setTimeout(function() {
				var $sectionActive = $('section.active'),
				activeIndex = $sectionActive.index(),
				$menuLi = $('#side-nav li');

				$('#side-nav li.active').removeClass('active');
				console.log('side-nav', activeIndex)
				$menuLi.eq(activeIndex).addClass('active');
			}, thisDelay)

		}
		function appearFns() {

			$worktext.on('appear', function() {
				$(this).addClass('worktext-fade-in');
			});
			$worktext.appear();

		}	
		

		options = {
		  panelSelector: 'section',
		  onSnapStart: function(){
		  },
		  onSnapFinish: function(){
		  },
		  onActivate: function(){
		  	var $hpItems = $('.hp-work-item');

		  	$hpItems.each(function() {
		  		checkStatus = $(this).hasClass('active');

		  		if (!checkStatus) {
		  			$(this).find('.worktext-appear-wrap').removeClass('worktext-fade-in');
		  		}
		  	});

		  	
		  },
		  directionThreshold: 0,
		  slideSpeed: 400,
  		  delay: 0
		}		

		$('body').panelSnap(options);

		return {
			getDirection: getDirection,
			toSection: scrollToSection,
			getLocation: hpGeneralPos,
			menuColor: menuColor,
			updateSideMenu: updateSideMenu,
			changeItemBg: changeItemBg,
			appearFns: appearFns
		}
	}();




	var viewProjectEvents = function() {
		var $viewBtn = $('.view-proj'),
			container,
			startBGColor = 'rgb(35, 35, 37)',
			endBGColor;

		$viewBtn.on('click', function() {
			var self = $(this),
				thisIndex = $viewBtn.index(self),
				bgColor = container.find('.work-info').css('background-color');

			container = globalVars.workItem.eq(thisIndex);

			container.addClass('clicked');
			removeAllOthers(container, self, 600);
			$('body').css('background-color', startBGColor)
		})


		function removeAllOthers(cont, clicked, delay) {
			var allButFooter = $('section').not(cont);

			setTimeout(function() {
				allButFooter.remove();
				cont.find('.work-info').remove();
				ajax(clicked);
			}, delay);
		}

		function ajax(forUrl) {
			var toLoad = forUrl.data('url');

			$.ajax({
				url: toLoad
			}).done(function(data){
				$('#wrap').append(data);
				projectPage.init();
			})
		}
	}();

	var closeProjectEvents = function() {
		var $closeBtn = $('.close-proj');


		$closeBtn.on('click', function() {
			var self = $(this);

			$('body').css('background-color', startBGColor)
			
		})


		function removeAll(delay) {
			$('#wrap > *').fadeOut(400, function() {
				$()
			});
		}


	}();


	var projectPage = function() {

		function setPage(data) {
			$('#wrap').attr('data-page', 'proj').append(data);
		}
		function loadHdrImg(delay) {
			globalVars.workItem.wrap("<div class='proj-hdr-wrap'></div>");

			setTimeout(function() {
				

				globalVars.workItem.removeClass().addClass('project-header');

			}, delay);
		}
		function menuColor() {
			globalVars.nav.addClass('onDark');
		}
		function loaded(delay) {
			setTimeout(function() {
				var $wrap = $('#wrap');

				$wrap.addClass('loaded');

			}, delay);
		}
		function init() {
			setPage();
			$('body').panelSnap('disable');
			hpScroll.killIt();
			menuColor();
			loadHdrImg(200);
			loaded(200);
		}
		return {
			setPage: setPage,
			init: init
		}
	}();



	function generalFns() {
		menuFns.init();
	}

	var hpScroll = function() {
		var $window = $(window),
			lastScrollTop;

		function hpScrollCall() {
			globalVars.window.on({
				'scroll': function() {
					var scrollPos = globalVars.window.scrollTop();


					homepageScrollFns(scrollPos, lastScrollTop);

					//Reset lastScrollTop
					lastScrollTop = scrollPos;
				},
				'scrollstop': function() {
					scrollFns.updateSideMenu(500);
				}	
			});
		}


		function destroy() {
			globalVars.window.off('scroll');
			console.log('killed')
		}
		return {
			callIt: hpScrollCall,
			killIt: destroy
		}
	}();
	function homepageScrollFns(scrollPos, lastScrollTop) {
		scrollFns.getLocation(scrollPos);
		scrollFns.getDirection(scrollPos, lastScrollTop);
		scrollFns.changeItemBg(scrollPos);
		scrollFns.menuColor();
	}
	function homepageGeneralFns() {
		scrollFns.appearFns();
	}
	function hpInit() {
		homepageGeneralFns();
		hpScroll.callIt();
	}





	function getPage() {
		var getPage = $('#wrap').data('page');

		return getPage;
	}



	function init() {
		var page = getPage();

		generalFns();
		if (page == 'hp') {
			hpInit();
		} else if (page == 'proj') {
			projectPage.init();
		}
		
	}

	init();
});
