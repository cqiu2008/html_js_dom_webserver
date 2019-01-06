
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

//�õ�table�е�tbody�ؼ���ע�����firefox
function getTableTbody(tableObj){
	var tbodyOnlineEdit=tableObj.getElementsByTagName("tbody")[0];
	if(typeof(tbodyOnlineEdit)=="undefined"||tbodyOnlineEdit==null){
		tbodyOnlineEdit=document.createElement("tbody");
		tableObj.appendChild(tbodyOnlineEdit);
	}

	return tbodyOnlineEdit;
}


//ɾ�������¼��ؼ����ڵ���
function deleteThisRow(targetControl){
	if(targetControl.tagName=="TR")
		targetControl.parentNode.removeChild(targetControl);
	else
		deleteThisRow(targetControl.parentNode);
}

//ɾ�����ؼ����ڵ���
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
		case "[1] l2pdu1588":
			if(rowCur.cells[3].style.display =='none'){
				rowCur.cells[3].style.display='';
			}
			else{
				rowCur.cells[3].style.display ='none';
				self.parentNode.cells[2].style.display=''; //display the detail header
			}
			rowCur.cells[4].style.display='none';
			break;
		case "[2] l3pdu1588":
			
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

function publicTableShow(ethPublicPckTableId){
	tableObj = getTargetControl(ethPublicPckTableId);
	var tableRow=tableObj.getElementsByTagName('tr');
	for(var i=1;i<tableRow.length;i++){
		if(tableRow[i].style.display =='') //if it was opened ,then ,closed it
			tableRow[i].style.display = 'none';
		else
			tableRow[i].style.display = '';
	}
}





