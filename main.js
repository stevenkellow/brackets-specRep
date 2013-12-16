/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/* jPARK - SpecRep v 0.1 */
/* A Special Character Replacement Extension */
/* Written by James Park 2013 */
/* Extension that searches through and replaces any special characters with relevant code equivalent. */
/* Mainly useful for email templates if created via Brackets */

/** Extension that searches through and replaces any special characters with relevant code equivalent. */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
		EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");

    
    // Function to run when the menu item is clicked
    function replaceSpecials() {

        var mainWindow = EditorManager.getActiveEditor(),
            activeText = mainWindow.document;

        if (activeText) {

            var htmlContent = activeText.getText();

            // store current cursor and scroll positions
            var cursorPos = mainWindow.getCursorPos(),
                scrollPos = mainWindow.getScrollPos();

				htmlContent = htmlContent.replace(/\u2013/g,"&ndash;");
				htmlContent = htmlContent.replace(/\u2014/g,"&mdash;");
				htmlContent = htmlContent.replace(/\u0091/g,"'");
				htmlContent = htmlContent.replace(/\u0092/g,"'");
				htmlContent = htmlContent.replace(/\u0027/g,"'");
				htmlContent = htmlContent.replace(/\u00A3/g,"&pound;");
				htmlContent = htmlContent.replace(/:tm:/g,"&#153;");
				htmlContent = htmlContent.replace(/:tick:/g,"&#10004;");
				htmlContent = htmlContent.replace(/:c:/g,"&#169;");
				htmlContent = htmlContent.replace(/:r:/g,"&#174;");
				htmlContent = htmlContent.replace(/’/g,"'");
				htmlContent = htmlContent.replace(/‘/g,"'");
				htmlContent = htmlContent.replace(/“/g,"\"");
				htmlContent = htmlContent.replace(/”/g,"\"");
				htmlContent = htmlContent.replace(/\s&\s/g,"&amp;");
			
				activeText.setText(htmlContent);

            // restore cursor and scroll positions
            mainWindow.setCursorPos(cursorPos);
            mainWindow.setScrollPos(scrollPos.x, scrollPos.y);

            return true;
        }

        return false;
	}
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "replace.specials";   // package-style naming to avoid collisions
    CommandManager.register("Replace Specials", MY_COMMAND_ID, replaceSpecials);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    //menu.addMenuItem(MY_COMMAND_ID);
    
    // We could also add a key binding at the same time:
    menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-0");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)

    exports.replaceSpecials = replaceSpecials;
});
