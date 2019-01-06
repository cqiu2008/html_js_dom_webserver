
//var Global Assigment
var numStream=0; 

//add one row in the current table
function addInstanceRow(tableId) {
	var tableObj=getTargetControl(tableId);
	var tbodyOnlineEdit=getTableTbody(tableObj);
	var theadOnlineEdit=tableObj.getElementsByTagName("tbody")[0];
	var elm=theadOnlineEdit.rows[theadOnlineEdit.rows.length-1].cloneNode(true);
	//alert(theadOnlineEdit.rows.length-1);
	numStream++;
	elm.style.display="";
	elm.cells[0].innerHTML=numStream;


	tbodyOnlineEdit.appendChild(elm);
	//alert(numStream);
}

//得到table中的tbody控件，注意兼容firefox
function getTableTbody(tableObj){
	var tbodyOnlineEdit=tableObj.getElementsByTagName("tbody")[0];
	if(typeof(tbodyOnlineEdit)=="undefined"||tbodyOnlineEdit==null){
		tbodyOnlineEdit=document.createElement("tbody");
		tableObj.appendChild(tbodyOnlineEdit);
	}

	return tbodyOnlineEdit;
}
//得到指定的控件
//假如传递的是控件，得返回控件
//假如传递的是ID值，则自动查找出控件并返回
function getTargetControl(targetControl){
	if(typeof(targetControl)=="string"){
		return document.getElementById(targetControl);
	}
	else return targetControl;
}


function detailTable(ethPckTable,numStream,pckType) {
	//alert(numStream);
	//alert(pckType);
	var tableObj=document.getElementById(ethPckTable);
	var theadOnlineEdit=tableObj.getElementsByTagName("tbody")[0]; 
	//alert(numStream);
	//var numLocal=1;
	//var numLocal=numLocal+numStream;
	//alert(numStream+1);
	
	var rowCur=theadOnlineEdit.rows[parseInt(numStream)+1];
	//alert(row1.cells[3].childNodes[1].style.display);
	//alert(row1.cells[3].style.display);
	//alert(rowCur.value);
	//alert(abc);
	//alert(pckType);
	
	switch(pckType)
	{
		case "ipv4":
			rowCur.cells[3].style.display='';
			rowCur.cells[4].style.display='none';
			break;
		case "ipv6":
			rowCur.cells[3].style.display='none';
			rowCur.cells[4].style.display='';
			break;
		default:
			rowCur.cells[3].style.display='none';
			rowCur.cells[4].style.display='none';
			break;
	}
}

function show(abc){
	//alert(abc);

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

/*
function addRowByName(){
	addInstanceRow("table1_byname",["name","sex","age","city","nation"],["张三","男","13","北京","汉"],"setObjValueByName");
}
*/





