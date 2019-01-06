/************************************************************************
* 版权所有 (C)2009, 中兴通讯股份有限公司。
* 
* 文件名称：  JTab.js
* 文件标识：  见LMP详细设计说明书
* 内容摘要：  Tab标签页，用于在页面中创建tab控件。
* 其它说明：  无
* 当前版本：  1.0
* 作    者：  王震
* 完成日期：  2009年10月1日
* 
* 修改记录1： 
*    修改日期：2009年10月1日
*    版 本 号：1.0
*    修 改 人：王震
*    修改内容：创建
* 使用方法：
* 	p_tab = new JTab("p_tab", {
			'container': 'tabcontainer',
			'handler': selectHander,
			'tabs' :[
				{"title": 'tab 1', 'content':'div1', 'display':true}, 
				{"title": 'tab 2', 'content':'div1', 'display':true},
				{"title": 'tab 3', 'content':'div1', 'display':true}
			]
		});
		p_tab.onSelectTab(0);
	}
	function selectHander(index){
		document.getElementById("div1").innerHTML = "test "+index;
	};
************************************************************************/
function JTab(varName, configure){
	this.configure = {
		"container": "tabcontainer",
		"handler": null,
		"tabs": null
	};
	
	if(('undefined'!=typeof(configure)) && (null!=configure)){
		for(var i in configure){
			this.configure[i] = configure[i];
		}
	}
	
	var element=document.createElement("ul");
    element.className="tabs";
	var container = document.getElementById(this.configure['container']);
	//查询第一个不为undefine值的tab标签，为了兼容firefox。
    var i= 0;
	for(i=0; i<container.childNodes.length; i++){
	    if(container.childNodes[i].id)
	        break;
	}		
	if (container.childNodes.length > 0){
		if(!isIE){
			container.insertBefore(element,container.childNodes[i-1]);
		}
		else{
			if(window["performance"]){
				container.insertBefore(element,container.childNodes[i-1]);
			}
			else{
				container.insertBefore(element,container.childNodes[i]);
			}
			
		}
		
		//container.insertBefore(element,container.childNodes[i-1]);
	}
	else{
		container.insertBefore(element, null);
	}
			
	this.varName=varName;
	this.root=element;
	this.id=0;
	this.tabInfos=[];
	this.prefix="tab";
	this.selected=-1;//选中的Tab的ID号
	this.count=0;

	this.addTab(this.configure['tabs']);
};

/*
 *	添加一TAB
 *	@param tabInfo TabInfo对象，包含Tab的信息
 *	@param position 插入的位置
 */
JTab.prototype.addTab=function(tabInfo,position){
	for(var i in this.configure['tabs']){
		tab = document.createElement("li");
		tab.id=this.prefix+this.id;
		tab.innerHTML="<A href=\"#\" onclick=\"return " + this.varName + ".onSelectTab(" + this.id + ")\">" + this.configure['tabs'][i]['title'] + "</A>";
		this.root.insertBefore(tab,null);
		this.tabInfos[this.id]=this.configure['tabs'][i];
		this.count++;
		this.id++;
	}
};

/*
 *	预处理Tab的单击事件
 *	@param id 对应单击Tab的ID号
 */
JTab.prototype.onSelectTab=function(id){
	if (id!=this.selected){
		var pageInfo=this.tabInfos[id];
		if (pageInfo['display']){
			var isDoSelect=true;
			var index=this.getIndexFromID(id);
			if (this.configure['handler'] != null){
				this.configure['handler'](index);	/* 切换前的处理操作，用于初始化div中的值 */
			}
			this.selectTab(index);
		}
	}
	return(false);
};

/*
 *	选中Tab
 *	@param index Tab的索引号，从0开始计算
 */
JTab.prototype.selectTab=function(index){
	var element=this.root.childNodes[index];
	var id = this.getIDFromElement(element);
	if (id != this.selected){
		if (-1 != this.selected){
			var preElement=document.getElementById("tab"+this.selected);
			preElement.className=" ";
			var preTabInfo=this.tabInfos[this.selected];
			document.getElementById(preTabInfo['content']).style.display="none";
		}
		element.className="current";
		var tabInfo=this.tabInfos[id];
		document.getElementById(tabInfo['content']).style.display="block";
		this.selected=id;
	}
};

/*
 *	根据元素获取ID号
 *	@param element 指向TAB超文本元素
 */
JTab.prototype.getIDFromElement=function(element){
	return(parseInt(element.id.substr(this.prefix.length)));
};

/*
 *	根据ID号获取Index
 *	@parma id TAB对应的ID号
 */
JTab.prototype.getIndexFromID=function(id){
	for (var nodes=this.root.childNodes,i=0;i<nodes.length;i++){
		if (nodes[i].id==this.prefix+id){
			return(i);
		}
	}
};

/*
 *	设置TAB是否可用
 */
JTab.prototype.setTabEnable=function(index,isEnable){
	var element=this.root.childNodes[index];
	var id=this.getIDFromElement(element);
	var tabInfo=this.tabInfos[id];
	tabInfo.isEnable=isEnable;
	element.className=isEnable?"tab":"tab disabled";
};

/*
 *	获取TAB是否可用
 */
JTab.prototype.getTabEnable=function(index){
	var element=this.root.childNodes[index];
	var id=this.getIDFromElement(element);
	var tabInfo=this.tabInfos[id];
	return(tabInfo.isEnable);
};