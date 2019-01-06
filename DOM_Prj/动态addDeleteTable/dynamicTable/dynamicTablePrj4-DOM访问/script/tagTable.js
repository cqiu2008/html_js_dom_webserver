function show(pckType) {
	var x1=document.getElementById("LM1");
	var x2=document.getElementById("LM2");

	
	//alert(pckType);
	//alert(x1);
	if(pckType == "ipv4") {
		x1.style.display= '';
		x2.style.display= 'none';
	}
	else {
		x1.style.display= 'none';
		x2.style.display= '';
	}
	//alert(x1.style.display);
	//alert(x2.style.display);
}

function nodeShow(pckType){
	var tableObj=document.getElementById(pckType);
	//alert("Whole"+tableObj);//HTMLTableElement
	var theadOnlineEdit=tableObj.getElementsByTagName("tbody")[0]; 
	//alert("thead"+theadOnlineEdit); //  HTMLTableSectionElement
	var row0=theadOnlineEdit.rows[0];
	//alert("row0"+row0); // HTMLTableRowElement 
	var row1=theadOnlineEdit.rows[1];
	//alert("row1"+row1.style.color); 
	//var row1=theadOnlineEdit.rows[1];
	//alert("row1"+row1.firstChild.innerHTML); 
	//alert("row1"+row1.firstChild.style.color); 
	//alert(LM1.style.display);
	var arrRow = tableObj.getElementsByTagName("tr");
	//alert(arrRow[0].style.color);
	alert(arrRow[0].firstChild);
	//xxxalert(arrRow[0].children(0).innerHTML);

}
