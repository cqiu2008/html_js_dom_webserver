/**
	search widget for DojoGrid 
	created by mk 2013-09-23
*/

dojo.provide("dijit.search");

dojo.require("dijit._Widget");

dojo.declare("dijit.search",[dijit._Widget],
{
    onSearch:'onSearch',
    id:'id',
    constructor:function(params,node){
        this.onSearch=params.onSearch;        
        this.id=params.id;        
    },
    postCreate:function(){
		var innerHTML="";
		innerHTML+="<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"searchTable\">";	
		innerHTML+="<tbody><tr>";	
		innerHTML+=" <td>";	
		innerHTML+="<input type=\"text\" title=\"Search\" class=\"searchInput\" id=\"searchInput_"+this.id+"\">";	
		innerHTML+="</td>";	
		innerHTML+="<td>";	
		innerHTML+="<input type=\"image\" width=\"21\" height=\"17\" class=\"searchAction\" onclick=\""+this.onSearch+"\"";	
		innerHTML+="title=\"Search\" alt=\"Search\" src=\"images/magglass.gif\" border=\"0\" hspace=\"2\">";	
		innerHTML+="</td>";	
		innerHTML+="</tr>";	
		innerHTML+="</tbody>";	
		innerHTML+="</table>";	
        this.domNode.innerHTML=innerHTML;
    } 
}
);