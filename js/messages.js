function printMessage(messageFile, messageBox, nextButton, xmlHttpRequest, nextCommand) {
	(function () {
		function onClickNextButton() {
			this.removeEventListener("click", onClickNextButton, false);
			nextCommand();
		}
		
		function onLoadMessage() {
			xmlHttpRequest.removeEventListener("load", onLoadMessage, false);
			nextButton.addEventListener("click", onClickNextButton, false);
			messageBox.innerHTML = this.responseText;
		}
		
		xmlHttpRequest.open("get", "messages/" + messageFile, true);
		xmlHttpRequest.addEventListener("load", onLoadMessage, false);
		xmlHttpRequest.send(null);
	}());
}
