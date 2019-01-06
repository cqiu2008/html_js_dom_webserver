
//var Global Assigment
var numStream = 0;

//add one row in the current table
function addInstanceRow(tableId) {
	var tableObj = getTargetControl(tableId);
	var tbodyOnlineEdit = getTableTbody(tableObj);
	var theadOnlineEdit = tableObj.getElementsByTagName("tbody")[0];
	var elm = theadOnlineEdit.rows[theadOnlineEdit.rows.length - 1].cloneNode(true);
	//alert(theadOnlineEdit.rows.length-1);
	numStream++;
	elm.style.display = "";
	elm.cells[0].innerHTML = numStream;


	tbodyOnlineEdit.appendChild(elm);
	//alert(numStream);
}

//�õ�table�е�tbody�ؼ���ע�����firefox
function getTableTbody(tableObj) {
	var tbodyOnlineEdit = tableObj.getElementsByTagName("tbody")[0];
	if (typeof (tbodyOnlineEdit) == "undefined" || tbodyOnlineEdit == null) {
		tbodyOnlineEdit = document.createElement("tbody");
		tableObj.appendChild(tbodyOnlineEdit);
	}

	return tbodyOnlineEdit;
}


//ɾ�������¼��ؼ����ڵ���
function deleteThisRow(targetControl) {
	if (targetControl.tagName == "TR")
		targetControl.parentNode.removeChild(targetControl);
	else
		deleteThisRow(targetControl.parentNode);
}

//ɾ�����ؼ����ڵ���
function deleteEndRow(ethPckTable) {
	var tableObj = document.getElementById(ethPckTable);
	var theadOnlineEdit = tableObj.getElementsByTagName("tbody")[0];
	var rowCur = theadOnlineEdit.rows[parseInt(numStream) + 1];

	//if(Trim(rowCur.tagName)=="TR"){
	if ((rowCur.tagName == "TR") && (parseInt(numStream) > 0)) {
		//alert(rowCur.tagName);
		rowCur.parentNode.removeChild(rowCur);
	}
	else {
		alert("error when try to delete the last Row");
	}

	numStream--;
}


function detailShow(selfOwn) {
	//(1) Judge whether is the detail header
	if (matchString("detail", selfOwn.innerHTML) == true) {
		//selfOwn.style.display='none'; // first close the detail header
		//(1)��ȡ��ǰ�����tr�ж���
		var trObj = selfOwn.parentNode;
	}
	else {
		//(1)��ȡ��ǰ�����tr�ж���
		var trObj = selfOwn.parentNode.parentNode.parentNode;
		//alert(trObj);
	}
	//(2) ��ȡ��ǰ��ѡ���ţ����� [1] L2 1588,��ô��ȡ���Ϊ1
	var td1Obj = trObj.cells[1];
	var td1SelectObj = filterTextChildNodes(td1Obj);
	var re = /\d+\s*\]/; //ͨ��� ����] ������ʽ
	var arr = re.exec(td1SelectObj.value);
	var optValue = arr[0].replace(/\s*\]/g, "");
	//alert(optValue);
	//(2)��ȡ��ǰҪ��ʾ��td����
	var j = 2 + parseInt(optValue);
	var tdCurObj = trObj.cells[j];
	//(3)�ر�����֮ǰ�򿪵�td����,���˵�ǰ�����td
	for (var i = 2; i < trObj.cells.length; i++) {
		if (i != j)
			trObj.cells[i].style.display = 'none';
	}
	//(4)���֮ǰû�򿪣��ʹ��������֮ǰ���˾͹ر���
	if (tdCurObj.style.display == 'none') {
		tdCurObj.style.display = '';
		//alert(trObj.cells[0].bgColor);
		trObj.cells[0].bgColor = "#D8D8BF";//����ɫ
		trObj.cells[1].bgColor = "#D8D8BF";//����ɫ
		trObj.cells[2].bgColor = "#D8D8BF";//����ɫ

	}
	else {
		tdCurObj.style.display = 'none';
		trObj.cells[2].style.display = ''; //��detail
	}
}

function detailShow1(ethPckTable, numStream, pckType, self) {
	var tableObj = document.getElementById(ethPckTable);
	var theadOnlineEdit = tableObj.getElementsByTagName("tbody")[0];
	var rowCur = theadOnlineEdit.rows[parseInt(numStream) + 1];

	//(1) Judge whether is the detail header
	if (matchString("detail", self.innerHTML) == true) {
		self.style.display = 'none'; // first close the detail header
	}
	//(2) display the packet detail
	switch (pckType) {
		case "[1] l2pdu1588":
			if (rowCur.cells[3].style.display == 'none') {
				rowCur.cells[3].style.display = '';
			}
			else {
				rowCur.cells[3].style.display = 'none';
				self.parentNode.cells[2].style.display = ''; //display the detail header
			}
			rowCur.cells[4].style.display = 'none';
			break;
		case "[2] l3pdu1588":

			if (rowCur.cells[4].style.display == 'none') {
				rowCur.cells[4].style.display = '';
			}
			else {
				rowCur.cells[4].style.display = 'none';
				self.parentNode.cells[2].style.display = ''; //display the detail header
			}
			rowCur.cells[3].style.display = 'none';
			break;
		default:
			rowCur.cells[3].style.display = 'none';
			rowCur.cells[4].style.display = 'none';
			self.parentNode.cells[2].style.display = ''; //display the detail header
			break;
	}
}