function show(abc){
	//alert(abc);
}
//// ����firefox���ԣ����˵����к�ע�͵ȵ���Ϣ
function filterTextChildNodes(parentNodeCur){
	var i=0;
	while( (parentNodeCur.childNodes[i].nodeName=="#text") || 
		   (parentNodeCur.childNodes[i].nodeName=="#comment")
		 ) {
		i++;
	}
	return parentNodeCur.childNodes[i];
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
//ȥ���ո�
function Trim(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}

function publicTableCheck(ethPublicPckTableId) {
	//alert('xxx');
	tableObj = getTargetControl(ethPublicPckTableId);
	var tableRow=tableObj.getElementsByTagName('tr');
	var valueTmp = filterTextChildNodes(tableRow[1].cells[2]);
	
	//ȥ���ո�
	valueTmp.value=Trim(valueTmp.value);
	//�ж��Ƿ���10������
	decimalCheck(valueTmp.value);
	
	//ת����16����
	var decValue=parseInt(valueTmp.value);
	decValue=decValue.toString(16);
	//alert(decValue);
	decValue1=transformHexBytes(4,decValue)
	
	
	//10����ת����16����
	//alert(valueTmp.value.toString(16));
	
	//valueTmp.value +=1;
	//alert( filterTextChildNodes(tableRow[1].cells[2]) );
}
////��16������ת�����ֽ���ʽ
////���� 0x123,���ת����4Byte����Ϊ00 00 01 23
function transformHexBytes(numBytes,valueHexInput) {
	//alert("fuck");
	//alert(valueHexInput);
	var valueHexInputLength=valueHexInput.length;
	var numBytesDouble=numBytes*2;
	if( valueHexInputLength > numBytesDouble ) {
		//alert("�����ֽ�����С������Ҫת�������ֹ���");
		alert("numBytes too small or HexInput too big");
		return 0;
	}
	else {
		////(1)�������ַ�����λ��0����
		////����ԭ����0x13f,��Ҫ4BYTE�������0000013f
		var valueHexArr1=new Array();
		var j=0;
		for(var i=0;i<numBytesDouble;i++){	
			if(i<(numBytesDouble-valueHexInputLength)){
				valueHexArr1[i]="0";
			}
			else
			{
				valueHexArr1[i]=valueHexInput[j];
				j++;
			}
		}
		////(2)�ֽ�֮���ÿո�ֿ�
		////����ԭ����0000013f �ֿ����Ϊ00 00 01 3f
		var valueHexOutputLength=numBytes*3;
		var valueHexArr2=new Array();
		var k=0;
		var j=0;
		for(var i=0;i<valueHexOutputLength;i++){
			if(j==2){
				valueHexArr2[i]=' ';
				j=0;
			}
			else {
				valueHexArr2[i]=valueHexArr1[k];
				k++;
				j++;
			}
		}
		////(3)���ַ�������ת�����ַ���
		var valueHexOutput=valueHexArr2.join();
		////(4)ת����ԭ��������Ԫ���кܶࡰ,���������Ҫȥ������
		//// ִ���滻���������滻�ɿ�
		valueHexOutput=valueHexOutput.replace(/,/g,"");
		//valueHexOutput+=valueHexInput;
		//alert(valueHexOutput);
		return valueHexOutput;
	}

}

/*
var number = 255;var hexString = number.toString(16);
���hexString�����ff

16����ת����10����ֻҪ
parseInt(hexString, 16)
�ͻ�õ����255
*/



function submitRun(cfgFilePathId,ethPublicPckTableId,ethPrivatePckTableId) {
	var filePathObj = getTargetControl(cfgFilePathId);
	var filePath=filePathObj.value;
	var contentArr=new Array();
	
////(1)(Public Stream Write)
	var publicTableObj = getTargetControl(ethPublicPckTableId);
	var publicRows=publicTableObj.getElementsByTagName('tr');
	//alert(publicRows.length);
	contentArr[0]="//===============================================================================================//";
	contentArr[1]="//****";
	contentArr[2]="//Public Stream Configuration ";
	contentArr[3]=contentArr[1];
	contentArr[4]=contentArr[0];
	contentArr[5]="//Public Stream address";
	contentArr[6]="@0000";
	var j=7;
	//alert(publicRows[1].cells[1].innerHTML);
	//var inputTxt;
	
	for(var i=1;i<publicRows.length;i++){
		////(1)ȡ�����е�ԭʼ����
		contentArr[j] = publicRows[i].cells[1].innerHTML;
		////(2)��ȡ����������[\d+B]���֣�����[4B]����ȡ��4
		var re=/(\d+\s*B\s*\])/;
		var arr=re.exec(contentArr[j]);
		//alert(arr[1]);
		var numBytes=arr[1].replace(/B\]/g,"");
		//alert(numBytes);
		////(3)���˵�ע�͡��ո���ı��ڵ�
		var inputTxt=filterTextChildNodes(publicRows[i].cells[2]);
		////(4)ȥ���ո�
		//alert(inputTxt.value);
		inputTxt.value=Trim(inputTxt.value);
		//alert(inputTxt.value);
		////(5)�ж��Ƿ���10������
		decimalCheck(contentArr[j],inputTxt.value);
		////(6)װ���µ�ע����Ϣ���������ֵ
		contentArr[j] = "//=="+contentArr[j]+" = "+inputTxt.value;
		////(7)ת����10����
		var decValue=parseInt(inputTxt.value);
		////(8)ת����16����
		var hexValue=decValue;
		hexValue=hexValue.toString(16);
		//alert(hexValue);
		////(9)���ֽڸ�ʽ���ɳ�Ҫд����ַ���		
		var outputTxt=transformHexBytes(numBytes,hexValue);
		//alert(outputTxt);
		contentArr[j+1] = outputTxt;
		//alert(contentArr[j+1]);
		j=j+2;
	}
	var priPt=j;
