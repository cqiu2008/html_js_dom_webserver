
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

//删除触发事件控件所在的行
function deleteThisRow(targetControl){
	if(targetControl.tagName=="TR")
		targetControl.parentNode.removeChild(targetControl);
	else
		deleteThisRow(targetControl.parentNode);
}

//删除最后控件所在的行
function deleteEndRow(ethPckTable){
	var tableObj=document.getElementById(ethPckTable);
	var theadOnlineEdit=tableObj.getElementsByTagName("tbody")[0]; 
	var rowCur=theadOnlineEdit.rows[parseInt(numStream)+1];
	
	//if(Trim(rowCur.tagName)=="TR"){
	if( (rowCur.tagName == "TR") && (parseInt(numStream) > 0)){
		//alert(rowCur.tagName);
		rowCur.parentNode.removeChild(rowCur);
	}
	else {
		alert("error when try to delete the last Row");
	}
		
	numStream--;
}


//去除空格
function Trim(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}

function detailShow(ethPckTable,numStream,pckType,self) {
	//alert(numStream);
	//alert(pckType);
	var tableObj=document.getElementById(ethPckTable);
	var theadOnlineEdit=tableObj.getElementsByTagName("tbody")[0]; 
	var rowCur=theadOnlineEdit.rows[parseInt(numStream)+1];
	
	//(1) Judge whether is the detail header
	if(Trim(self.innerHTML)=="detail") {
		self.style.display='none'; // first close the detail header
	}
	//(2) display the packet detail
	switch(pckType)
	{
		case "ipv4":
			if(rowCur.cells[3].style.display =='none'){
				rowCur.cells[3].style.display='';
			}
			else{
				rowCur.cells[3].style.display ='none';
				self.parentNode.cells[2].style.display=''; //display the detail header
			}
			rowCur.cells[4].style.display='none';
			break;
		case "ipv6":
			
			if(rowCur.cells[4].style.display =='none') {
				rowCur.cells[4].style.display='';
			}
			else {
				rowCur.cells[4].style.display ='none';
				self.parentNode.cells[2].style.display=''; //display the detail header
			}
			rowCur.cells[3].style.display='none';
			break;
		default:
			rowCur.cells[3].style.display='none';
			rowCur.cells[4].style.display='none';
			self.parentNode.cells[2].style.display=''; //display the detail header
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





