document.addEventListener('DOMContentLoaded',function(){
	var recents = [];
	var proxyLink = "http://nitinshah.in/css/pro/webpro/browse.php?u=";
	if(window.localStorage['recents'])
		recents = JSON.parse(window.localStorage['recents']);
	
	console.log(recents);
	loadRecents();
	
	
	document.getElementById('btnGo').addEventListener('click',function(){
		var link = document.getElementById('linkToGo').value;
		if(!(link.substring(0,4)=="http")) link = "http://"+link;
		cacheLink(link);
		
		
		//open the new tab with proxy:)
		chrome.tabs.create({url: proxyLink+link});
	});
	
	function cacheLink(link){
		recents.push(link);
		window.localStorage.setItem('recents',JSON.stringify(recents));
	}
	
	function addLink(link){
		var newlink = document.createElement('a');
		newlink.href  = proxyLink+link;
		newlink.innerHTML = link;
		newlink.id = "link";
		
		newlink.addEventListener('click',function(){
			chrome.tabs.create({url: proxyLink+link});
		});
		
		
		//document.body.appendChild(newlink);
		document.getElementById("links").appendChild(newlink);
		document.getElementById("links").appendChild(document.createElement("br"));
	}
	
	function loadRecents(){
		console.log(recents);
		if(recents.length===0) return;
		
		
		//adds "Recent" title
		if(recents.length!==0){
			document.body.appendChild(document.createElement('br'));
			var title = document.createElement('strong');
			title.id = "recentTitle";
			title.innerHTML = "Recents: ";
			document.body.appendChild(title);
		}
		
		//create a div in which all the links will be added
		var links = document.createElement("div");
		links.id = "links";
		document.body.appendChild(links);
		
		//loops through all the links and adds to DOM
		for(var i=0;i<recents.length;i++){
			addLink(recents[i]);
		}
		
		//adds clear history button
		var btnClear = document.createElement('button');
		btnClear.innerHTML = "clear history";
		btnClear.addEventListener('click',function(){
			document.getElementById("links").remove();
			btnClear.remove();
			document.getElementById("recentTitle").remove();
			localStorage.removeItem('recents');
		});
		document.body.appendChild(document.createElement('br'));
		document.body.appendChild(btnClear);
	}
	
	document.getElementById('linkToGo').addEventListener('keydown',function(){
		if(event.keyCode == 13) document.getElementById('btnGo').click();
	})
});