////(2)(Private Stream Write)
	var privateTableObj = getTargetControl(ethPrivatePckTableId);
	var privateTbodyObj=privateTableObj.getElementsByTagName("tbody")[0]; 
	
	//var privateRows=privateTbodyObj.rows[1];
	
	if(numStream < 1){
		alert("The numStream is less than 1,Error!!");
	}
	//alert("numStream="+numStream);
	var j=priPt;
	////��2��ʼ����Ϊ0�У���ͷ��1:���صĸ����У�2����������
	for(var i=2;i<=( parseInt(numStream)+1 );i++){
	
		////(1)���ɱ�ͷ��Ϣ
		//(1.1)Ѱ�ҵ�ǰ�����
		var numStreamCur=privateTbodyObj.rows[i].cells[0].innerHTML;
		//(1.2)ȥ���ո�
		numStreamCur=Trim(numStreamCur);
		//(1.3)�������Ļ���ַ
		var numStreamDec=parseInt(numStreamCur);
		var numStreamAddr=numStreamDec*1024;
		var hexAddr=numStreamAddr;
		hexAddr=hexAddr.toString(16);
		////(2)Ѱ�ҵ�����ѡ��ؼ�
		var selectNode=filterTextChildNodes(privateTbodyObj.rows[i].cells[1]);
		var re=/\d+\s*\]/;
		var arr=re.exec(selectNode.value);
		////(2.1)Ѱ�ҵ�����ѡ��ؼ�������ֵ
		var optValue=arr[0].replace(/\]/g,"");
		////(2.2)ͨ������ֵ���ҵ������ݶ�Ӧ���ӱ��
		var optTable=filterTextChildNodes(privateTbodyObj.rows[i].cells[2+parseInt(optValue)]);
		//alert(optTable);
		////(2.3)�����ӱ���ÿһ�У���������ʽ����
		var optTrArr=optTable.getElementsByTagName('tr');
		
		////(3)��ʼ��ÿ�����ı�ͷ
		contentArr[j]  =contentArr[0];
		contentArr[j+1]=contentArr[1];
		contentArr[j+2]="//==NO."+numStreamCur+" Stream "+selectNode.value;
		contentArr[j+3]=contentArr[1];
		contentArr[j+4]=contentArr[0];
		contentArr[j+5]="//==Private Stream address";
		contentArr[j+6]="@"+hexAddr;//Stream Address
		//alert(contentArr[j+6]);
		j=j+7;
		//alert("optTrArr.length="+optTrArr.length);
		////(4)���������岿��
		for(var k=1;k<optTrArr.length;k++){
			//(4.1)ȡ�����е�ԭʼ����
			contentArr[j]=optTrArr[k].cells[0].innerHTML;
			//(4.2)��ȡ����������[\d+B]���֣�����[4B]����ȡ��4
			var re=/(\d+\s*B\s*\])/;
			var arr=re.exec(contentArr[j]);
			var numBytes=arr[1].replace(/B\]/g,"");
			//decimalCheck(contentArr[j+2]+"numBytes",numBytes);
			//alert(numBytes);
			//(4.3)���˵�ע�͡��ո���ı��ڵ�
			var inputTxt=filterTextChildNodes(optTrArr[k].cells[1]);
			//(4.4)ȥ���ո�;
			inputTxt.value=Trim(inputTxt.value);
			//alert(contentArr[j]+inputTxt.value);
			
			//(4.5)�ж��Ƿ��ǰ��ֽ���ʽ��16������������0x12f ��ʾ01 2f
			hexCheck("Stream No."+numStreamCur+contentArr[j],inputTxt.value);
			//(4.6)װ���µ�ע����Ϣ���������ֵ
			contentArr[j] = "//=="+k+contentArr[j];
			//(4.7)ȥ������Ŀո�,������д
			contentArr[j] = contentArr[j].replace(/\s+/g," ");
			//var numBytes=arr[1].replace(/B\]/g,"");
			
			var hexValue=inputTxt.value;
			//(4.7)װ������
			contentArr[j+1] = hexValue;
			
			j+=2;
		}
	}
	
////(3)(WriteFile from contentArr)
	writeFile(filePath,contentArr);
}

function decimalCheck(strNote,strValue) {

	var re = /^\s*\d+\s*$/;
	if(re.test(strValue) != true){
		alert("decimalCheck"+strNote+"Failed");
	}
	//alert(re.test(strValue)) ;
}


