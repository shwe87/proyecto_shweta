/*This content script gets the code that Dropbox gives when the user gives the authorization for this app to write in this app's file.*/

var code = document.getElementsByClassName('auth-code')[0];
if (code != null){
	self.port.emit('takeCode',code.innerHTML);
}

//When the code is received by the gapi module, close this tab
self.port.on('signedIn',function(msg){
	//var text = document.createTextNode(msg);
	//document.body.appendChild(text);
	self.port.emit('closeTab','close');
});

self.on("detach", function() {
  	window.close();
});
