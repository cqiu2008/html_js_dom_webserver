function genEthCfgData(ethElementsByName)
{
	var ethArrIn = document.getElementsByName(ethElementsByName);
	var ethArrOut ;
	var ethLength=ethArrIn.length*2+4;
	ethArrOut = new Array(ethLength);
	ethArrOut[0] = "//===============================================================================================//";
	ethArrOut[1] = "//****";
	ethArrOut[2] = "//====NO."+ethArrIn[0].value+" Stream Configuration";
	ethArrOut[3] = "//****";
	ethArrOut[4] = "//===============================================================================================//";

	/*
	for(var i=0;i<5;i++)
	{
		alert(ethArrOut[i]);
	}
	*/
}
