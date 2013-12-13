var tabs = require('sdk/tabs');
var { emit, on, once, off } = require("sdk/event/core");
var preferences = require('./preferences.js');
var sync_tabs = true;
exports.on = on.bind(null, exports);
exports.once = once.bind(null, exports);
exports.removeListener = function removeListener(type, listener) {
  off(exports, type, listener);
};


var tabsList = new Array();


tabs.on('pageshow',function(tab){
		sync_tabs = preferences.getSyncTabs();
		if (sync_tabs == true){
			//console.log("TAB LOAD = " + tab.url + ' with ID = ' + tab.id);
			var aTab = new Object();
			aTab.url = tab.url;
			aTab.id = tab.id;
			aTab.title = tab.title;
			//console.log(JSON.stringify(aTab));
			var found = false;
			var save = true;
			for (var i=0;i<tabsList.length;i++){
				if (tabsList[i].id == tab.id){
					//console.log("Here");
					if (aTab.url == tabsList[i].url){//Don't save this
						found = true;
						save = false;
						break;
					}
					tabsList[i] = aTab;
					found = true;
					break;
				} 
			}
			if (!found){
				//console.log("Not found");
				tabsList.push(aTab);
			}
			//console.log(JSON.stringify(tabsList));
			if (save == true){
			
				emit(exports,'save',tabsList);
			}
		}

});



tabs.on('close',function(tab){
		//console.log("TAB CLOSE = " + tab.id);
		sync_tabs = preferences.getSyncTabs();
		if (sync_tabs == true){
			var found = false;
			for (var i=0;i<tabsList.length;i++){
				if (tabsList[i].id == tab.id){
					//console.log("found");
					tabsList.splice(i,1);
					found = true;
					break;
				} 
			}

	
			emit(exports,'save',tabsList);
		}
		//console.log(JSON.stringify(tabsList));	
});



function startUp(){
	sync_tabs = preferences.getSyncTabs();
	if (sync_tabs == true){
		
		for each (var tab in tabs){				
			var newTab = {'id':tab.id,'title':tab.title,'url':tab.url};
			tabsList.push(newTab);	
		
		}
		emit(exports,'save',tabsList);
		//console.log("saveTabs = " + JSON.stringify(dataToSave));
		//listenOpen();
		//listenClose();
	}
	
	



}

exports.startUp = startUp;