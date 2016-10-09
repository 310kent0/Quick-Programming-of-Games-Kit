function getClickButton(messageFile, valueName, valueMap, messageBox, buttons, xmlHttpRequest, nextCommand) {
	(function () {
		function onClickButton() {
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].removeEventListener("click", onClickButton, false);
			}
			valueMap[valueName] = this.innerHTML;
			nextCommand();
		}
		
		function onLoadMessage() {
			xmlHttpRequest.removeEventListener("load", onLoadMessage, false);
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].addEventListener("click", onClickButton, false);
			}
			messageBox.innerHTML = this.responseText;
		}
		
		xmlHttpRequest.open("get", "messages/" + messageFile, true);
		xmlHttpRequest.addEventListener("load", onLoadMessage, false);
		xmlHttpRequest.send(null);
	}());
}
