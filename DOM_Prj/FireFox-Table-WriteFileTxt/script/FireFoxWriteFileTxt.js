function WriteFileTxt(stream_num,content) 
{
//====(1) initial value
	var path = "E:\\HTML_JS_Total\\JS_HTML_DOM\\sim10g_cfg.dat";  
	var arr = new Array(5);
	arr[0] = "//===============================================================================================//";
	arr[1] = "//====";//stream number
	arr[2] = "//===============================================================================================//";
	arr[3] = "//====(1) Stream Address";
	arr[4] = "@";//stream memory address

	//var content = "Hell0";  
	//var content = Date(); 
//====(2) calculate and update array value
	arr[1] = "//====NO."+stream_num+" Stream Number";


//====(3) Write the array's data to the file
	try {   
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
		} catch (e) 
		{  
		alert("no permisson...");   
		}   
	var file = Components.classes["@mozilla.org/file/local;1"] .createInstance(Components.interfaces.nsILocalFile);  
	file.initWithPath(path);   
	if ( file.exists() == false )  
	{   
		file.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420 );   
	}   
	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"] .createInstance( Components.interfaces.nsIFileOutputStream );  
	outputStream.init( file, 0x04 | 0x08 | 0x20, 420, 0 );   
	var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"] .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);  
	converter.charset = 'UTF-8';
   	var convSource ; 
	var result	   ;

	for (i=0;i<arr.length;i++)
	{
		convSource = converter.ConvertFromUnicode( arr[i] + "\n");  
		result = outputStream.write( convSource, convSource.length );   
	}
//====(4) Close the file 
	outputStream.close();  
//====(5) display the result 
	alert("File was saved in "+path);  
}
