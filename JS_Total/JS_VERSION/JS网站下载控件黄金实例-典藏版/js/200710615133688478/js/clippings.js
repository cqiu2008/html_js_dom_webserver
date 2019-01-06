/*

summary 
- - - - -
script handles all clipping functionality
this is a stripped down version of the IHT clippings code
the primary difference is the removal of animation code which I am not that happy with

+  Add to Clippings
+  Link to Clipping
+  Update Clipping as read
+  Remove Clipping(s)
+  Save Clippings

*/

allClippings = new Array();  //all Clippings on page
activeClippings = new Array() //all Clippings stored by the user
currentClipping = 0; //where in the list of Clippings is the user
clippingsDivArray = new Array(); //array of all clipping divs on the page, used to find duplicates
cookiesOn = false; //used to make sure cookies are enabled

//this method needs to be called to initialize the clippings
function initClippings()
	{
	createPageClippingsArray()
	loadClippings();
	setClippingsVisibility();		
	updateClippingCounter();
	drawClippings();
	}	



//clipping class
function Clipping(id,headline,URL, read)
	{
	this.id = id;
	this.headline = headline;
	this.URL = URL;
	this.read = read;
	this.clicked = markRead;
	}


//get Clippings from a cookie
function loadClippings()
	{
	clippingsString = null;
	tempArray = document.cookie.split(";");
	x = -1;
		
		for (tA = 0; tA < tempArray.length; tA++)
			{
			if (tempArray[tA].indexOf('clippings=') > -1) //found the clippings section
				{
				tPos = tempArray[tA].indexOf("=")+2;
				clippingsString = tempArray[tA].substring(tPos,tempArray[tA].length); //striping out "clippings=^"
				}
			
			}
	if (clippingsString != null)
		{		
		tempArray = clippingsString.split("^");
		if (tempArray.length > 1)
		{
		x=0;
		for (i=0; i < tempArray.length/4; i++)
			{
			//add the id, name, url, readstate
			activeClippings[i] = new Clipping(tempArray[x],tempArray[x+1],tempArray[x+2],tempArray[x+3])
			x=x+4;
			}}
		}
	}

//saves clippings to cookie	
function saveClippings()
	{
	tempCookie = "clippings=";
	for(i=0; i < activeClippings.length; i++)
		{
		tempCookie=tempCookie+"^"+(activeClippings[i].id)+"^"+(activeClippings[i].headline)+"^"+(activeClippings[i].URL)+"^"+(activeClippings[i].read);
		}
		var expire = new Date ();
   		expire.setTime (expire.getTime() + (6 * 24 * 3600000)); //expires in 6 days from users clock
   		expire = expire.toGMTString();
	finalCookie = tempCookie+"; path=/; expires="+expire;  	
  	document.cookie = finalCookie;
	}


// detects wether cookies are turned on or not
function eventCheckForCookies()
	{
	document.cookie = "cookies=on";
  	
  	checkForCookie = document.cookie.split(";");
  	
  		for (x=0; x < checkForCookie.length; x++)
  			{
  			if (checkForCookie[x].indexOf("cookies") >= 0) {cookiesOn = true;}
  			}
  		if (cookiesOn == false) alert("You will need to enable\ncookies to use Clippings.");
	}


//marks a clipping read
function markRead(id)
	{
	if (!id) id = this.id.substring(5,this.id.length);
	for (i=0; i < activeClippings.length; i++)
		{
		if (activeClippings[i].id == id) activeClippings[i].read = "yes";
		}
		
	//refresh the container
	drawClippings();
	}	

//loads the url of the clipping
function loadClippingURL(pos)
	{
	markRead(activeClippings[pos].id);
	n = open(activeClippings[pos].URL,"win"+activeClippings[pos].id);
	}

//load next unread clipping in array
function eventShowNextClipping()
	{
	if (activeClippings != null) 
		{
		total = 0;
		for (aC = 0; aC < activeClippings.length; aC++)
			{
			if (activeClippings[aC].read != "yes") 
				{
				loadClippingURL(aC);
				updateClippingCounter();
				saveClippings();
				break;
				}
			}
		}
	}

//removes all read clippings	
function eventClearReadClippings()
	{
	tempClippings = new Array()
	x = 0;
	for (i=0; i < activeClippings.length; i++)
		{
		if (activeClippings[i].read != "yes") {tempClippings[x] = activeClippings[i]; x++}
		}
	activeClippings = tempClippings;
	drawClippings();
	setClippingsVisibility();	
	updateClippingCounter();
	saveClippings();
	}