function publicTableShow(ethPublicPckTableId) {
	tableObj = getTargetControl(ethPublicPckTableId);
	var tableRow = tableObj.getElementsByTagName('tr');
	for (var i = 1; i < tableRow.length; i++) {
		if (tableRow[i].style.display == '') //if it was opened ,then ,closed it
			tableRow[i].style.display = 'none';
		else
			tableRow[i].style.display = '';
	}
}





function show(abc) {
	//alert(abc);
}
//// ����firefox���ԣ����˵����к�ע�͵ȵ���Ϣ
function filterTextChildNodes(parentNodeCur) {
	var i = 0;
	while ((parentNodeCur.childNodes[i].nodeName == "#text") ||
		(parentNodeCur.childNodes[i].nodeName == "#comment")
	) {
		i++;
	}
	return parentNodeCur.childNodes[i];
}
//�õ�ָ���Ŀؼ�
//���紫�ݵ��ǿؼ����÷��ؿؼ�
//���紫�ݵ���IDֵ�����Զ����ҳ��ؼ�������
function getTargetControl(targetControl) {
	if (typeof (targetControl) == "string") {
		return document.getElementById(targetControl);
	}
	else return targetControl;
}
//ȥ���ո�
function Trim(s) {
	var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	return (m == null) ? "" : m[1];
}

function publicTableCheck(ethPublicPckTableId) {
	//alert('xxx');
	tableObj = getTargetControl(ethPublicPckTableId);
	var tableRow = tableObj.getElementsByTagName('tr');
	var valueTmp = filterTextChildNodes(tableRow[1].cells[2]);

	//ȥ���ո�
	valueTmp.value = Trim(valueTmp.value);
	//�ж��Ƿ���10������
	decimalCheck(valueTmp.value);

	//ת����16����
	var decValue = parseInt(valueTmp.value);
	decValue = decValue.toString(16);
	//alert(decValue);
	decValue1 = transformHexBytes(4, decValue)

	//10����ת����16����
	//alert(valueTmp.value.toString(16));

	//valueTmp.value +=1;
	//alert( filterTextChildNodes(tableRow[1].cells[2]) );
}
////��16������ת�����ֽ���ʽ
////���� 0x123,���ת����4Byte����Ϊ00 00 01 23
function transformHexBytes(numBytes, valueHexInput) {
	//alert("fuck");
	//alert(valueHexInput);
	var valueHexInputLength = valueHexInput.length;
	var numBytesDouble = numBytes * 2;
	if (valueHexInputLength > numBytesDouble) {
		//alert("�����ֽ�����С������Ҫת�������ֹ���");
		alert("numBytes too small or HexInput too big");
		return 0;
	}
	else {
		////(1)�������ַ�����λ��0����
		////����ԭ����0x13f,��Ҫ4BYTE�������0000013f
		var valueHexArr1 = new Array();
		var j = 0;
		for (var i = 0; i < numBytesDouble; i++) {
			if (i < (numBytesDouble - valueHexInputLength)) {
				valueHexArr1[i] = "0";
			}
			else {
				valueHexArr1[i] = valueHexInput[j];
				j++;
			}
		}
		////(2)�ֽ�֮���ÿո�ֿ�
		////����ԭ����0000013f �ֿ����Ϊ00 00 01 3f
		var valueHexOutputLength = numBytes * 3;
		var valueHexArr2 = new Array();
		var k = 0;
		var j = 0;
		for (var i = 0; i < valueHexOutputLength; i++) {
			if (j == 2) {
				valueHexArr2[i] = ' ';
				j = 0;
			}
			else {
				valueHexArr2[i] = valueHexArr1[k];
				k++;
				j++;
			}
		}
		////(3)���ַ�������ת�����ַ���
		var valueHexOutput = valueHexArr2.join();
		////(4)ת����ԭ��������Ԫ���кܶࡰ,���������Ҫȥ������
		//// ִ���滻���������滻�ɿ�
		valueHexOutput = valueHexOutput.replace(/,/g, "");
		//valueHexOutput+=valueHexInput;
		//alert(valueHexOutput);
		return valueHexOutput;
	}

}

function submitRun(ethPublicPckTableId) {
	var publicTableObj = getTargetControl(ethPublicPckTableId);
	var publicRows = publicTableObj.getElementsByTagName('tr');
	//document.write('<p>id="intro" �Ķ����е��ı��ǣ�' + x.innerHTML + '</p>');
	var inputTxt = filterTextChildNodes(publicRows[1].cells[2]);
	publicRows[1].cells[2].innerHTML = inputTxt.value
	x=document.getElementById(ethPublicPckTableId);
	alert(x.innerHTML)
	alert(inputTxt.value)
}

