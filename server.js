if (window.self !== window.top) {
	class  fiddleConsole extends HTMLElement{
		constructor (){
			super();

			this.attachShadow({mode: "open"});

		}
	}
	customElements.define("myfiddle-console", fiddleConsole);
	var myfiddleConsoleEl = document.createElement("myfiddle-console");
	myfiddleConsoleEl.style.cssText = "all: initial !important";
	document.body.appendChild(myfiddleConsoleEl);

	var isProdMode = location.origin === "https://hassen-github.github.io" ? true : false;
	/*
	"data": {
            "base": "vs",
            "inherit": true,
              "colors": {
                "editor.foreground": "#3B3B3B",
                "editor.background": "#FFFFFF",
                "editor.selectionBackground": "#BAD6FD",
                "editor.lineHighlightBackground": "#00000012",
                "editorCursor.foreground": "#000000",
                "editorWhitespace.foreground": "#BFBFBF"
              }
        },
	*/
	function generateConsoleStyleSheet(currentTheme, returnCss) {
		if (currentTheme) {
		  var themeForeGround = currentTheme.colors["editor.foreground"];
		  var themeBackground = currentTheme.colors["editor.background"];
		  var themeSelectionBackground = currentTheme.colors["editor.selectionBackground"];
		  var themeLineHighlightBackground = currentTheme.colors["editor.lineHighlightBackground"];
		  var themeCursorForeground = currentTheme.colors["editorCursor.foreground"];
		  var themeWhitespaceForeground = currentTheme.colors["editorWhitespace.foreground"];
	
	
		  var isDarkColor = currentTheme.base.indexOf("dark") > -1;
		  var eraseIcon = currentTheme.base.indexOf("dark") > -1 ? "erase_white.png" : "erase.png";
		  var crossIcon = currentTheme.base.indexOf("dark") > -1 ? "cross_white.png" : "cross.png";
		  var arrowRight = currentTheme.base.indexOf("dark") > -1 ? "arrow-right_white.png" : "arrow-right.png";
		  var arrowDown = currentTheme.base.indexOf("dark") > -1 ? "arrow-down_white.png" : "arrow-down.png";
		  var cssText = `
				******START Console panel******/
	
				#console-panel.console-panel .dev-tools-icon-container,
				#console-panel.console-panel .dev-tools-icon-container *,
				#console-panel.console-panel .dev-tools-console,
				#console-panel.console-panel .dev-tools-console * {
					font-family: monospace ;
				}
	
				#console-panel.console-panel .dev-tools-header,
				#console-panel.console-panel .dev-tools-header * {
					font-family: sans-serif ;
				}
	
				#console-panel.console-panel .dev-tools-icon-container {
					position: fixed ;
					z-index: 2000000001 ;
				}
				#console-panel.console-panel .dev-tools-icon-container-left-top,
				#console-panel.console-panel .dev-tools-icon-container-top-left {
					top: 20px ;
					left: 20px ;
				}
				#console-panel.console-panel .dev-tools-icon-container-top-right,
				#console-panel.console-panel .dev-tools-icon-container-right-top {
					top: 20px ;
					right: 20px ;
				}
				#console-panel.console-panel .dev-tools-icon-container-bottom-left,
				#console-panel.console-panel .dev-tools-icon-container-left-bottom {
					bottom: 20px ;
					left: 20px ;
				}
				#console-panel.console-panel .dev-tools-icon-container-bottom-right,
				#console-panel.console-panel .dev-tools-icon-container-right-bottom {
					right: 20px ;
					bottom: 20px ;
				}

				#console-panel.console-panel .dev-tools-icon-container-bottom-right, #console-panel .dev-tools-icon-container-right-bottom{
		  		  display:none !important;
		  	  	}
	
				#console-panel.console-panel .dev-tools-icon {
					width: 32px ;
					height: 32px ;
					line-height: 35px;  /* Keeping height a little more than height, so that it looks better middle-aligned (since we are going to render numbers inside it) */
					border-radius: 999px ;
				
					cursor: pointer ;
				
					text-align: center ;
					font-size: 14px ;
				
					/* This may help in improving CPU usage for some of the animations */
					transform: translateZ(0) ;
				}
	
	
				#console-panel.console-panel .dev-tools-icon.no-unread-messages {
					/* https://github.com/mozilla/gecko-dev/blob/7aef56cc4e682e5c99fcc282f30abbf8212efd50/devtools/client/definitions.js */
					/* chrome://devtools/skin/images/tool-webconsole.svg */
					/*background-image: url("data:image/svg+xml;base64,	PCEtLSBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljCiAgIC0gTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3	YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcwogICAtIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uIC0tPgo8c3ZnIHdpZHRoPSIxNiIgaGVpZ2h0	PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImNvbnRleHQtZmlsbCAjMGIwYjBiIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogIDxwYXRo	IGQ9Ik0xNCA0VjNIMnYxaDEyem0wIDF2OEgyVjVoMTJ6TTEgMy4wMDJDMSAyLjQ1IDEuNDUgMiAyLjAwNyAyaDExLjk4NkExLjAxIDEuMDEgMCAwIDEgMTUgMy4wMDJ2OS45OTZDMTUgMTMuNTUgMTQuNTUg	MTQgMTMuOTkzIDE0SDIuMDA3QTEuMDEgMS4wMSAwIDAgMSAxIDEyLjk5OFYzLjAwMnoiLz4KICA8cGF0aCBkPSJNNC4wOSA3Ljg1OWwyLjA2MiAyLS4wMDYtLjcxMy0yLjA2MSAyLjA2MmEuNS41IDAgMCAw	IC43MDcuNzA3bDIuMDYyLTIuMDYxYS41LjUgMCAwIDAtLjAwNi0uNzEzbC0yLjA2MS0yYS41LjUgMCAxIDAtLjY5Ny43MTh6Ii8+Cjwvc3ZnPg==");*/
					background-repeat: no-repeat ;
					background-position: center center ;
				
					opacity: 0.5 ;
				}
				#console-panel.console-panel .dev-tools-icon.no-unread-messages:hover {
					opacity: 1 ;
				}
	
				#console-panel.console-panel .dev-tools-icon                         {   background-color: #e7e7e7;  box-shadow: inset 0 0 15px 1px #979797; }
				#console-panel.console-panel .dev-tools-icon:hover                   {   background-color: #d0d0d0;                                              }
				#console-panel.console-panel .dev-tools-icon.found-something,
				#console-panel.console-panel .dev-tools-icon.found-log               {   background-color: #d3d3d3;  box-shadow: inset 0 0 15px 1px #777;    }
				#console-panel.console-panel .dev-tools-icon.found-something:hover,
				#console-panel.console-panel .dev-tools-icon.found-log:hover         {   background-color: #b9b9b9;                                              }
				#console-panel.console-panel .dev-tools-icon.found-info              {   background-color: #dad4dd;  box-shadow: inset 0 0 15px 1px #6e61bf; }
				#console-panel.console-panel .dev-tools-icon.found-info:hover        {   background-color: #cbb6d6;                                              }
				#console-panel.console-panel .dev-tools-icon.found-warn              {   background-color: #ffea83;  box-shadow: inset 0 0 15px 1px #f8981b; }
				#console-panel.console-panel .dev-tools-icon.found-warn:hover        {   background-color: #f9d626;                                              }
				#console-panel.console-panel .dev-tools-icon.found-error             {   background-color: #ffc5c5;  box-shadow: inset 0 0 15px 1px #ff5858; }
				#console-panel.console-panel .dev-tools-icon.found-error:hover       {   background-color: #fc9292;  box-shadow: inset 0 0 15px 1px #f00;    }
	
				#console-panel.console-panel .dev-tools-icon.found-error {
					/* Limiting the animation to 5 times. Otherwise, the CSS animation may cause high CPU usage. */
					animation: console-panel-animation-notify-error 3s 5 ;
				}
				@keyframes console-panel-animation-notify-error {
					50% {
						background-color: #ffa500 ;
						box-shadow: inset 0 0 15px 1px #f00 ;
					}
				}
	
				#console-panel.console-panel .dev-tools-icon-container .strong-notification:before,
				#console-panel.console-panel .dev-tools-icon-container .strong-notification:after {
					display: block ;
					content: '' ;
					position: absolute ;
					top: 0; right: 0; bottom: 0; left: 0 ;
					border-radius: 50% ;
					z-index: -1 ;
				}
	
				#console-panel.console-panel .dev-tools-icon-container .strong-notification:before { background-color: rgba(255, 0, 0, 0.5); }
				#console-panel.console-panel .dev-tools-icon-container .strong-notification:after  { background-color: rgba(255,177,0, 0.5); }
	
				/* To ensure that the CSS animation does not cause high CPU usage, we remove
				   the "strong-notification" class via JavaScript, once it is not required
				   anymore. */
				#console-panel.console-panel .dev-tools-icon-container .strong-notification:before { animation: console-panel-animation-ripple 0.75s ease-in  infinite; }
				#console-panel.console-panel .dev-tools-icon-container .strong-notification:after  { animation: console-panel-animation-ripple 0.75s ease-out infinite; }
	
				/* https://stackoverflow.com/questions/32955459/rings-with-ripple-animation-css-only/32955876#32955876 */
				@keyframes console-panel-animation-ripple {
					0% {
						top:    0px ;
						right:  0px ;
						bottom: 0px ;
						left:   0px ;
					}
					25% {
						top:    -10vh ;
						top:    -10vmin ;
						right:  -10vh ;
						right:  -10vmin ;
						bottom: -10vh ;
						bottom: -10vmin ;
						left:   -10vh ;
						left:   -10vmin ;
						opacity: 0.5 ;
					}
					90% {
						opacity: 0.2 ;
					}
					100% {
						top:    -20vh ;
						top:    -20vmin ;
						right:  -20vh ;
						right:  -20vmin ;
						bottom: -20vh ;
						bottom: -20vmin ;
						left:   -20vh ;
						left:   -20vmin ;
						opacity: 0 ;
					}
				}
	
				#console-panel.console-panel .dev-tools {
					width: 100% ;
				
					/* Values much higher than this may not work so well in different mobile device orientation since the "vh"/"vmin" might be calculated
					   w.r.t. full-screen size, while the toolbar is also visible (which eats some of that height) */
					color: ${themeForeGround} ;
					/* A mix and match of font-family names from Chrome DevTools (ui/inspectorStyle.css) */
					font-family: 'Segoe UI', '.SFNSDisplay-Regular', 'Helvetica Neue', 'Lucida Grande', Roboto, Ubuntu, Tahoma, Arial, sans-serif ;
					font-size: 13px ;
					height:100%;
					flex-direction: column;
				}
	
				#console-panel.console-panel .dev-tools-header {
					height: 20px;
					line-height: 20px;
					background-color: #FFFFFF;
					padding: 2px 0px 2px 6px;
					border-bottom: 1px solid #d0d0d0;
					border-top: 1px solid #d0d0d0;
					font-size: 12px;
					display: flex;
					align-items: center;
				}
	
				#console-panel.console-panel .dev-tools-clear-console-icon {
					width: 13px ;
					height: 13px ;
					background-image: url("${isProdMode ? "https://hassen-github.github.io/myfiddlepreview/":"http://localhost/myfiddlepreview/"}assets/${eraseIcon}") ;
					float: left ;
					background-size: contain ;
					opacity: 0.5 ;
					margin-right: 5px ;
					margin-top: 7px ;
					cursor: pointer ;
					order: 1 ;
					margin: 0 10px 0 0 ;
				}
				#console-panel.console-panel .dev-tools-clear-console-icon:hover {
					opacity: 0.85 ;
				}
	
				#console-panel.console-panel .dev-tools-header > :nth-child(3) {
					flex-grow: 1 ;
					order: 2 ;
				}
	
	
				#console-panel.console-panel .dev-tools-header-cross-icon,
				#console-panel.console-panel .dev-tools-header-disable-icon {
					float: right ;
					cursor: pointer ;
					width: 13px ;
					height: 13px ;
					opacity: 0.5 ;
					background-repeat: no-repeat ;
					height: 24px ;
					display: none;
				}
	
				#console-panel.console-panel .dev-tools-header-cross-icon {
					width: 30px ;
				
					/* Source: chrome-devtools://devtools/bundled/Images/largeIcons_2x.png (in Google Chrome browser) */
					background-image: url("${isProdMode ? "https://hassen-github.github.io/myfiddlepreview/":"http://localhost/myfiddlepreview/"}assets/${crossIcon}") ;
					background-position: 9px 8px ;
					background-size: 10px 10px ;
					order: 3 ;
				}
	
				#console-panel.console-panel .dev-tools-header-disable-icon {
					width: 20px ;
				
					/* Source: https://www.iconfinder.com/icons/1608429/off_power_icon */
					/*background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/	PjxzdmcgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB3aWR0aD0iMTc5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTY2NCA4OTZxMCAxNTYt	NjEgMjk4dC0xNjQgMjQ1LTI0NSAxNjQtMjk4IDYxLTI5OC02MS0yNDUtMTY0LTE2NC0yNDUtNjEtMjk4cTAtMTgyIDgwLjUtMzQzdDIyNi41LTI3MHE0My0zMiA5NS41LTI1dDgzLjUgNTBxMzIgNDIgMjQu	NSA5NC41dC00OS41IDg0LjVxLTk4IDc0LTE1MS41IDE4MXQtNTMuNSAyMjhxMCAxMDQgNDAuNSAxOTguNXQxMDkuNSAxNjMuNSAxNjMuNSAxMDkuNSAxOTguNSA0MC41IDE5OC41LTQwLjUgMTYzLjUtMTA5	LjUgMTA5LjUtMTYzLjUgNDAuNS0xOTguNXEwLTEyMS01My41LTIyOHQtMTUxLjUtMTgxcS00Mi0zMi00OS41LTg0LjV0MjQuNS05NC41cTMxLTQzIDg0LTUwdDk1IDI1cTE0NiAxMDkgMjI2LjUgMjcwdDgw	LjUgMzQzem0tNjQwLTc2OHY2NDBxMCA1Mi0zOCA5MHQtOTAgMzgtOTAtMzgtMzgtOTB2LTY0MHEwLTUyIDM4LTkwdDkwLTM4IDkwIDM4IDM4IDkweiIvPjwvc3ZnPg==");*/
					background-size: 14px 14px ;
					background-position: 3px 6px ;
				}
	
				#console-panel.console-panel .dev-tools-header-cross-icon:hover,
				#console-panel.console-panel .dev-tools-header-disable-icon:hover {
					opacity: 0.75 ;
				}
	
				#console-panel.console-panel .dev-tools-console {
					clear: both;
					overflow: hidden;
					width: 100%;
					flex-grow: 1;
				}
	
				#console-panel.console-panel .dev-tools-console-body {
					overflow: auto ;
				}
	
				#console-panel.console-panel .dev-tools-console-message-wrapper {
					line-height: 13px ;
					border-top: 1px solid transparent ;
					border-bottom: 1px solid #f0f0f0 ;
					line-height: 17px ;
					padding: 3px 22px 1px 0 ;
				}
	
				/* This helps in ensuring that the texts show proper whitespace (also useful in showing function definitions) */
				#console-panel.console-panel .dev-tools-console-message > span {
					white-space: pre-wrap ;
				}
	
				#console-panel.console-panel .log-mode-info,
				#console-panel.console-panel .log-mode-warn,
				#console-panel.console-panel .log-mode-error,
				#console-panel.console-panel .log-mode-window-onerror {
					background-repeat: no-repeat ;
				}
	
				#console-panel.console-panel .log-mode-info {
					/* chrome-devtools://devtools/bundled/Images/smallIcons_2x.png */
					background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP	+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gsKDw81VUJejQAAAsxJREFUOMutVFtLVFEU/	vbex5lxjjIqlWVXsKQL4UORRb0WJZSKmQVRD0UE9hLRjSDqqRtdXnqpH1BvXpDeoiBIgyYyGcuCUuli6ejczzmzL6uHypzRJNDvae+1v/	Wtb7FZi2EaNDVFfCNwG7Q0dZ4yNcqYCqUIWpmvWZdeKCPbgsnRtkhkXzY/l+UHag/2NHpS34prWuYSYPIJ2kA5CpmYO5h15ckfPTtaJz	+Lv65IVNXsvTGe1XdGFYUkAAJQFrJQu60UyYxBIq0BzsB9Ar5iXwmImkXRftsZWfkYeEoAYP0RpFDftR9pdSom/3oSguHBldVYssCHeEphZ0vklygAxhjseTaY4Ke12kTxfpwFAA4AB46/	bYy66lQsm9ugHeBYPN8HAAgVWaj4fZ6MYGkh7DL7TLDyUT0AiKZLEZ+KU+dgKluST/YkQWrCsoV+dD4bQ+uT6HR/CL9dgPS4s9Ur33OXHTrR3zwQcx+OOiqHJDiDXchzYmnXQGuaVjQxksG3gfg	+iwH1cU9PIVQuDaD15pqc2JHLH9Ddm5xW0C7xgzPUcUeZzdJMrfp+0MG6va8wNOzhfyAKBCy/2MIVUTnmCJaPL+IgzBkYMcMtwYbnSlBKPcwDgnUVcDZrMS01lGeec0ZoD/	mtWQumYy4MmQ7ul6nWeYXWAJuFSTKExIgzpIudDhEO3zPVm1qGGKE5NWmOly/y4/7FVVi+MAAhflWrripCcVAg/DaVIxgfTlMm6RyW/Q19E74aj0auf0tnT/+Z52CAo7rKnuLm+5jEx8/uxD0z7iL6NXE1	+W7X+Zxts37J2nN6sJcEsTNjUiPjGnS9Sc7YZibqUCrqXE++e3Hhnwt298E39Wmpbye0WeESweRRyBB0RsKNuZ88T538/np7+4wbGwA2HHtZEBpDvZSoc43ZrI2p0NJASvqisrpbKt1eporbw+GNMj/	3Jz2CZsrrkClGAAAAAElFTkSuQmCC") ;
					background-size: 11px 11px ;
					background-position: 7px 4px ;
				
					/*background-color: #edebfb ;
					border-bottom-color: #e5e1ff ;*/
				}
	
				#console-panel.console-panel .log-mode-warn {
					/* chrome-devtools://devtools/bundled/Images/smallIcons_2x.png */
					background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP	+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gsKDwIt84C4lgAAAbFJREFUOMudlLtOG0EUhr9dr9esL7uz4MvKSkIRiZKaDvECeYRADSjCBmoeIZKL1IZHSIMrEzp3kVKCEJcgCHgxdizLyN	g4RbhkYXfWZLqZc+afb/45ZxRCxu4XPqQtygBui4XZRb7K8hVZsFbCFBnO3mZJAPy8pNOsk5/5xO+gPapMcBCjmBv/KwaQGycxiFH8L8JaCdPKcv4uQ/	zf9dM63bNz8nMFmq8i7OusOsIrBpCzMWIGhVcRPtClDOLNtjcmUtDpBlNqfoK3UYqOIH5yAdMfh57Yjy2FSQfjqkkB2Ai9cq2EmbZZ16PBxkc1mBCs73xGhAoGeTeql+pzugnBmowujFKV0UUiMOh3n	+qy3yUSkVOqMjqRAvdk93HuHn/DTskpVZl3VhLcw8rjvH5UwUzKvVSD6Ib3Rdpzt5/Kqb6Nch8LolTDXnYqs0enqtCpKkxl90NfXPHr2SGjDcWnx7W7MVYd21/s4NS/U96/8doCkLUx3BYrmpVgSddG/	CAlOboGIsmyJvtxbBO+l73htJCepWqNNvPA5piO7ZdhJb1Xvu3Dr8bLvJse1402838AjWeMl7yfz78AAAAASUVORK5CYII=") ;
					background-size: 10px 10px ;
					background-position: 7px 5px ;
				
					/*background-color: #fffbe5 ;
					border-bottom-color: #fff5c2 ;*/
				}
	
				#console-panel.console-panel .log-mode-error,
				#console-panel.console-panel .log-mode-window-onerror {
					background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP	+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gsKDxgoM8e2wgAAAxlJREFUOMudlMtPE1EUxr97Z	+ZOh0I7pTxKwbZAjCaNxhijkBiNbowx8hD1D1DDgvhCMJq4cYuCGjUuXOAejAKJKxMJmCgmLkyMGjGA5WGRVx9IKcPMHRdg40B56Fmec88v557vu5cgTbQFwZQpVk1Ns1Jmyj6BMi8AGFz7saDNvzNM0pHM0	zpOf4K2spesTLwoyKyRRXbH4/T4XBkuMIFZ6pqhITIXQXg2HEouJuuPh+efpwW2AUKmX23y2PMbCh0FoIRgveAmx+hsGBO/Jm+/C0Wu3wQ4AIh/DjhKPU1bsvIb8pRsbCYoofA5CqFIylUiyiYGxq	+lJny53V+TIzufFmW48T8xMjeFyWS0+kj/SAdtCwaZLCot3gyX5ZDtRAWoS109mUuF7USFJVdkd0Nhyv22YJAJdd6ckx6b85ydsr9glchsvAxWvhdady/	MZDIFcz5oge3YUfBIFPqXr8tCEFAqOnWy8JEKEqtyiDarkq96oA8MQigphvPRPVC3G1RV4bjfDKGkGEZoGFrPa0uPQ7JBFFgl6SsvGyqFElh1NVWF40EzxNISGKOjgM4hBHwwQsOInb8CPj2zah3feGKQSlT	KT2uLaBTxC43Qv4cgFBUtwUbH1oQBgCyyAgpBWldBsolMqiIwTrnExtP6bPnKQsAPY2RsedJCOB+2gLrT24uL0jjlTH6rU7r2/kLDiNVdQryufkkovy8tVKcEBpPfUCLKnfNMthTZ4YNLsMEhxOoug0/	PLO30YiOMwSEIfh/Ywf2WnoQsg4qsi7yvrZXEn/F+7+REgJimxdhady94JLrK2OzQASSfdaVyJiEIu3OHRRvfSgDgw6kz1fZfsWdqdOa/nl5MzTbjmc6q3e2tXRQAdrW3Pk+oObfnHOo/w	+ayVCTU3Kbd7a1dAJBSY+e2guvxvC23YjlemJRsCDIpRTzXa8Y9vqYd2zw31jTV57MNVdD0u/aZ8YA8G4WwaP2UDYlhIUtFIjt/iIusPvikuXNDl76vrZUU5FZRwitJcqFM0DXvss/GDFnpM4nZOW9Od+55/	HhxZe9vO6ohHl8Nk3cAAAAASUVORK5CYII=") ;
					background-size: 11px 11px ;
					background-position: 7px 5px ;
				
					background-color: ${themeBackground} ;
					border-bottom-color: ${themeSelectionBackground} ;
				}
	
				#console-panel.console-panel .log-mode-info {	
					background-color: ${currentTheme.base == 'vs-dark' ? '#edebfb0f' : '#edebfb6b'} ;
				}
	
				#console-panel.console-panel .log-mode-warn  {
					background-color: ${currentTheme.base == 'vs-dark' ? '#fffbe50f' : '#fffbe56b'} ;
				}
				#console-panel.console-panel .log-mode-unhandled  {
					background-color: ${currentTheme.base == 'vs-dark' ? '#efffff0f' : '#efffff6b'} ;
				}
	
				/*******************/
	
				#console-panel.console-panel .log-mode-unhandled,
				#console-panel.console-panel .log-mode-log,
				#console-panel.console-panel .log-mode-info,
				#console-panel.console-panel .log-mode-warn{
					position:relative;
					color: ${currentTheme.base == 'vs-dark' ? '#ffa6a3' : '#df211b'} ;
					background-color: ${themeBackground};
					border-bottom-color: ${themeSelectionBackground} ;
				}
	
				#console-panel.console-panel .log-mode-unhandled .dev-tools-console-message *,
				#console-panel.console-panel .log-mode-log .dev-tools-console-message *,
				#console-panel.console-panel .log-mode-info .dev-tools-console-message *,
				#console-panel.console-panel .log-mode-warn .dev-tools-console-message *{
					color: ${currentTheme.base == 'vs-dark' ? '#ffa6a3' : '#df211b'} ;
				}

				#console-panel.console-panel .dev-tools-console-message {
					margin-left: 24px ;
					word-wrap: break-word ;
					font-family: monospace ;
				}
	
	
				#console-panel.console-panel .dev-tools-console-message-code-line {
					float: right ;
				}
	
				#console-panel.console-panel .log-call-stack {
					white-space: pre-wrap ;
				}
	
				#console-panel.console-panel .log-value-window-onerror {
					color: ${currentTheme.base == 'vs-dark' ? '#ffa6a3' : '#df211b'} ;
				}
	
				#console-panel.console-panel .log-value-unknown {
					color: #000 ;
				}
	
				#console-panel.console-panel .log-value-boolean,
				#console-panel.console-panel .log-value-number {
					color: #1c00cf ;
				}
	
				#console-panel.console-panel .log-value-null,
				#console-panel.console-panel .log-value-undefined,
				#console-panel.console-panel .log-value-console-clear {
					color: #808080 ;
				}
	
				#console-panel.console-panel .log-value-console-clear {
					font-style: italic ;
				}
	
				#console-panel.console-panel .log-value-string:before,
				#console-panel.console-panel .log-value-string:after {
					content: '"' ;
					color: #222 ;
				}
				#console-panel.console-panel .log-value-string {
					color: ${currentTheme.base == 'vs-dark' ? '#ffa6a3' : '#df211b'} ;
				}
	
				#console-panel.console-panel .log-value-dom-text:before,
				#console-panel.console-panel .log-value-dom-text:after {
					color: #888 ;
					font-style: italic ;
				}
				#console-panel.console-panel .log-value-dom-text:before {
					content: '#text "' ;
				}
				#console-panel.console-panel .log-value-dom-text:after {
					content: '"' ;
				}
	
				#console-panel.console-panel .log-value-dom {
					color: #881280 ;
				}
	
				/* This helps in keeping the console-panel-expand-collapse icon together with the highlighted
				   code (for example when multiple items are logged via single console.log()) */
				#console-panel.console-panel .log-value-dom {
					display: inline-block ;
				}
				/* But, the above rule may cause the console-panel-expand-collapse icon to move to the next
				   line even when it is the first child, but that case may be better to ignore (to avoid
				   that extra line). For example: when we log an element which contains huge HTML code, which
				   would need to get wrapped */
				#console-panel.console-panel .dev-tools-console-message .log-value-dom:first-child {
					display: inline ;
				}
	
				#console-panel.console-panel .jsoneditor-not-available.log-value-array,
				#console-panel.console-panel .jsoneditor-not-available.log-value-object {
					color: #808080 ;
				}
				#console-panel.console-panel .jsoneditor-not-available.log-value-array:before,
				#console-panel.console-panel .jsoneditor-not-available.log-value-object:before {
					color: rgb(33, 33, 33) ;
				}
				#console-panel.console-panel .jsoneditor-not-available.log-value-array:before {
					content: 'Array ' ;
				}
				#console-panel.console-panel .jsoneditor-not-available.log-value-object:before {
					content: 'Object ' ;
				}
	
				/* CSS fixes for JSON Editor */
				#console-panel.console-panel div.jsoneditor-menu {
					display: none ;
				}
				#console-panel.console-panel div.jsoneditor-outer {
					margin-top: 0 ;
					padding-top: 0 ;
				}
				#console-panel.console-panel div.jsoneditor {
					border-width: 0 ;
				}
				#console-panel.console-panel div.jsoneditor-tree div.jsoneditor-tree-inner {
					padding-bottom: 0 ;
				}
	
				/* Without this, a scroll seems to come up */
				#console-panel.console-panel div.jsoneditor-tree {
					display: inline ;
				}
	
				#console-panel.console-panel .jsoneditor,
				#console-panel.console-panel .jsoneditor-outer,
				#console-panel.console-panel .jsoneditor-tree-inner,
				#console-panel.console-panel .jsoneditor-outer > .jsoneditor-tree,
				#console-panel.console-panel .jsoneditor-outer > .jsoneditor-tree > .jsoneditor-tree-inner > .jsoneditor-tree {
					display: inline ;
				}
	
				/* This style may be useful in older browsers */
				#console-panel.console-panel div.jsoneditor-value.jsoneditor-array,
				#console-panel.console-panel div.jsoneditor-value.jsoneditor-object {
					min-width: unset ;
				}
	
	
				#console-panel.console-panel div.jsoneditor-value {
					width: max-content ;
				}
	
				#console-panel.console-panel div.jsoneditor-tree button.jsoneditor-button,
				#console-panel.console-panel div.jsoneditor-tree button.jsoneditor-button.jsoneditor-expanded {
					background-position: center ;
					border-radius: 100% ;
					padding: 6px ;
					cursor: pointer ;
					margin-right: 4px ;
					background-color: ${currentTheme.base == 'vs-dark' ? '#8787874a' : 'transparent'} ;
				}
	
				#console-panel.console-panel div.jsoneditor-tree button.jsoneditor-button {
					width: 10px ;
					height: 10px ;
					background-repeat: no-repeat ;
				
					/* chrome-devtools://devtools/bundled/Images/treeoutlineTriangles.png */
					background-image: url("${isProdMode ? "https://hassen-github.github.io/myfiddlepreview/":"http://localhost/myfiddlepreview/"}assets/${arrowRight}") ;
				}
	
				#console-panel.console-panel div.jsoneditor-tree button.jsoneditor-button.jsoneditor-expanded {
					/* chrome-devtools://devtools/bundled/Images/treeoutlineTriangles.png */
					background-image: url("${isProdMode ? "https://hassen-github.github.io/myfiddlepreview/":"http://localhost/myfiddlepreview/"}assets/${arrowDown}") ;
				}
	
	
				#console-panel.console-panel div.jsoneditor-readonly,
				#console-panel.console-panel div.jsoneditor-value {
					padding: 0 ;
					margin: 0 ;
				}
	
				#console-panel.console-panel div.jsoneditor-field,
				#console-panel.console-panel div.jsoneditor-readonly,
				#console-panel.console-panel div.jsoneditor-value {
					min-height: 0px ;
					min-width: 0px;    /* Useful for keeping widths for property names as small as possible */
				}
	
				#console-panel.console-panel .jsoneditor-schema-error,
				#console-panel.console-panel div.jsoneditor td,
				#console-panel.console-panel div.jsoneditor textarea,
				#console-panel.console-panel div.jsoneditor th,
				#console-panel.console-panel div.jsoneditor-field,
				#console-panel.console-panel div.jsoneditor-value {
					font-size: 11px ;
					font-family: monospace ;
				}
	
	
				#console-panel.console-panel div.jsoneditor td.jsoneditor-tree {
					vertical-align: middle ;
				}
	
	
				/* Begin: Styles to make JSON Editor match Chrome DevTools UI */
				#console-panel.console-panel div.jsoneditor-field {
					color: ${currentTheme.base == 'vs-dark' ? '#f1b5f5' : '#881391' } ;
				}
	
				#console-panel.console-panel div.jsoneditor-value.jsoneditor-string {
					color: #c41a16 ;
				}
	
				#console-panel.console-panel div.jsoneditor-value.jsoneditor-string:before,
				#console-panel.console-panel div.jsoneditor-value.jsoneditor-string:after {
					content: '"' ;
					color: #222 ;
				}
	
				#console-panel.console-panel div.jsoneditor-empty {
					border-width: 0 ;
				}
	
				#console-panel.console-panel .jsoneditor-expandable .jsoneditor-readonly {
					text-transform: capitalize ;
					color: ${themeForeGround} ;
				}
	
				#console-panel.console-panel div.jsoneditor-tree button.jsoneditor-button:focus {
					background-color: ${currentTheme.base == 'vs-dark' ? '#8787874a' : 'transparent'} ;
					outline: none ;
				}
	
				/* End */
	
	
				/* Begin: Styles to make Prism JS match Chrome DevTools */
				#console-panel.console-panel .only-first-line-of-code code.language-markup:after {
					content: 'Ã¢â‚¬Â¦' ;
				}
	
				#console-panel.console-panel pre.language-markup {
					background-color: transparent ;
					padding: 0 ;
					margin: 0 ;
				
					display: inline-block ;
				}
				/* End */
	
	
				#console-panel.console-panel .all-lines-of-code {
					display: inline-block ;
				}
	
				#console-panel.console-panel .console-panel-expand-collapse {
					display: inline-block ;
					width: 10px ;
					height: 10px ;
				}
	
				#console-panel.console-panel .console-panel-expand-collapse.console-panel-collapsed,
				#console-panel.console-panel .console-panel-expand-collapse.console-panel-expanded {
					cursor: pointer ;
					background-repeat: no-repeat ;
				}
				#console-panel.console-panel .console-panel-expand-collapse.console-panel-expanded {
					background-image: url("${isProdMode ? "https://hassen-github.github.io/myfiddlepreview/":"http://localhost/myfiddlepreview/"}assets/${arrowDown}") ;
					background-position: 0px 2px ;
				}
	
				#console-panel.console-panel .console-panel-expand-collapse.console-panel-collapsed {
					background-image: url("${isProdMode ? "https://hassen-github.github.io/myfiddlepreview/":"http://localhost/myfiddlepreview/"}assets/${arrowRight}") ;
				}
	
				#console-panel.console-panel .only-first-line-of-code {
					vertical-align: top ;
					vertical-align: text-top ;
				}
				#console-panel.console-panel .all-lines-of-code {
					vertical-align: top ;
				}
				#console-panel.console-panel code[class*="language-"],
				#console-panel.console-panel pre[class*="language-"] {
					white-space: pre-wrap ;
					word-break: break-word ;
				}
	
				/* Begin: Useful styles when Prism JS is not available */
				#console-panel.console-panel .log-value-dom .all-lines-of-code pre,
				#console-panel.console-panel .log-value-dom .only-first-line-of-code pre {
					display: inline ;
				}
				/* End */
	
				/* Begin: Match Prism JS with DevTools style */
				#console-panel.console-panel code[class*="language-"],
				#console-panel.console-panel pre[class*="language-"] {
					font-family: monospace ;
				}
	
				#console-panel.console-panel .token.tag {
					color: #881280 ;
				}
				#console-panel.console-panel .token.attr-name {
					color: #994500 ;
				}
	
				#console-panel.console-panel .token.attr-value {
					color: #1a1aa6 ;
				}
	
				#console-panel.console-panel .token.comment {
					color: #236e25 ;
				}
				/* */
	
	
				/* Begin: Resize related CSS */
				#console-panel.console-panel .dev-tools-resize-handle {
					top: 0 ;
					height: inherit ;
					padding-top: inherit ;
					padding-bottom: inherit ;
					position: absolute ;
					width: 100% ;
					left: 0 ;
					display: block ;
				}
				/* End */
	
				/***********************/
	
				.dev-tools-console-body {
					max-height: calc(100% - 30px) ;
				}
	
				#console-panel.console-panel input#console-input {
					height: 28px ;
					width: calc(100% - 11px);
					border: none ;
					margin: 0 ;
					padding: 1px 1px 1px 10px ;
					color: ${themeForeGround} ;
					box-shadow: 0 0 2px 0px ${themeCursorForeground} ;
					background-color:${themeBackground};
					outline:none;
					z-index: 1;
    				position: relative;
				}

				#console-panel.console-panel input#console-input:focus,
				#console-panel.console-panel input#console-input:focus-visible{
					border-bottom: 1px solid ${themeCursorForeground};
				}

				form#console-input-form::before {
				    content: '>';
				    position: absolute;
					color: ${themeForeGround} ;
				    left: 0;
				    top: 50%;
				    z-index: 2;
				    transform: translateY(-50%);
				    line-height: 15px;
				    display: flex;
				    font-size: 15px;
				    font-family: monospace;
					opacity:0.5;
				}

				form#console-input-form {
					position: relative;
					margin:0px;
				}

	
				#console-panel.console-panel {
					position: fixed ;
					width: 100% ;
					left: 0px ;
					bottom: 1px ;
					box-shadow: 0px 0px 5px 0px #d0d0d0 ;
					background-color: ${themeBackground} ;
					display: flex;
    				flex-direction: column;
    				overflow: hidden ;
    				height: 400px ;
					max-height:100%;
				}
	
				#console-panel.console-panel .log-call-stack {
					display: none ;
				}
	
				#console-panel.console-panel .dev-tools-console-message-code-line {
					display: none ;
				}

				#console-panel.console-panel. td.jsoneditor-tree {
					line-height:11px;
				}
				
				#console-panel.console-panel .dev-tools-console-message {
					display: flex;
					align-items: center;
				}
	
				/******END Console panel******/
				`
		  if (returnCss){
			return cssText;
		  }
		  else{
			let shadowRoot = myfiddleConsoleEl.shadowRoot;

			let styleEl = document.createElement("style");
			styleEl.textContent = generateConsoleStyleSheet(window.currentTheme, true);
			shadowRoot.appendChild(styleEl);

			var styleSheetEl = shadowRoot.querySelector("style#console-stylesheet");
		  	if (styleSheetEl) {
				styleSheetEl.remove();
		  	}
		  
		  	styleSheetEl = document.createElement("style");
		  	styleSheetEl.id = "console-stylesheet";
		  	styleSheetEl.textContent = cssText;
			
			shadowRoot.append(styleSheetEl);
		  }
		}
	}
	
	var fiddleOrigin = isProdMode? "https://ghanhass.github.io" : "http://localhost:4200";
  
	//var iframeElement = document.querySelector("#myiframe");
	//let myscript = document.querySelector("#myscript");

	
	window.addEventListener("load", function() {

		consolePanel.enable();

		var consolePanelEl = myfiddleConsoleEl.shadowRoot.querySelector("#console-panel.console-panel");
		consolePanelEl.style.display = "none";

		//console.log("sub iframe load");
		//console.log("window.detectedError = ", window.detectedError);
		generateConsoleStyleSheet(window.currentTheme);
		if(window.isConsoleOn || window.detectedError){
			window.parent.postMessage("detected-error", fiddleOrigin);
			consolePanel.showConsolePanel();
			consolePanelEl.style.display = "";
		}

		if(window.detectedError){
			console.error(window.detectedError.toString());
		}
		window.parent.postMessage("sub-iframe-loaded", fiddleOrigin);
	});
  
	window.addEventListener("message", function(event) {
  
	  //console.log("message event = ", event);
	  if (event.origin == fiddleOrigin) {
		//generateConsoleStyleSheet(event.data.currentTheme);
		var data = JSON.parse(event.data);
		var consolePanelEl = myfiddleConsoleEl.shadowRoot.querySelector("#console-panel.console-panel");
		if (data.type == "run") {
		  generateConsoleStyleSheet(event.data.currentTheme);
		  var blobUrl = "";
		  var html = data.html;

		  //html += `<link rel='stylesheet' href='${isProdMode ? "https://hassen-github.github.io/myfiddlepreview/":"http://localhost/myfiddlepreview/"}mystyle.css'>`;
		  html = `<style>
		  	  html{
		  		height:100%;
		  		width:100%;
		  		background-color: #FFFFFF;
		  	  }
		  </style>` + html;
		  
		  html += `<script src='${isProdMode ? "https://hassen-github.github.io/myfiddlepreview/":"http://localhost/myfiddlepreview/"}console-panel.js'></script>`;
		  html += `<script src='${isProdMode ? "https://hassen-github.github.io/myfiddlepreview/":"http://localhost/myfiddlepreview/"}server.js'></script>`;
  
		  var newBlob = new Blob([html], {
			type: "text/html"
		  });

		  blobUrl = URL.createObjectURL(newBlob);

		  location.href = blobUrl
		  //console.log("created blob url ", blobUrl);
		  
		  //iframeElement.src = blobUrl;
		  var myscript = document.querySelector("#myscript");
		  if (myscript) {
			myscript.remove();
		  }
		}else if (data.type == "change-console-theme") {
		  generateConsoleStyleSheet(data.currentTheme);
		}
		else if (data.type == "console-show") {
		  //generateConsoleStyleSheet(data.currentTheme);
		  consolePanel.showConsolePanel();
		  consolePanelEl.style.display = "";

		  myfiddleConsoleEl.shadowRoot.querySelector("#console-panel #console-input").focus();
		}
		else if (data.type == "console-hide") {
			consolePanelEl.style.display = "none";
			consolePanel.hideConsolePanel();
		}
		else if (data.type == "console-mobile-update") {
			if(data.isFiddleMobileMode){
				consolePanelEl.style.height = "100%";
			}
			else{
				consolePanelEl.style.height = "400px";
			}
		}
	  }
	});
  
  
  
	//console.log("inline script started");
  } else {
	document.body.innerHTML = "<h1>Running this web page directly is forbidden, good day.</h1>"
  }