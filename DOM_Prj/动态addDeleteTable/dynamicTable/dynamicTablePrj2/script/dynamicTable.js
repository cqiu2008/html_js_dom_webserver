

//add one row in the current table
function addInstanceRow(tableId) {

	var tableObj=getTargetControl(tableId);
	var tbodyOnlineEdit=getTableTbody(tableObj);
	var theadOnlineEdit=tableObj.getElementsByTagName("thead")[0];
	var elm=theadOnlineEdit.rows[theadOnlineEdit.rows.length-1].cloneNode(true);
	//alert("I am an alert box!!")
	//alert(theadOnlineEdit.rows.length-1);
	
	elm.style.display="";
	//alert(elm.style.color);
	tbodyOnlineEdit.appendChild(elm);
	//tbodyOnlineEdit.appendChild(elm);
}

//得到table中的tbody控件，注意兼容firefox
function getTableTbody(tableObj){
	var tbodyOnlineEdit=tableObj.getElementsByTagName("TBODY")[0];
	//alert(tbodyOnlineEdit);
//	tbodyOnlineEdit="
//	if(typeof(tbodyOnlineEdit)=="undefined"||tbodyOnlineEdit==null){
		tbodyOnlineEdit=document.createElement("tbody");
		tableObj.appendChild(tbodyOnlineEdit);
//		alert(tableObj);
//	}
	//alert(tbodyOnlineEdit);
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


/*
function addRowByName(){
	addInstanceRow("table1_byname",["name","sex","age","city","nation"],["张三","男","13","北京","汉"],"setObjValueByName");
}
*/

