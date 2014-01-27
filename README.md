# jQuery sysAffix – The better affix

## Description

sysAffix keeps a sidebar in view while the main content is scrolling. Unlike many other plugins, sysAffix provides a solution for long sidebars: The sidebar gets scrolled as well! When scrolling towards the bottom of the content, the sidebar sticks with its bottom to the bottom of the window. To reveal the top of the sidebar again, scroll the required amount back towards the top. When scrolling further towards the top, the sidebar becomes sticky again.

Of course, sysAffix (the better affix) also releases the sidebar when either header or footer are reached.

## Demo

Want to see a demo? [Give it a try!](demo.html)

## Out in the wild

A previous version of sysAffix (under the name woohooBar) can be seen on [Community21](http://community21.org/).

## Documentation

Using sysAffix is easy:

	$("#sidebar").sysAffix();

This applies the sysAffix‘s effect to the specified sidebar.

## Recommended HTML structure

The required (or rather: recommended) HTML structure is as simple as possible:

	  <div id="container">
			<aside id="sidebar">
			</aside>
			<div id="main">
			</div>
	  </div>

Other HTML structures are possible, but we recommend to return to the above when you experience problems. In words, the recommended structure could be explained as “the sidebar and content in parallel block elements, wrapped by another block element.”

## Recommended CSS

sysAffix should work with plenty of CSS variations. The only requirement is that the sidebar is `position: absolute`. As this is so important, sysAffix adds this as inline CSS upon initialization.

## Options

sysAffix recognizes several options which are denoted in
curly brackets.

- `lockedTop`: An integer value specifying the number of pixels from top at which the sidebar should reside when sticking to the top. Default: `0`
- `lockedBottom`: An integer value specifying the number of pixels from top at which the sidebar should reside when sticking to the bottom. Default: `0`
- `lockedClass`: A string which denotes the CSS class name (or class names) which should be applied to the sidebar when it is sticky. Default: `sys-affix-locked`
- `container`: A selector, jQuery object or DOM node which refers to the HTML element that should act as the sidebar’s container. The sidebar will never leave the top or bottom boundaries of this element. Default: The sidebar‘s `$.offsetParent()`.
- `scrollParent`: A selector, jQuery object or DOM node to which the plugin‘s scroll event handler will get attached. Default: `$(window)`

## License

This plugin is distributed under the terms of the
GNU Lesser General Public license. The license can be
obtained from [http://www.gnu.org/licenses/lgpl.html](http://www.gnu.org/licenses/lgpl.html).

Copyright &copy; 2013–2014 [Systemantics GmbH](http://www.systemantics.net/)

## Changelog

### v0.10:
 
- Initial release.
