//creating contextMenu here
//using chrome runtime to avoid duplicate id error.
chrome.runtime.onInstalled.addListener(function(){
	
	var proxyLink = "http://nitinshah.in/css/pro/webpro/browse.php?u=";
	
	
	chrome.contextMenus.create({id: "quickProxy",
		contexts: ["link","selection"],
		title: "Open with Quick Proxy"
	});

	chrome.contextMenus.onClicked.addListener(function(info,tab){
		if(info.linkUrl){
			console.log(info.linkUrl)
			chrome.tabs.create({url: proxyLink+info.linkUrl});
			var recents = JSON.parse(localStorage.getItem('recents'));
			if(!recents) recents = [];
			recents.push(info.linkUrl);
			localStorage.setItem('recents',JSON.stringify(recents));
			
		}else if(info.selectionText){
			console.log(info.selectionText)
		}
		else console.log(info);
	});
});
