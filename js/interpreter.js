function initialize() {
	(function () {
		function nextCommand() {
			if (programCounter >= commands.length) {
				return;
			}
			command = commands[programCounter].split(" ");
			if (command[0] == "m") {
				printMessage(command[1], messageBox, nextButton, xmlHttpRequest, nextCommand);
			} else if (command[0] == "g") {
				getClickButton(command[1], command[2], valueMap, messageBox, buttons, xmlHttpRequest, nextCommand);
			} else if (command[0] == "i") {
				if (valueMap[command[1]] == command[2]) {
					loadScript(command[3]);
				} else {
					programCounter ++;
					nextCommand();
				}
			}
			programCounter ++;
		}
		
		function onLoadScript() {
			xmlHttpRequest.removeEventListener("load", onLoadScript, false);
			commands = this.responseText.split(/\r\n|\r|\n/);
			programCounter = 0;
			nextCommand();
		}
		
		function loadScript(ScriptFile) {
			xmlHttpRequest.open("get", "qpgkScripts/" + ScriptFile, true);
			xmlHttpRequest.addEventListener("load", onLoadScript, false);
			xmlHttpRequest.send(null);
		}
		
		var messageBox = document.getElementById("messageBox");
		var buttons = document.getElementById("buttonList").getElementsByTagName("button");
		var nextButton = buttons[0];
		var xmlHttpRequest = new XMLHttpRequest();
		var valueMap = {};
		
		loadScript("entry.txt");
	}());
}

window.addEventListener("load", initialize, false);
