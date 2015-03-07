(function(){
	//App Scope
	var _menudocument='nav.json';
	//On de Document is ready start to load the menu information
	document.ready = loadJsonFile(_menudocument); 
	function loadJsonFile(jsonfile) {
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.open('GET', './api/' + jsonfile, true);
		xmlhttp.setRequestHeader('Content-Type', 'application/json');

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200 || xmlhttp.status === 0) {
                    var data = xmlhttp.responseText;
                    if (data) {
                        processRequest(data);
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            }
        };

        xmlhttp.send();

	}
	//Function that Process the json data
	function processRequest(Data) {

		 document.getElementById('main-menu').appendChild( menuNavBuilder( JSON.parse(Data)) );
		 var links = document.querySelectorAll('.nav-option');
		 buildOverlay();	 
		for (var i = 0; i<links.length; i++) {
			var currentLink = links[i];
			//Create menu Events



			currentLink.onclick = function(e) {	
				//Hide the current active
				var active = document.querySelector(".active");
				//If is the same element inactive the  menu
				if(active===e.target.parentNode){
					active.classList.remove("active");
				}else{
					if(active !==null){
						active.classList.remove("active");
					}
					//Active the option pressed
					e.target.parentNode.classList.toggle('active');

					var mobileestus=document.body.querySelectorAll('.mobile-active');
					if(mobileestus===false){
					//If the option have other options show the overlay
						var childnode=e.target.parentNode.childNodes;

						if(childnode.length>1){
							document.getElementById('overlay').style.height=getContentHeight(); 
							document.getElementById('overlay').classList.add('visible-over');
						}else{
							//If in the mobile mode only if the user press x the overlay y close
								document.getElementById('overlay').classList.remove('visible-over');
							
						}
					}	
				}
				if (currentLink.children.length > 1) {
					e.target.preventDefault();
				}
			};
		}
		//Create Mobile menu Event
		 document.getElementById('mobile-menu').onclick = function(e) {
		 	var mobileestus=document.body.classList.toggle('mobile-active');
		 	if(mobileestus){
		 		document.getElementById('overlay').style.height=getContentHeight(); 
		 		document.getElementById('overlay').classList.add('visible-over');

		 	}else{
		 		document.getElementById('overlay').classList.remove('visible-over');
		 	}
		 };		
	}
	//Function to get the height of the content
	function getContentHeight(){
		var body = document.body,
    	 html = document.documentElement;
		var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
		return height.toString()+"px";
	}

	function buildOverlay(){

		var overlay = document.createElement('div');
		overlay.id = 'overlay';
		 overlay.onclick = function(e) {
		 	var mobileactive = document.querySelector(".mobile-active");
				if(mobileactive===null){
			 	this.classList.remove('visible-over');
				var active = document.querySelector(".active");
				if(active !==null){
					active.classList.remove("active");
				}
			}
		 };
		
		document.getElementById('main-content').appendChild(overlay);
		document.getElementById('overlay').setAttribute("style","height: "+getContentHeight()); 

	}
 	//Build the HTML Menu
	function menuNavBuilder(Data) {
	 	var items = Data.items;
	 	var navmenu = document.createElement('ul');
	 	navmenu.className = 'first-level';
	 	navmenu.id = 'first-level';
	 	items.forEach(function(item,index){
	 		var li = document.createElement('li');
	 		li.className = 'nav-option';
			var link = document.createElement('a');
			link.text = item.label;
			link.href = item.url;
			li.appendChild(link);
			if(item.items.length>0){
				var subnav = document.createElement('ul');
	 			subnav.className = 'second-level';
				item.items.forEach(function(item_int,index){
						var subItems = item_int;
				 		var subli = document.createElement('li');
				 		subli.className = 'nav-option';
						var sublink = document.createElement('a');
						sublink.text = item_int.label;
						sublink.href = item_int.url;
						subli.appendChild(sublink);
						subnav.appendChild(subli);
					});
				li.appendChild(subnav);
				li.classList.add('parent');
			}
			navmenu.appendChild(li);
	 	});

	 return navmenu;
	}

}());