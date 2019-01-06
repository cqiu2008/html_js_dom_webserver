function show(pckTable,pckType) {
	var tableObj=document.getElementById(pckTable);
	var theadOnlineEdit=tableObj.getElementsByTagName("tbody")[0]; 
	var row0=theadOnlineEdit.rows[0];
	var arrRow = tableObj.getElementsByTagName("tr");

	//alert(arrRow[1].cells[3].style.display);	
	alert(arrRow[1].cells[4].id);	

	if(pckType == "ipv4") {
		arrRow[1].cells[3].style.display='';
		arrRow[1].cells[4].style.display='none';
	}
	else {
		arrRow[1].cells[3].style.display='none';
		arrRow[1].cells[4].style.display='';
	}
	//alert(x1.style.display);
	//alert(x2.style.display);
}

function nodeShow(pckType){
	var tableObj=document.getElementById(pckType);
	var theadOnlineEdit=tableObj.getElementsByTagName("tbody")[0]; 
	var row0=theadOnlineEdit.rows[0];
	var arrRow = tableObj.getElementsByTagName("tr");
	//alert(arrRow[1].cells[0].innerHTML);
	//alert(arrRow[1].cells[3].childNodes[1]);
	arrRow[1].cells[3].style.display='';
	alert(arrRow[1].cells[3].style.display);
	//xxxalert(arrRow[0].children(0).innerHTML);

}