function decimalCheck(strNote, strValue) {

	var re = /^\s*\d+\s*$/;
	if (re.test(strValue) != true) {
		alert("decimalCheck" + strNote + "Failed");
	}
	//alert(re.test(strValue)) ;
}


function hexCheck(strNote, strValue, numBytes) {


	//====(1) step delete the multi space 
	//==consider 1 "13    34"
	//==in order to calculate the length of the string.
	//==we should delete the multi space 
	//==so consider 1 "13    34" change to "13 34" 
	strValue = strValue.replace(/\s+/g, " ");
	//====(2) step
	//==consider 1 "12" 
	//==consider 2 "2f f5"
	//==the right side is no space,so add the space
	//==in order to easy to match the rule
	//==so consider 1 "1 12" change to "01 12 "
	//==so consider 2 "2f f5" change to "2f f5 "
	strValue += ' ';
	//====(3) step calculate the length of the string
	if (strValue.length != (numBytes * 3)) {
		alert("hexCheck" + strNote + strValue + "length error Failed");
	}
	//====(4) step check whether the pattern ok or not 
	//��{2}����ʾǰ��ı���飬���ܳ���2��
	//var re= /^\s*([a-fA-F0-9][a-fA-F0-9]\s+)+\s*$/;
	var re = /^\s*([a-fA-F0-9]{2}\s+)+\s*$/;
	if (re.test(strValue) != true) {
		alert("hexCheck" + strNote + strValue + "Failed");
	}
}

//������ʽ��ƥ�������ֵ
//matchKey�Ǳ�������ŵ�ֵ�Ǳ���inStrҪȥƥ���ֵ
//���inStr�ڲ�����matchKey��ֵ����ôƥ��ɹ���
//����1,���򷵻�0
function matchString(matchKey, inStr) {
	//����ñ���matchKey,����ʹ��new RegExp()�ķ�����
	//����������ַ���û���Ǹ���б�ܣ��������|�ķ���
	//re = new RegExp('(\\s|^)' + matchKey + '(\\s|$)');
	re = new RegExp(matchKey);
	return (re.test(inStr));
}

function detailTdShow(tdObj, matchKey) {
	//���˵��ո�
	tdObj.style.color = Trim(tdObj.style.color);
	//(1)�ı���ɫ
	if (tdObj.style.color == 'blue') {
		tdObj.style.color = 'green';
	}
	else {
		tdObj.style.color = 'blue';
	}
	//(2)
	var parentTable = tdObj.parentNode.parentNode;

	var trArr = parentTable.getElementsByTagName('tr');

	for (var i = 1; i < trArr.length; i++) {
		if (matchString(matchKey, trArr[i].innerHTML) == true) {
			//==(1)ȥ����β�ո�
			//trArr[i].style.display=Trim(trArr[i].style.display);
			if (trArr[i].style.display == '')
				trArr[i].style.display = 'none';
			else
				trArr[i].style.display = '';
		}
	}

	tdObj.parentNode.style.display = '';
	/*
	var inStr = "asd���ﳬ   vlan word medm xxafasdfasdf"
	//var matchKey
	var matchResult = matchString(matchKey,inStr);
	alert(matchResult);
	//alert(buttonObj.parentNode);
	*/
}

function updateCfgFilePath(selfObj, cfgFilePathId) {
	var cfgObj = getTargetControl(cfgFilePathId);
	//cfgObj.value = cfgObj.value.replace(/tc\d+w+\//,selfObj.value);
	var cfgValue = cfgObj.value;
	cfgObj.value = cfgValue.replace(/tc\d+\w+\//, selfObj.value + '/');
	alert(cfgObj.value);
	//var optValue=arr[0].replace(/\s*\]/g,"");
	//alert(selfObj.value);
}

function writeFile(filePath, contentArr) {
	//var filePath = "test.dat";  
	//var stringContent = "Hell0";  
	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	} catch (e) {
		alert("no permisson...");
	}
	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath(filePath);
	if (file.exists() == false) {
		file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
	}
	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
	outputStream.init(file, 0x04 | 0x08 | 0x20, 420, 0);
	var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
	converter.charset = 'UTF-8';
	for (var i = 0; i < contentArr.length; i++) {
		var convSource = converter.ConvertFromUnicode(contentArr[i] + "\n");
		var result = outputStream.write(convSource, convSource.length);
	}
	outputStream.close();
	alert("File was saved in " + filePath);
}

//��ȡ�����ļ�  
function readFile(path) {
	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	} catch (e) {
		alert("Permission to read file was denied.");
	}
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath(path);
	if (file.exists() == false) {
		alert("File does not exist");
	}
	var is = Components.classes["@mozilla.org/network/file-input-stream;1"]
		.createInstance(Components.interfaces.nsIFileInputStream);
	is.init(file, 0x01, 00004, null);
	var sis = Components.classes["@mozilla.org/scriptableinputstream;1"]
		.createInstance(Components.interfaces.nsIScriptableInputStream);
	sis.init(is);
	var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"]
		.createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
	converter.charset = "UTF-8";
	var output = converter.ConvertToUnicode(sis.read(sis.available()));
	return output;
}






