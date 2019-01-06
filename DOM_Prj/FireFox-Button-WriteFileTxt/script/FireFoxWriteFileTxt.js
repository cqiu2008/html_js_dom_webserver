function WriteFileTxt() 
{
	var path = "E:\\HTML_JS_Total\\JS_HTML_DOM\\sim10g_cfg.dat";  
	//var content = "Hell0";  
	var content = Date(); 
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
	converter.charset = 'UTF-8'; var convSource = converter.ConvertFromUnicode(content);  
	var result = outputStream.write( convSource, convSource.length );   
	outputStream.close();  
	alert("File was saved in "+path);  
}
