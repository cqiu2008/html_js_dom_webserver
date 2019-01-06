document.writeln("<div id=\"msn\" style=\"BORDER-RIGHT:#455690 1px solid; BORDER-TOP:#a6b4cf 1px solid; Z-INDEX:99999; LEFT:0px;  BORDER-LEFT:#a6b4cf 1px solid; WIDTH:180px; BORDER-BOTTOM:#455690 1px solid; POSITION:absolute; TOP:0px; HEIGHT:116px; BACKGROUND-COLOR:#c9d3f3\">");
document.writeln("<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"BORDER-TOP:#ffffff 1px solid; BORDER-LEFT:#ffffff 1px solid\" bgcolor=\"#cfdef4\">");
document.writeln("<tr><td height=\"24\" width=\"26\" style=\"FONT-SIZE:12px;BACKGROUND-IMAGE:url(images/msgTopBg.gif);COLOR:#0f2c8c\" valign=\"middle\"><img src=\"images/msgLogo.gif\" hspace=\"5\" align=\"absMiddle\" vspace=\"1\"\/><\/td>");
document.writeln("<td style=\"FONT-WEIGHT:normal;FONT-SIZE:9pt;BACKGROUND-IMAGE:url(images/msgTopBg.gif);COLOR:#1f336b;PADDING-TOP:4px\" valign=\"middle\" width=\"100%\">懒人图库整理<\/td>");
document.writeln("<td style=\"BACKGROUND-IMAGE:url(images/msgTopBg.gif);PADDING-TOP:2px\" valign=\"middle\" width=\"19\" align=\"right\"><img src=\"images/msgClose.gif\" hspace=\"3\" style=\"CURSOR:pointer\" onclick=\"closeDiv()\" title=\"关闭\"\/><\/td>");
document.writeln("<\/tr><tr><td colspan=\"3\" height=\"90\" style=\"PADDING-RIGHT:1px;BACKGROUND-IMAGE:url(images/msgBottomBg.jpg);PADDING-BOTTOM:1px\">");
document.writeln("<div style=\"BORDER-RIGHT: #b9c9ef 1px solid; PADDING-RIGHT: 13px; BORDER-TOP: #728eb8 1px solid; PADDING-LEFT: 13px; FONT-SIZE: 9pt; PADDING-BOTTOM: 13px; BORDER-LEFT: #728eb8 1px solid; WIDTH: 100%; COLOR: #1f336b; PADDING-TOP: 18px; BORDER-BOTTOM: #b9c9ef 1px solid; HEIGHT: 100%\"><a href=\"http://www.makewing.com/lanren\" target=\"_blank\" style=\"FONT-WEIGHT:bold;COLOR:red\">&gt;&gt;精选PNG图标下载<\/a><br><br><a href=\"http://www.makewing.com/lanren\" target=\"_blank\" style=\"FONT-WEIGHT:bold;COLOR:blue\">&gt;&gt;欢迎访问懒人图库<\/a><\/div><\/div><\/tr><\/table><\/div>");

msn.style.top=document.body.clientHeight-174;
msn.style.left=document.body.clientWidth-225;
moveR();
function moveR() {
msn.style.top=document.body.scrollTop+document.body.clientHeight-116;
msn.style.left=document.body.scrollLeft+document.body.clientWidth-180;
setTimeout("moveR();",80)
}
function closeDiv(){
	msn.style.visibility='hidden';
}