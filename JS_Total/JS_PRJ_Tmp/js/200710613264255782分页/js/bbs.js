var isStart=true;
var nn;
var tt;
var bPlay=new Image;
bPlay.src = "http://makewing.com/lanren/js/18/images/bu_pla.gif";
var bPause=new Image;
bPause.src = "http://makewing.com/lanren/js/18/images/bu_pau.gif";
nn=1;
setTimeout('change_img()',4000);
function resetPlay(){
isStart=true;
var e = document.getElementById("top_slider");
var a = e.getElementsByTagName("img");
for(i=0;i<a.length;i++){
 if(a[i].src == bPlay.src) a[i].src = bPause.src;
}
}
function playorpau(e){
if(e.src == "http://makewing.com/lanren/js/18/images/bu_pau.gif"){
e.src = bPlay.src ;
isStart = false;
}else{
e.src = bPause.src;
isStart = true;
}
}
function pre_img(){
resetPlay();
nn--;
if(nn < 1) nn=3;
setFocus(nn);
}
function next_img(){
resetPlay();
nn++;
if(nn > 3) nn=1;
setFocus(nn);
}
function change_img()
{
if(isStart){
 nn++;
 if(nn>3) nn=1;
 setFocus(nn);
 }else{
 tt=setTimeout('change_img()',100);
 }
}
function setFocus(i)
{
 if(tt) clearTimeout(tt);
 nn = i;
 selectLayer1(i);
 tt=setTimeout('change_img()',4000);
}
function selectLayer1(i)
{
 switch(i)
 {
 case 1:
document.getElementById("bbs_s1").style.display="block";
document.getElementById("bbs_s2").style.display="none";
document.getElementById("bbs_s3").style.display="none";
 break;
case 2:
document.getElementById("bbs_s1").style.display="none";
document.getElementById("bbs_s2").style.display="block";
document.getElementById("bbs_s3").style.display="none";
 break;
 case 3:
document.getElementById("bbs_s1").style.display="none";
document.getElementById("bbs_s2").style.display="none";
document.getElementById("bbs_s3").style.display="block";
 break;
 }
}
