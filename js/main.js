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
			//lastPostTop = $lastPost.offset().top,
			//lastPostBtm = lastPostTop + $workItem.height(),
			workInfoColor = $workInfo.css('background-color'),
			$nav = $('.fixed-nav'),
			$wrap = $('#wrap'),
			$sideNavLi = $('#side-nav li');


		return {
			window: $window,
			windowH: windowH,
			workInfo: $workInfo,
			sideNav: $sideNav,
			menuBtn: $menuBtn,
			sideNavW: $sideNavW,
			workItem: $workItem,
			firstPostTop: firstPostTop,
			//lastPostTop: lastPostTop,
			//lastPostBtm: lastPostBtm,
			workInfoColor: workInfoColor,
			nav: $nav,
			wrap: $wrap,
			sideNavLi: $sideNavLi
		}
	}();


	var pageStatus = {
		isAjax: false,
		menuActive: false,
		projMenuActive: false,
		getPage: function() {
			var getPage = $('#wrap').data('page');

			return getPage;
		}
	}


	var commonFns = function() {
		var $viewAllBtn = $('#view-all-btn');

		function disableScroll(obj) {
			obj.addClass('noScroll');
		}
		function enableScroll(obj) {
			obj.removeClass('noScroll');
		}

		function menuIn() {

			disableScroll($('body'));

			globalVars.sideNav.css({
				'left': '0%'
			});


			globalVars.wrap.addClass('menu-clicked');
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
		};

		function menuOut() {
			enableScroll($('body'));
			globalVars.wrap.removeClass('menu-clicked menu-hover');

			globalVars.sideNav.css({
				'left': '-50%'
			});

			globalVars.nav.removeClass('menu-active');

			if (pageStatus.projMenuActive) {
				deactivateProjectMenu(0);
			}
			
			pageStatus.menuActive = false;
			return
		};

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

		function activateProjectMenu() {
			pageStatus.projMenuActive = true;

			globalVars.sideNav.addClass('projectMenu');
			$('#project-side').fadeIn(300, function() {
				staggerInLeft($('#project-side li'), 100)
			});
		}
		function staggerInLeft(obj, delay) {
			obj.each(function(index) {
				var self = $(this),
					moveIn = function() {
						self.removeClass('projLi')
					};

				setTimeout(moveIn, index * delay)
			})
		}
		function staggerOutLeft(obj, delay) {
			obj.each(function(index) {
				var self = $(this),
					moveOut = function() {
						self.addClass('projLi')
					};

				setTimeout(moveOut, index * delay)
			})
		}

		function deactivateProjectMenu(duration) {
			staggerOutLeft($('#project-side li'), 50);
			$('#project-side').fadeOut(duration, function() {
				globalVars.sideNav.removeClass('projectMenu');
			});
			
			pageStatus.projMenuActive = false;
		}

		function menuStyles() {
			var $projLi = $('#project-side li');
			var projAmount;

			function heightCompare() {
				var projLiHeight = $projLi.height();
				projAmount = $projLi.length;
				var totalLiHeight = projLiHeight * projAmount;

				if (totalLiHeight < globalVars.windowH) {
					return true;
				} else if (totalLiHeight > globalVars.windowH){
					return false;
				}
			}

			function restyle() {
				var toRestyle = heightCompare();
				var heightCalc = function() {
					return globalVars.windowH / projAmount;
				}
				if (toRestyle) {
					$projLi.css('height', heightCalc)
				}
			}
			restyle();
		}


		function menuEvents() {
			globalVars.menuBtn.on({
				mouseenter: function(e) {
					var self = $(this);
					var movePercentage = (-100 + (20 / globalVars.sideNavW * 100))/2;

					if (!pageStatus.menuActive) {
						globalVars.wrap.addClass('menu-hover');
						globalVars.sideNav.css({
							'left': movePercentage + '%'
						});
						menuBtnIn(e, self);
					}

				},
				mouseleave: function(e) {
					if (!pageStatus.menuActive) {
						globalVars.wrap.removeClass('menu-hover');
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
					console.log(pageStatus.menuActive)
					if (!pageStatus.menuActive) {
						menuIn();
						globalVars.workInfo.hide();
					} else if (pageStatus.menuActive) {
						menuOut();
						globalVars.workInfo.show();
					} 	
				}	
			});
			globalVars.sideNavLi.on({
				click: function() {
					var self = $(this);
					var index = $('#side-nav li').index(self);
					var currentPage = pageStatus.getPage();

					// general
					menuOut();	

					if (currentPage == 'hp') {
						//hompage only
						homepageFns.toSection(index);

					}
					
				}
			})
			$viewAllBtn.on({
				'click': function(event) {
					event.stopImmediatePropagation();

					if (!pageStatus.projMenuActive) {
						activateProjectMenu();
					} else if (pageStatus.projMenuActive) {
						deactivateProjectMenu();
					}
					
				}
			})
		};

		function init() {
			menuEvents();
			menuStyles();
		}

		return {
			menuIn: menuIn,
			menuOut: menuOut,
			menuEvents: menuEvents,
			init: init
		}

	}();






	var homepageFns = function() {
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
		};

		function menuColor() {
			var $siteTitle = $('.site-title');

			if (insidePosts == false) {
				
				globalVars.nav.removeClass('onDark');

			} else if (insidePosts == true) {
				
				globalVars.nav.addClass('onDark');
			}
		};

		function scrollToSection(index, callback) {
			var selectedTop = $('section').eq(index).offset().top;

			globalVars.window.scrollTop(selectedTop) 

		};

		function updateSideMenu() {
			var sectionAmount = $('section').length - 1,
				$sectionActive = $('section.active'),
				activeIndex = $sectionActive.index(),
				$menuLi = $('#side-nav li');

			console.log(activeIndex, sectionAmount);

			if (activeIndex < 1) {
				$('#side-nav li.active').removeClass('active');
				$menuLi.eq(0).addClass('active');
			} else if (activeIndex > 0 && activeIndex < sectionAmount) {
				$('#side-nav li.active').removeClass('active');
				$menuLi.eq(1).addClass('active');
			} else if (activeIndex == sectionAmount) {
				$('#side-nav li.active').removeClass('active');
				$menuLi.eq(2).addClass('active');
			}
		};

		function changeItemBg(scrollPos) {
			var animationBeginPos = globalVars.firstPostTop,
				animationEndPos = globalVars.lastPostTop,
				beginningColor = new $.Color(globalVars.workInfoColor);
				endingColor = new $.Color('rgb(242, 231, 220)');


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
		};

		function appearFns() {
			$worktext.on('appear', function() {
				$(this).addClass('worktext-fade-in');
			});
			$worktext.appear();
		};

		function panelSnapper() {
			panelOptions = {
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

			$('body').panelSnap(panelOptions);
		};

		function homepageEvents() {
			var lastScrollTop;
			var $viewBtn = $('.view-proj');
			var container;

			//replace this with general function that can be called on menu click also
			$viewBtn.on('click', function() {
				var self = $(this),
					thisIndex = $viewBtn.index(self);

				container = globalVars.workItem.eq(thisIndex);

				var bgColor = container.find('.work-info').css('background-color');

				container.addClass('clicked');
				removeAllOthers(container, self, 600);
				$('body').css('background-color', startBGColor)
			})

			globalVars.window.on({
				'scroll': function() {
					var scrollPos = globalVars.window.scrollTop();


					hpGeneralPos(scrollPos);
					changeItemBg(scrollPos);
					menuColor();

					//Reset lastScrollTop
					lastScrollTop = scrollPos;
				}, 
				'scrollstop': function() {
					updateSideMenu(500);
				}
			})
		}
		function destroy() {
			globalVars.window.off('scroll').off('scrollstop');
		}

		function init() {
			homepageEvents();
			panelSnapper();
			appearFns();
		}
		return {
			toSection: scrollToSection,
			init: init
		}
	}();






	var ajaxFns = function() {

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





	var projectPageFns = function() {

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

	function init() {
		var page = pageStatus.getPage();
		
		if (page == 'hp') {
			console.log('init')
			homepageFns.init();
		} else if (page == 'proj') {
			projectPageFns.init();
		}

		commonFns.init();
	}
	init();
});


