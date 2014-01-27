/*
  sysAffix Plugin for jQuery
  Version: v0.10

  Copyright (C) 2013-2014 by Systemantics GmbH

  Systemantics GmbH
  Bleichstr. 11
  41747 Viersen
  GERMANY

  Web:    www.systemantics.net
  Email:  hello@systemantics.net

  This plugin is distributed under the terms of the
  GNU Lesser General Public license. The license can be obtained
  from http://www.gnu.org/licenses/lgpl.html.
 */

 (function ($) {
	$.fn.sysAffix = function (options) {
		var els = $(this),
			options = $.extend({
				lockedTop : 0,
				lockedBottom: 0,
				lockedClass: "sys-affix-locked",
				container: els.offsetParent(),
				scrollParent: window
			}, options || {});

		options.container = $(options.container);
		options.scrollParent = $(options.scrollParent);

		function lockTop(bar) {
			if (bar.data("sys-affix.locked")) {
				// Don’t lock if already locked
				return;
			}
			bar
				.data("sys-affix.locked", true)
				.css({
					"left": bar.offset().left+"px",
					"margin-top": 0,
					"position": "fixed",
					"top": options.lockedTop
				})
				.addClass(options.lockedClass);
		}

		function lockBottom(bar) {
			if (bar.data("sys-affix.locked")) {
				// Don’t lock if already locked
				return;
			}
			bar
				.data("sys-affix.locked", true)
				.css({
					"left": bar.offset().left+"px",
					"margin-top": 0,
					"position": "fixed",
					"bottom": options.lockedBottom
				})
				.addClass(options.lockedClass);
		}

		function unlock(bar) {
			if (!bar.data("sys-affix.locked")) {
				// Don’t unlock if not locked
				return;
			}
			bar
				.data("sys-affix.locked", false)
				.css({
					"left": "",
					"margin-top": "",
					"position": "absolute",
					"top": "",
					"bottom": ""
				})
				.removeClass(options.lockedClass);
		}

		// Init
		els
			.addClass("sys-affix")
			.css("position", "absolute")
			.each(function () {
				$(this)
					.data("sys-affix.top", $(this).offset().top);
			});

		var prevVisTop = 0,
			prevDirection = 1;
		options.scrollParent
			.on("scroll", function () {
				var vis = $(this),
					visTop = Math.max(0, Math.min($(document).height() - vis.height(), vis.scrollTop())),
					visBottom = visTop + vis.height(),
					containerTop = (options.container && options.container.offset()) ? options.container.offset().top : 0,
					containerBottom = containerTop + options.container.height(),
					direction = visTop > prevVisTop ? 1 : (visTop < prevVisTop ? -1 : 0),
					directionChanged = prevDirection != direction;

				if (direction == 0) {
					return;
				}

				els.each(function () {
					var bar = $(this),
						barTop = containerTop + parseInt(bar.css("margin-top")),
						barBottom = barTop + bar.height() + options.lockedBottom;

					if (bar.height() > options.container.height()) {
						// Don’t apply effect when bar is higher than container
						return;
					}

					// Ony lock at bottom when visible area is higher than bar
					var lockBottomAllowed = vis.height() <= bar.height();

					if (prevDirection > 0 && direction < 0 && lockBottomAllowed) {
						// Unlock when before was going down and now is going up
						if (bar.data("sys-affix.locked")) {
							unlock(bar);
							bar.css("margin-top", (visBottom - bar.height() - options.lockedBottom - containerTop) + "px");
						}
					} else if (prevDirection < 0 && direction > 0 && lockBottomAllowed) {
						// Unlock when before was going up and now is going down
						if (bar.data("sys-affix.locked")) {
							unlock(bar);
							bar.css("margin-top", (visTop - containerTop + options.lockedTop) + "px");
						}
					} else if (direction > 0 && visBottom >= barBottom && visBottom < containerBottom && lockBottomAllowed) {
						if (!bar.data("sys-affix.locked")) {
							// Lock bottom
							lockBottom(bar);
						}
					} else if (direction < 0 && visTop <= barTop - options.lockedTop && visTop > containerTop) {
						if (!bar.data("sys-affix.locked")) {
							// Lock top
							lockTop(bar);
						}
					} else if (!lockBottomAllowed && visTop + options.lockedTop > barTop && visTop + options.lockedTop + bar.height() < containerBottom) {
						if (!bar.data("sys-affix.locked")) {
							// Lock top with bar less high than visible area
							lockTop(bar);
						}
					} else if (direction < 0 && visTop <= containerTop - options.lockedTop) {
						if (bar.data("sys-affix.locked")) {
							// Unlock on way up when top of container is reached
							unlock(bar);
						}
					} else if (direction > 0 && visBottom >= containerBottom + options.lockedBottom) {
						if (bar.data("sys-affix.locked")) {
							// Unlock on way down when bottom of container is reached
							unlock(bar);
							bar.css("margin-top", (options.container.height() - bar.height()) + "px");
						}
					}
				});

				prevVisTop = visTop;
				prevDirection = direction;
			}).trigger("scroll");

		return els;
	};
})(jQuery);
