function show_flash_index(){
		/*
			  <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="432" height="275">
                  <param name="movie" value="flash/index.swf" />
                  <param name="quality" value="high" />
                  <embed src="flash/index.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="432" height="275"></embed>
			  </object>
		*/
	document.write("<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-44455354000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='432' height='275'>");
	document.write("<param name='movie' value='flash/index.swf'>");
	document.write("<param name='quality' value='high'>");
	document.write("<param name='wmode' value='transparent'>");
	document.write("<embed src='flash/index.swf' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='432' height='275' wmode='transparent'></embed>");
	document.write("</object>");
}

function show_flash_player(value){

	/*
				  <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="436" height="305">
                    <param name="movie" value="flash/Player.swf" />
                    <param name="quality" value="high" />
                    <param name="SCALE" value="exactfit" />
					<PARAM NAME="FlashVars" VALUE="myURL=flv0,<%=guid+flashKey%>"> 
                    <embed src="flash/player.swf" width="436" height="305" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" scale="exactfit"></embed>
                  </object>

	*/
	document.write("<object id='myFlash' classid='clsid:D27CDB6E-AE6D-11cf-96B8-44455354000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0'  width='436' height='305' >");
	document.write("<param name='movie'value='flash/Player.swf'>");
	document.write("<param name='quality' value='high'>");
	document.write("<param name='SCALE' value='exactfit' />");
	//document.write("<PARAM NAME='FlashVars' VALUE='myURL="+value+"'> ");
	document.write("<embed src='flash/player.swf' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash'   width='436' height='305' scale='exactfit' wmode='transparent'></embed>");
	document.write("</object>");
	alert(":"+value);
	 
	window.document.myFlash.SetVariable("FlashVars", value);

}