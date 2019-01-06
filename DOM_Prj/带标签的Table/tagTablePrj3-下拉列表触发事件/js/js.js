var number=16; //定义条目数

function LMYC() {
var lbmcd;
    for (i=1;i<=number;i++) {
        lbmcd = eval('LM' + i);
        lbmcd.style.display = 'none';
    }
}
 
function ShowFLT(i) {

	//alert(lbmc);
	i = i * 2;
	for(var j=i;j<i+2;j++) {
		lbmc = eval('LM' + j);
		if (lbmc.style.display == 'none') {
		//LMYC();
			lbmc.style.display = '';
		}
		else {
        lbmc.style.display = 'none';
		}
	}
}
function show(pckType) {

	if(pckType == "ipv4") {
		LM10.style.display= '';
	}
	else {
		LM10.style.display= 'none';
	}


}