function hexCheck(strNote,strValue){
	//==consider 1 "12" 
	//==consider 2 "2f f5"
	//==the right side is no space,so add the space
	//==in order to easy to match the rule
	strValue+=' ';
	//var re= /^\s*([a-fA-F0-9][a-fA-F0-9]\s+)+\s*$/;
	//��{2}����ʾǰ��ı���飬���ܳ���2��
	var re= /^\s*([a-fA-F0-9]{2}\s+)+\s*$/;
	if(re.test(strValue) != true){
		alert("hexCheck"+strNote+strValue+"Failed");
	}
}

//������ʽ��ƥ�������ֵ
//matchKey�Ǳ�������ŵ�ֵ�Ǳ���inStrҪȥƥ���ֵ
//���inStr�ڲ�����matchKey��ֵ����ôƥ��ɹ���
//����1,���򷵻�0
function matchString(matchKey,inStr) {
	//����ñ���matchKey,����ʹ��new RegExp()�ķ�����
	//����������ַ���û���Ǹ���б�ܣ��������|�ķ���
	//re = new RegExp('(\\s|^)' + matchKey + '(\\s|$)');
	re = new RegExp(matchKey);
	return (re.test(inStr));
}

function detailTdShow(tdObj,matchKey){
	//���˵��ո�
	tdObj.style.color=Trim(tdObj.style.color);
	//(1)�ı���ɫ
	if(tdObj.style.color == 'blue'){
		tdObj.style.color = 'green';
	}
	else {
		tdObj.style.color = 'blue';
	}
	//(2)
	var parentTable=tdObj.parentNode.parentNode;
	
	var trArr = parentTable.getElementsByTagName('tr');
	
	for(var i=1;i<trArr.length;i++){
		if( matchString(matchKey,trArr[i].innerHTML) == true){
			//==(1)ȥ����β�ո�
			//trArr[i].style.display=Trim(trArr[i].style.display);
			if(trArr[i].style.display == '')
				trArr[i].style.display = 'none';
			else
				trArr[i].style.display = '';
		}
	}
	
	tdObj.parentNode.style.display='';
	/*
	var inStr = "asd���ﳬ   vlan word medm xxafasdfasdf"
	//var matchKey
	var matchResult = matchString(matchKey,inStr);
	alert(matchResult);
	//alert(buttonObj.parentNode);
	*/
}


function writeFile(filePath,contentArr) {
	//var filePath = "test.dat";  
	//var stringContent = "Hell0";  
	try {   
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
		} catch (e) {  
		alert("no permisson...");   
		}   
	var file = Components.classes["@mozilla.org/file/local;1"] .createInstance(Components.interfaces.nsILocalFile);  
	file.initWithPath(filePath);   
	if ( file.exists() == false )  
	{   
		file.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420 );   
		}   
	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"] .createInstance( Components.interfaces.nsIFileOutputStream );  
		outputStream.init( file, 0x04 | 0x08 | 0x20, 420, 0 );   
	var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"] .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);  
	converter.charset = 'UTF-8'; 
	for(var i=0;i<contentArr.length;i++) {
		var convSource = converter.ConvertFromUnicode(contentArr[i]+"\n");  
		var result = outputStream.write( convSource, convSource.length );   
	}
	outputStream.close();  
	alert("File was saved in "+filePath);  
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
    file.initWithPath( path );  
    if ( file.exists() == false ) {  
         alert("File does not exist");  
    }  
    var is = Components.classes["@mozilla.org/network/file-input-stream;1"]  
         .createInstance( Components.interfaces.nsIFileInputStream );  
    is.init( file,0x01, 00004, null);  
    var sis = Components.classes["@mozilla.org/scriptableinputstream;1"]  
         .createInstance( Components.interfaces.nsIScriptableInputStream );  
    sis.init( is );  
    var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"]  
                           .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);  
    converter.charset = "UTF-8";  
    var output = converter.ConvertToUnicode(sis.read( sis.available() ));  
    return output;  
}  





