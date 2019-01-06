//���ʵ���б���ӱ����
function addRowByEntityList(tableId,entityList){
    if(typeof(entityList)=="undefined"||entityList==null) return;
    if(entityList instanceof Array){
        for(var i=0;i<entityList.length;i++)
            addRowByEntity(tableId,entityList[i]);
    }
}

//��һ��ʵ����ӵ�һ��
function addRowByEntity(tableId,entity){
	addInstanceRow(tableId,entity,null,"setObjValueByFlag")
}

//���һ����
//����ʹ�÷���addInstanceRow(tableId,entity)
function addInstanceRow(tableId,names,values,functionName){
	var tableObj=getTargetControl(tableId);
	var tbodyOnlineEdit=getTableTbody(tableObj);
	var theadOnlineEdit=tableObj.getElementsByTagName("THEAD")[0];
	var elm=theadOnlineEdit.rows[theadOnlineEdit.rows.length-1].cloneNode(true);
	elm.style.display="";
	if(typeof(names)!="undefined"){
	    if(typeof(functionName)=="undefined") functionName="setObjValueByName";
	    if(typeof(values)!="undefined"&&values!=null){
		    var entity=ArrayToObj(names,values);
		    setInputValue(elm,entity,functionName);
	    }
	    else
		    setInputValue(elm,names,functionName);
	}
	tbodyOnlineEdit.appendChild(elm);
}


//����������е�ֵ
function setInputValue(elm,entity,functionName){
	var childNodes=elm.childNodes;
	for(var i=0;i<childNodes.length;i++){
		for(var j=0;j<childNodes[i].childNodes.length;j++){
			setHtmlObjValue(childNodes[i].childNodes[j],entity,functionName);
		}
	}
}

//����ֵ
function setHtmlObjValue(obj,entity,functionName){
	if(typeof(functionName)=="undefined"){
		setObjValueByName(obj,entity);
	}
	else{
		eval(functionName+"(obj,entity);");
	}
}

//���ݿͻ��ؼ�Nameƥ��ʵ������������ֵ
function setObjValueByName(obj,entity){
	if(entity.hasOwnProperty(obj.name)){
		obj.value=getEntityPropertyValue(entity,obj.name);
	}
}

//���ݱ�־�������ֵ
function setObjValueByFlag(obj,entity){
	var objTemp=obj.parentNode;
	var arrMatches=objTemp.innerHTML.match(/\${\w+}/g);
	if(typeof(arrMatches)=="undefined"||arrMatches==null||typeof(arrMatches.length)=="undefined"||arrMatches.length==null)
	    return;
	var tempValue="";
	var propertyValue="";
	for(var i=0;i<arrMatches.length;i++){
		tempValue=arrMatches[i].replace(/\${|}/g,"");
		propertyValue=getEntityPropertyValue(entity,tempValue);
		if(propertyValue!=null){
		    if(typeof(propertyValue)=="string"){
		        if(propertyValue!="")
		            propertyValue=propertyValue.replace(/\s/g,"&nbsp;");
		        else
		            propertyValue="&nbsp;";
		    }    
		    objTemp.innerHTML=objTemp.innerHTML.replace(arrMatches[i],propertyValue);   
		}
		else{
			objTemp.innerHTML=objTemp.innerHTML.replace(arrMatches[i],"&nbsp;");
		}
	}
}

//�õ�ʵ��ָ��������ֵ
function getEntityPropertyValue(entity,propertyName){
	var tempValue="";
	if(entity.hasOwnProperty(propertyName)){
		eval("tempValue=entity."+propertyName+";");
	    return tempValue;
	}
	else return null;
}

//ֵ��ת��ʵ��
function ArrayToObj(names,values){
	var entity=new Object();
	for(var i=0;i<names.length;i++){
		if(Trim(names[i])!="") eval("entity."+names[i]+"='"+values[i]+"';");
	}
	return entity;
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

//ȥ���ո�
function Trim(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}

//ɾ�������¼��ؼ����ڵ���
function deleteThisRow(targetControl){
	if(targetControl.tagName=="TR")
		targetControl.parentNode.removeChild(targetControl);
	else
		deleteThisRow(targetControl.parentNode);
}

//ɾ������µ�������
function deleteAllRow(tableId){
	var tableObj=getTargetControl(tableId);
	var tbodyOnlineEdit=getTableTbody(tableObj);
	for(var i=tbodyOnlineEdit.childNodes.length-1;i>=0;i--){
	    tbodyOnlineEdit.removeChild(tbodyOnlineEdit.childNodes[i]);
	}
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