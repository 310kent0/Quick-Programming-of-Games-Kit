function printMessage(messageFile, messageBox, nextButton, xmlHttpRequest, nextCommand) {
	var onClickNextButton = function() {
		this.removeEventListener("click", onClickNextButton, false);
		nextCommand();
	}
	
	var onLoadMessage = function() {
		xmlHttpRequest.removeEventListener("load", onLoadMessage, false);
		nextButton.addEventListener("click", onClickNextButton, false);
		messageBox.innerHTML = this.responseText;
	}
	
	xmlHttpRequest.open("get", "messages/" + messageFile, true);
	xmlHttpRequest.addEventListener("load", onLoadMessage, false);
	xmlHttpRequest.send(null);
}
