					
					var nHangNo = (Math.floor((Math.random()) * 1000) % 7) + 1;
					var nSecondHangNo = 0;
					var isHangSecondCheck = 0;

					var nHangInterval = 4000;
					var nHangNoOld = nHangNo;
					var objHanger  = document.getElementById("divHanger");
				
					var aHtmls = new Array (
				
 "<a href='http://www.makewing.com/lanren/' onfocus='this.blur()' target='_blank'><img src='images/main_hang1.jpg' border=0></a>"
,"<a href='http://www.makewing.com/lanren/' onfocus='this.blur()' target='_blank'><img src='images/main_hang2.jpg' border=0></a>"
,"<a href='http://www.makewing.com/lanren/' onfocus='this.blur()' target='_blank'><img src='images/main_hang3.jpg' border=0></a>"
,"<a href='http://www.makewing.com/lanren/' onfocus='this.blur()' target='_blank'><img src='images/main_hang4.jpg' border=0></a>"
,"<a href='http://www.makewing.com/lanren/' onfocus='this.blur()' target='_blank'><img src='images/main_hang5.jpg' border=0></a>"
,"<a href='http://www.makewing.com/lanren/' onfocus='this.blur()' target='_blank'><img src='images/main_hang6.jpg' border=0></a>"
,"<a href='http://www.makewing.com/lanren/' onfocus='this.blur()' target='_blank'><img src='images/main_hang7.jpg' border=0></a>"
,"<a href='http://www.makewing.com/lanren/' onfocus='this.blur()' target='_blank'><img src='images/main_hang8.jpg' border=0></a>"
	
				
					);
				
					function getNavigatorType() 
{
	if (navigator.appName == "Microsoft Internet Explorer") return 1;  
	else if (navigator.appName == "Netscape") return 2;	
	else return 0;
}

					
					function rotateHanger()
					{
				
						if (getNavigatorType() == 1) {
							objHanger.filters[0].apply();
							setHanger();
							objHanger.filters[0].play();
							
						} else {
							setHanger();
						}
				
						nHangNoOld = nHangNo;
						if (isHangSecondCheck == 0) {
							nHangNo = nSecondHangNo;
							isHangSecondCheck = 1;
						} else {
							(nHangNo==(aHtmls.length-1))?nHangNo=0:nHangNo++;
						}
				/**/
				
						nRotateTimer = setTimeout('rotateHanger()',nHangInterval);
					}
					
					function restartRotate()
					{
						(nHangNo==(aHtmls.length-1))?nHangNo=0:nHangNo++;
				
						nRotateTimer = setTimeout('rotateHanger()',nHangInterval);
					}
				
					function changeHanger(nGotoNo)
					{
						nHangNo = nGotoNo;
				
						if (getNavigatorType() == 1) {
							objHanger.filters[0].apply();
							setHanger();
							objHanger.filters[0].play();
							
						} else {
							setHanger();
						}
				
					}
					
					function setHanger()
					{
				
						objHanger.innerHTML=aHtmls[nHangNo];
					}
				
								
					rotateHanger();