var windows = require("sdk/window/utils");
var data = require("sdk/self").data;
var LOGIN_URL = 'http://127.0.0.1:8000/login/';
const { id } = require("sdk/self");
var dialogName = id+"LoginWindow";
var features = "resizable=no,scrollbars=yes,width=700,height=400,centerscreen=yes";
var dialog;
var alreadyOpen = false;


function checkIfOpen(){
	if (dialog != undefined){
		if (dialog.closed == true && alreadyOpen == false){
			console.log('dialog:  '+"Open!!");
			return false;
		}
		else if (dialog.closed == false){
			console.log('dialog:  '+"Don't open! Dialog is not closed");
			alreadyOpen = true;
			return true;
		}
			
	}
	else{
		if (alreadyOpen == false){
			console.log('dialog:  '+"You can open!");
			alreadyOpen = true;
			return false;
		}
		else{
			console.log('dialog:  '+"You can't open");
			return true;
		}
	}
}


function loginDialog(){
	try{
		var if_open = checkIfOpen();
		if (if_open == false){
			var aWindow = windows.getMostRecentBrowserWindow()
			dialog = aWindow.open(LOGIN_URL,dialogName,features);
			alreadyOpen = true;
		}
		else{
			dialog.focus();
			alreadyOpen = true;
		}
	}catch(e){
		console.log('dialog:  '+e.toString());
	}
}

exports.loginDialog = loginDialog;