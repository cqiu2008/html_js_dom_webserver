 function mouseOver(){
   var lObj;
   if(event){
   lObj=event.srcElement;   
   while(lObj && lObj.tagName!="INPUT") lObj=lObj.parentNode; 
   }
   var aa =lObj.id;
   alert(aa);
 }

function nodeShow( nodename ){
 //�õ�table2��id
 alert(document.getElementById(nodename).rows[0].cells[0].childNodes[0].id);
 
 //��ȡ����
 alert(document.getElementById(nodename).rows[0].cells[0].childNodes[0].rows[0].cells[0].innerText);
 alert(document.getElementById(nodename).rows[0].cells[0].childNodes[0].rows[0].cells[0].innerHTML);
}