//removes all clippings	
function eventClearAllClippings()
	{
	activeClippings = new Array();
	drawClippings();
	setClippingsVisibility();	
	updateClippingCounter();
	saveClippings();
	}

//creates the HTML for the clippings menu when a clipping is added
//removed create element and used innerHTML instead
function drawClippings()
	{
	newHTML = "";
	
	//draw this text if there are no clippigns
	if (activeClippings.length < 1) 
		{
		newHTML = "<span class='clippingItem'>There are currently no Excerpts saved.<br>To add an Excerpt click on the <SPAN class='clippingIcon'>+</SPAN> next to a link.<br><br></span>";
//		newHTML += "You can access your Excerpts either through this menu, or clicking on the number to the right of the Excerpts menu.  That number represents unread Excerpts."
		}
	
	for (i=0; i < activeClippings.length; i++)
		{
		clipping = activeClippings[i];
		
		if (clipping.read == "yes") tClass = "clippingItemRead";
		else tClass = "clippingItem";

		newHTML += "<a href=\"javascript:loadClippingURL("+i+")\" class='"+tClass+"' id='cLink"+clipping.id+"'>";
		newHTML += clipping.headline+"</a>";
		
		}
		
	obj = document.getElementById("clippingsContainer");
	obj.innerHTML = newHTML;
	
	//make sure that the clippings container does not go off screen
	clippingsSetContainerHeight();
	}


//sets the height of the clippings container, make sure it does not go off screen
function clippingsSetContainerHeight()
	{
	obj = document.getElementById("clippingsContainer");
	obj.style.height= Math.round(userScreen.visHeight()/2)+"px";
	}


//make sure there is no other record of that clipping in use
function checkForDuplicates()
	{
	for (i=0; i < activeClippings.length; i++)
		{
		if (newClipping == activeClippings[i].id) {i = allClippings.length; duplicate = true;}
		}
	}


//creates array of all clippings on page
//having this array helps speed things up on the mac
function createPageClippingsArray()
	{
		d = document.getElementsByTagName("SPAN")
		for (j=0; j < d.length; j++) if (d[j].id.indexOf("clp") > -1) 
			{
			clippingsDivArray[clippingsDivArray.length] = d[j];
			}
	 }

//finds duplicate clippings on a page
function clippingInstanceVisibility(id,state)
	{
	t = document.getElementsByName(id);
	if(t.length > 0)
		{
		for (j=0; j < t.length; j++) 
			{
			t[j].style.visibility = state;
			t[j].onclick = addClipping;
			}
		}
	else {
	 	d = clippingsDivArray;
  		{
		for (j=0; j < d.length; j++) if (d[j].id == id) 
			{
			d[j].style.visibility = state;
			d[j].onclick = addClipping;
			}
		}
		}		
	}
	
//sets the visibility and events for an object;	
function setClippingsVisibility()
	{
	
	for (i=0; i < allClippings.length; i++)
		{
		vis = "visible";
		
		//find if this clipping is already selected
		for (x=0; x <activeClippings.length; x++) if (allClippings[i].id == activeClippings[x].id) vis = "hidden";
			obj = "clp"+allClippings[i].id;
			clippingInstanceVisibility(obj,vis)
			}
			
		}

//this event is triggered when a clipping is clicked 
function addClipping()
	{
	newClipping = this.id.substring(3,this.id.length)
	duplicate = false;
	for (i=0; i < allClippings.length; i++) //find the position the allClippings array of the selected clipping
		{
		if (newClipping == allClippings[i].id) {pos = i; i = allClippings.length}
		}
		
	if (activeClippings.length > 0)	checkForDuplicates() //make sure clipping is not already seletected
	
	if (!duplicate)
	{	
		eventCheckForCookies();
		if (cookiesOn == true)
			{
			activeClippings[activeClippings.length] = new Clipping(allClippings[pos].id,allClippings[pos].headline,allClippings[pos].URL);
			
			//find all instances of the clipping in article and hides it
	 		clippingInstanceVisibility(this.id,'hidden') 
	 		
	 		drawClippings();	
	 		event.cancleBubble = true;
	 		updateClippingCounter();
			saveClippings();
		 	}
	 	}
	}


//sets the number of unread clippings
function updateClippingCounter()
	{
	if (activeClippings != null) 
		{
		total = 0;
		for (aC = 0; aC < activeClippings.length; aC++)
			{
			if (activeClippings[aC].read != "yes") total++
			}
		}
	obj = document.getElementById("clippingsCounter");
	obj.innerHTML = "<a href=\"javascript:eventShowNextClipping()\">unread excerpts: "+total+"</a><br><br>";
	}	




