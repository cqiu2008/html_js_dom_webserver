

//add one row in the current table
function addInstanceRow(tableId) {

	var tableObj=getTargetControl(tableId);
	var tbodyOnlineEdit=getTableTbody(tableObj);
	var theadOnlineEdit=tableObj.getElementsByTagName("thead")[0];


	var elm=theadOnlineEdit.rows[theadOnlineEdit.rows.length-1].cloneNode(true);
	//alert(elm);
	//alert("I am an alert box!!")

	elm.style.display="";
	tbodyOnlineEdit.appendChild(elm);

}

//�õ�table�е�tbody�ؼ���ע�����firefox
function getTableTbody(tableObj){
	var tbodyOnlineEdit=tableObj.getElementsByTagName("TBODY")[0];
	if(typeof(tbodyOnlineEdit)=="undefined"||tbodyOnlineEdit==null){
		tbodyOnlineEdit=document.createElement("tbody");
		tableObj.appendChild(tbodyOnlineEdit);
	}
	return tbodyOnlineEdit;
}


//�õ�ָ���Ŀؼ�
//���紫�ݵ��ǿؼ����÷��ؿؼ�
//���紫�ݵ���IDֵ�����Զ����ҳ��ؼ�������
function getTargetControl(targetControl){
	if(typeof(targetControl)=="string"){
		return document.getElementById(targetControl);
	}
	else return targetControl;
}


/*
function addRowByName(){
	addInstanceRow("table1_byname",["name","sex","age","city","nation"],["����","��","13","����","��"],"setObjValueByName");
}
*/

